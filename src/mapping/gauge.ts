import {StoreWithCache} from '@belopash/squid-tools'
import * as gaugeAbi from '../abi/gaugeV2'
import {MappingContext} from '../interfaces'
import {Gauge, GaugeStake, User} from '../model'
import {Log} from '../processor'
import {createGaugeStakeId} from '../utils/ids'
import {GaugeManager} from '../utils/manager/gaugeManager'

export function isGaugeItem(ctx: MappingContext<StoreWithCache>, item: Log) {
    return GaugeManager.get(ctx).isGauge(item.address)
}

export function getGaugeActions(ctx: MappingContext<StoreWithCache>, item: Log) {
    switch (item.topics[0]) {
        case gaugeAbi.events.Deposit.topic: {
            const event = gaugeAbi.events.Deposit.decode(item)

            const userId = event.user.toLowerCase()
            const userDeferred = ctx.store.defer(User, userId)

            const gaugeId = item.address
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

            break
        }
        case gaugeAbi.events.Withdraw.topic: {
            const event = gaugeAbi.events.Withdraw.decode(item)

            const userId = event.user.toLowerCase()

            const gaugeId = item.address
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

            break
        }
        case gaugeAbi.events.Harvest.topic: {
            const event = gaugeAbi.events.Harvest.decode(item)

            const userId = event.user.toLowerCase()
            const gaugeId = item.address

            const stakeId = createGaugeStakeId(gaugeId, userId)

            ctx.queue.add('gauge_rewardStake', {
                stakeId,
                amount: event.reward,
            })

            break
        }
    }
}
