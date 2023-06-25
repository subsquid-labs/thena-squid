import {DataHandlerContext} from '@subsquid/evm-processor'
import {Log} from '../processor'
import {GaugeManager} from '../utils/manager/gaugeManager'
import {StoreWithCache} from '@belopash/squid-tools'
import * as gaugeAbi from '../abi/gaugeV2'
import {Action, EnsureUserAction} from '../action'
import {Gauge, GaugeStake, User} from '../model'
import {
    EnsureStakeGaugeAction,
    RewardStakeGaugeAction,
    UpdateStakeGaugeAction,
    UpdateTotalSupplyGaugeAction,
} from '../action/gauge'
import {createGaugeStakeId} from '../utils/ids'
import {ContractChecker} from '../utils/contractChecker'

export function isGaugeItem(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    return GaugeManager.get(ctx).isGauge(item.address)
}

export async function getGaugeActions(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    const actions: Action[] = []

    switch (item.topics[0]) {
        case gaugeAbi.events.Deposit.topic: {
            const event = gaugeAbi.events.Deposit.decode(item)

            const userId = event.user.toLowerCase()
            const gauge = item.address
            const amount = event.amount

            const stakeId = createGaugeStakeId(gauge, userId)
            actions.push(
                new EnsureUserAction(item.block, item.transaction!, {
                    user: ctx.store.defer(User, userId),
                    address: userId,
                    isContract: ContractChecker.get(ctx).defer(userId),
                }),
                new EnsureStakeGaugeAction(item.block, item.transaction!, {
                    stake: ctx.store.defer(GaugeStake, stakeId),
                    gauge: ctx.store.defer(Gauge, gauge),
                    user: ctx.store.defer(User, userId),
                    id: stakeId,
                }),
                new UpdateStakeGaugeAction(item.block, item.transaction!, {
                    stake: ctx.store.defer(GaugeStake, stakeId),
                    amount,
                }),
                new UpdateTotalSupplyGaugeAction(item.block, item.transaction!, {
                    gauge: ctx.store.defer(Gauge, gauge),
                    amount,
                })
            )

            break
        }
        case gaugeAbi.events.Withdraw.topic: {
            const event = gaugeAbi.events.Withdraw.decode(item)

            const user = event.user.toLowerCase()
            const gauge = item.address
            const amount = -event.amount

            const stakeId = createGaugeStakeId(gauge, user)
            actions.push(
                new UpdateStakeGaugeAction(item.block, item.transaction!, {
                    stake: ctx.store.defer(GaugeStake, stakeId),
                    amount,
                }),
                new UpdateTotalSupplyGaugeAction(item.block, item.transaction!, {
                    gauge: ctx.store.defer(Gauge, gauge),
                    amount,
                })
            )

            break
        }
        case gaugeAbi.events.Harvest.topic: {
            const event = gaugeAbi.events.Harvest.decode(item)

            const user = event.user.toLowerCase()
            const gauge = item.address

            const stakeId = createGaugeStakeId(gauge, user)
            actions.push(
                new RewardStakeGaugeAction(item.block, item.transaction!, {
                    stake: ctx.store.defer(GaugeStake, stakeId),
                    amount: event.reward,
                })
            )

            break
        }
    }

    return actions
}
