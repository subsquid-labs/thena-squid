import {DataHandlerContext} from '@subsquid/evm-processor'
import {StoreWithCache} from '../utils/store'
import {VOTER} from '../config'
import * as voterAbi from '../abi/voterV3'
import {Action} from '../action'
import {Log} from '../processor'
import {CreateBribeAction} from '../action/bribe'
import {CreateGaugeAction} from '../action/gauge'
import {Bribe, Pool} from '../model'
import {GaugeManager} from '../utils/manager/gaugeManager'

export function isVoterItem(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    return item.address === VOTER
}

export async function getVoterActions(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    const actions: Action[] = []

    switch (item.topics[0]) {
        case voterAbi.events.GaugeCreated.topic: {
            const event = voterAbi.events.GaugeCreated.decode(item)

            const gauge = event.gauge.toLowerCase()
            const externalBribe = event.external_bribe.toLowerCase()
            const internalBribe = event.internal_bribe.toLowerCase()
            const pool = event.pool.toLowerCase()

            actions.push(
                new CreateBribeAction(item.block, item.transaction!, {
                    address: externalBribe,
                    pool: ctx.store.defer(Pool, pool),
                }),
                new CreateBribeAction(item.block, item.transaction!, {
                    address: internalBribe,
                    pool: ctx.store.defer(Pool, pool),
                }),
                new CreateGaugeAction(item.block, item.transaction!, {
                    address: gauge,
                    externalBribe: ctx.store.defer(Bribe, externalBribe),
                    internalBribe: ctx.store.defer(Bribe, internalBribe),
                    pool: ctx.store.defer(Pool, pool),
                })
            )

            GaugeManager.get(ctx).addGauge(gauge)

            break
        }
    }

    return actions
}
