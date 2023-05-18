import {DataHandlerContext} from '@subsquid/evm-processor'
import {Log} from '../processor'
import {StoreWithCache} from '../utils/store'
import * as bribeAbi from '../abi/bribe'
import {Action} from '../action'
import {Bribe, VeToken} from '../model'
import {BribeManager} from '../utils/manager/bribeManager'
import {createVeTokenId} from '../utils/ids'
import {UpdateStakeBribeAction} from '../action/bribe'

export function isBribeItem(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    return BribeManager.get(ctx).isBribe(item.address)
}

export async function getBribeActions(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    const actions: Action[] = []

    switch (item.topics[0]) {
        case bribeAbi.events.Staked.topic: {
            const event = bribeAbi.events.Staked.decode(item)

            const bribe = item.address
            const token = createVeTokenId(event.tokenId)
            const amount = event.amount

            actions.push(
                new UpdateStakeBribeAction(item.block, item.transaction!, {
                    bribe: ctx.store.defer(Bribe, bribe, {pool: true}),
                    token: ctx.store.defer(VeToken, token),
                    amount,
                })
            )

            break
        }
        case bribeAbi.events.Withdrawn.topic: {
            const event = bribeAbi.events.Withdrawn.decode(item)

            const bribe = item.address
            const token = createVeTokenId(event.tokenId)
            const amount = -event.amount

            actions.push(
                new UpdateStakeBribeAction(item.block, item.transaction!, {
                    bribe: ctx.store.defer(Bribe, bribe, {pool: true}),
                    token: ctx.store.defer(VeToken, token),
                    amount,
                })
            )

            break
        }
    }

    return actions
}
