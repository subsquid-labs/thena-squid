import {DataHandlerContext} from '@subsquid/evm-processor'
import * as hypervisor from '../abi/hypervisor'
import {
    Action,
    AdjustValueUpdateLiquidityPositionAction,
    ChangeLiquidityPoolAction,
    EnsureHypervisorAction,
    EnsureLiquidityPositionAction,
    EnsureUserAction,
    SetBalancesPoolAction,
    ValueUpdateLiquidityPositionAction,
} from '../action'
import {ZERO_ADDRESS} from '../config'
import {Hypervisor, LiquidityPosition, Pool, User} from '../model'
import {Log} from '../processor'
import {CallCache} from '../utils/callQueue'
import {WrappedValue} from '../utils/deferred'
import {HypervisorManager} from '../utils/manager/hypervisorManager'
import {createLiquidityPositionId} from '../utils/ids'
import {StoreWithCache} from '../utils/store'

export function isHypervisorItem(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    return HypervisorManager.get(ctx).isHypervisor(item.address)
}

export async function getHypervisorActions(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    const actions: Action[] = []

    const hypervisorId = item.address

    const callCache = CallCache.get(ctx)
    const token0 = callCache.defer(item.block, hypervisor.functions.token0, {
        address: hypervisorId,
        args: [],
        transform: (v) => v.toLowerCase(),
    })

    const token1 = callCache.defer(item.block, hypervisor.functions.token1, {
        address: hypervisorId,
        args: [],
        transform: (v) => v.toLowerCase(),
    })

    const hypervisorPool = callCache.defer(item.block, hypervisor.functions.pool, {
        address: hypervisorId,
        args: [],
        transform: (v) => v.toLowerCase(),
    })

    actions.push(
        new EnsureHypervisorAction(item.block, item.transaction!, {
            hypervisor: ctx.store.defer(Hypervisor, hypervisorId),
            pool: ctx.store.defer(Pool, hypervisorId),
            address: hypervisorId,
            hypervisorPool,
            token0,
            token1,
        })
    )

    switch (item.topics[0]) {
        case hypervisor.events.Transfer.topic: {
            const event = hypervisor.events.Transfer.decode(item)

            const amount = event.value
            const from = event.from.toLowerCase()
            const to = event.to.toLowerCase()

            const poolId = item.address

            if (from === ZERO_ADDRESS) {
                actions.push(
                    new ChangeLiquidityPoolAction(item.block, item.transaction!, {
                        pool: ctx.store.defer(Pool, poolId),
                        amount,
                    })
                )
            } else {
                const positionId = createLiquidityPositionId(poolId, from)
                actions.push(
                    new EnsureUserAction(item.block, item.transaction!, {
                        user: ctx.store.defer(User, from),
                        address: from,
                    }),
                    new EnsureLiquidityPositionAction(item.block, item.transaction!, {
                        position: ctx.store.defer(LiquidityPosition, positionId),
                        id: positionId,
                        user: ctx.store.defer(User, from),
                        pool: ctx.store.defer(Pool, poolId),
                    }),
                    new ValueUpdateLiquidityPositionAction(item.block, item.transaction!, {
                        position: ctx.store.defer(LiquidityPosition, positionId, {pool: true}),
                        amount: -amount,
                    })
                )
            }

            if (to === ZERO_ADDRESS && from !== ZERO_ADDRESS) {
                actions.push(
                    new ChangeLiquidityPoolAction(item.block, item.transaction!, {
                        pool: ctx.store.defer(Pool, poolId),
                        amount: -amount,
                    })
                )
            } else {
                const positionId = createLiquidityPositionId(poolId, to)
                actions.push(
                    new EnsureUserAction(item.block, item.transaction!, {
                        user: ctx.store.defer(User, to),
                        address: to,
                    }),
                    new EnsureLiquidityPositionAction(item.block, item.transaction!, {
                        position: ctx.store.defer(LiquidityPosition, positionId),
                        id: positionId,
                        user: ctx.store.defer(User, to),
                        pool: ctx.store.defer(Pool, poolId),
                    }),
                    new ValueUpdateLiquidityPositionAction(item.block, item.transaction!, {
                        position: ctx.store.defer(LiquidityPosition, positionId, {pool: true}),
                        amount,
                    })
                )
            }

            break
        }
        case hypervisor.events.Deposit.topic: {
            const event = hypervisor.events.Deposit.decode(item)

            const userId = event.to.toLowerCase()
            const poolId = item.address

            const amount0 = event.amount0
            const amount1 = event.amount1

            actions.push(
                new AdjustValueUpdateLiquidityPositionAction(item.block, item.transaction!, {
                    position: ctx.store.defer(LiquidityPosition, createLiquidityPositionId(poolId, userId)),
                    amount0,
                    amount1,
                })
            )

            // actions.push(
            //     new SetBalancesPoolAction(item.block, item.transaction!, {
            //         id: poolId,
            //         value0: new DeferredCall(item.block, {
            //             address: PoolManager.instance.getTokens(poolId).token0,
            //             func: bep20.functions.balanceOf,
            //             args: [poolId],
            //             transform: (v) => v,
            //         }),
            //         value1: new DeferredCall(item.block, {
            //             address: PoolManager.instance.getTokens(poolId).token1,
            //             func: bep20.functions.balanceOf,
            //             args: [poolId],
            //             transform: (v) => v,
            //         }),
            //     })
            // )

            break
        }
        case hypervisor.events.Withdraw.topic: {
            const event = hypervisor.events.Withdraw.decode(item)

            const userId = event.to.toLowerCase()
            const poolId = item.address

            const amount0 = -event.amount0
            const amount1 = -event.amount1

            actions.push(
                new AdjustValueUpdateLiquidityPositionAction(item.block, item.transaction!, {
                    position: ctx.store.defer(LiquidityPosition, createLiquidityPositionId(poolId, userId)),
                    amount0,
                    amount1,
                })
            )

            // actions.push(
            //     new SetBalancesPoolAction(item.block, item.transaction!, {
            //         id: poolId,
            //         value0: new DeferredCall(item.block, {
            //             address: PoolManager.instance.getTokens(poolId).token0,
            //             func: bep20.functions.balanceOf,
            //             args: [poolId],
            //             transform: (v) => v,
            //         }),
            //         value1: new DeferredCall(item.block, {
            //             address: PoolManager.instance.getTokens(poolId).token1,
            //             func: bep20.functions.balanceOf,
            //             args: [poolId],
            //             transform: (v) => v,
            //         }),
            //     })
            // )

            break
        }
        case hypervisor.events.Rebalance.topic: {
            const event = hypervisor.events.Rebalance.decode(item)

            const poolId = item.address

            actions.push(
                new SetBalancesPoolAction(item.block, item.transaction!, {
                    pool: ctx.store.defer(Pool, poolId),
                    value0: new WrappedValue(event.totalAmount0),
                    value1: new WrappedValue(event.totalAmount1),
                })
            )

            break
        }
        default: {
            ctx.log.error(`unknown event ${item.topics[0]}`)
        }
    }

    return actions
}
