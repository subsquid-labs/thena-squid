import {StoreWithCache} from '@belopash/typeorm-store'
import * as gaugeAbi from '../abi/gaugeV2'
import {MappingContext} from '../interfaces'
import {Gauge, GaugeStake, User} from '../model'
import {Log} from '../processor'
import {createGaugeStakeId} from '../utils/ids'
import {GaugeManager} from '../utils/manager/gaugeManager'
import {Item} from './common'

export function getGaugeActions(ctx: MappingContext<StoreWithCache>, item: Item) {
    if (item.address == null || !GaugeManager.get(ctx).isGauge(item.address)) return

    switch (item.kind) {
        case 'log': {
            const log = item.value
            switch (log.topics[0]) {
                case gaugeAbi.events.Deposit.topic:
                    handleDeposit(ctx, log)
                    break

                case gaugeAbi.events.Withdraw.topic:
                    handleWithdraw(ctx, log)
                    break

                case gaugeAbi.events.Harvest.topic: {
                    handleHarvest(ctx, log)

                    break
                }
            }
            break
        }
    }
}

function handleDeposit(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = gaugeAbi.events.Deposit.decode(log)

    const userId = event.user.toLowerCase()
    const userDeferred = ctx.store.defer(User, userId)

    const gaugeId = log.address
    ctx.store.defer(Gauge, gaugeId)

    const stakeId = createGaugeStakeId(gaugeId, userId)
    const stakeDeferred = ctx.store.defer(GaugeStake, stakeId)

    const amount = event.amount

    ctx.queue
        .lazy(async () => {
            const stake = await stakeDeferred.get()
            if (stake == null) {
                const user = await userDeferred.get()
                if (user == null) {
                    ctx.queue.add('user_create', {
                        userId,
                        address: userId,
                    })
                }

                ctx.queue.add('gauge_createStake', {
                    gaugeId,
                    userId,
                    stakeId,
                })
            }
        })
        .add('gauge_updateStake', {
            stakeId,
            amount,
        })
        .add('gauge_updateTotalSupply', {
            gaugeId,
            amount,
        })
}

function handleWithdraw(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = gaugeAbi.events.Withdraw.decode(log)

    const userId = event.user.toLowerCase()

    const gaugeId = log.address
    ctx.store.defer(Gauge, gaugeId)

    const stakeId = createGaugeStakeId(gaugeId, userId)
    ctx.store.defer(GaugeStake, stakeId)

    const amount = -event.amount

    ctx.queue
        .add('gauge_updateStake', {
            stakeId,
            amount,
        })
        .add('gauge_updateTotalSupply', {
            gaugeId,
            amount,
        })
}

function handleHarvest(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = gaugeAbi.events.Harvest.decode(log)

    const userId = event.user.toLowerCase()
    const gaugeId = log.address

    const stakeId = createGaugeStakeId(gaugeId, userId)

    ctx.queue.add('gauge_rewardStake', {
        stakeId,
        amount: event.reward,
    })
}
