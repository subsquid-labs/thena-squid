import {DataHandlerContext} from '@subsquid/evm-processor'
import * as algebraPool from '../abi/algebraPool'
import {ALGEBRA_FACTORY, USD_ADDRESS} from '../config'
import {Log} from '../processor'
import {PoolManager} from '../utils/manager/poolManager'
import {
    Action,
    ChangeLiquidityPoolAction,
    EnsureLiquidityPositionAction,
    EnsureUserAction,
    RecalculatePricesPoolAction,
    RemovePositionHypervisorAction,
    SetLiquidityPoolAction,
    SetPositionHypervisorAction,
    SetSqrtPricePoolAction,
    SwapUserAction,
    ValueUpdateLiquidityPositionAction,
} from '../action'
import {createLiquidityPositionId} from '../utils/ids'
import {WrappedValue} from '../utils/deferred'
import {HypervisorManager} from '../utils/manager/hypervisorManager'
import {StoreWithCache} from '../utils/store'
import {Hypervisor, LiquidityPosition, Pool, Token, User} from '../model'

export function isAlgebraPoolItem(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    return PoolManager.get(ctx).isPool(ALGEBRA_FACTORY, item.address)
}

export function getAlgebraPoolActions(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    const actions: Action[] = []

    switch (item.topics[0]) {
        case algebraPool.events.Swap.topic: {
            const event = algebraPool.events.Swap.decode(item)

            const id = event.recipient.toLowerCase()
            const poolId = item.address

            const amount0 = event.amount0
            const amount1 = event.amount1

            const liquidity = event.liquidity

            actions.push(
                new EnsureUserAction(item.block, item.transaction!, {
                    user: ctx.store.defer(User, id),
                    address: id,
                }),
                new SwapUserAction(item.block, item.transaction!, {
                    user: ctx.store.defer(User, id),
                    amount0,
                    amount1,
                    pool: ctx.store.defer(Pool, item.address, {token0: true, token1: true}),
                    usdToken: ctx.store.defer(Token, USD_ADDRESS),
                }),
                new SetLiquidityPoolAction(item.block, item.transaction!, {
                    pool: ctx.store.defer(Pool, item.address),
                    value: new WrappedValue(liquidity),
                }),
                new SetSqrtPricePoolAction(item.block, item.transaction!, {
                    pool: ctx.store.defer(Pool, item.address),
                    value: event.price,
                }),
                new RecalculatePricesPoolAction(item.block, item.transaction!, {
                    pool: ctx.store.defer(Pool, item.address, {token0: true, token1: true}),
                })
            )

            break
        }
        case algebraPool.events.Mint.topic: {
            const event = algebraPool.events.Mint.decode(item)

            const userId = event.owner.toLowerCase()
            const poolId = item.address

            const amount = event.liquidityAmount
            if (amount === 0n) break

            const positionId = createLiquidityPositionId(poolId, userId, event.bottomTick, event.topTick)
            actions.push(
                new ChangeLiquidityPoolAction(item.block, item.transaction!, {
                    pool: ctx.store.defer(Pool, item.address),
                    amount,
                }),
                new EnsureUserAction(item.block, item.transaction!, {
                    user: ctx.store.defer(User, userId),
                    address: userId,
                }),
                new EnsureLiquidityPositionAction(item.block, item.transaction!, {
                    position: ctx.store.defer(LiquidityPosition, positionId),
                    id: positionId,
                    user: ctx.store.defer(User, userId),
                    pool: ctx.store.defer(Pool, item.address),
                }),
                new ChangeLiquidityPoolAction(item.block, item.transaction!, {
                    pool: ctx.store.defer(Pool, item.address),
                    amount,
                }),
                new ValueUpdateLiquidityPositionAction(item.block, item.transaction!, {
                    position: ctx.store.defer(LiquidityPosition, positionId, {pool: true}),
                    amount,
                    amount0: event.amount0,
                    amount1: event.amount1,
                })
            )

            if (HypervisorManager.get(ctx).isTracked(userId)) {
                actions.push(
                    new SetPositionHypervisorAction(item.block, item.transaction!, {
                        hypervisor: ctx.store.defer(Hypervisor, userId, {basePosition: true, limitPosition: true}),
                        position: ctx.store.defer(LiquidityPosition, positionId),
                    })
                )
            }

            break
        }
        case algebraPool.events.Burn.topic: {
            const event = algebraPool.events.Burn.decode(item)

            const userId = event.owner.toLowerCase()
            const poolId = item.address

            const amount = -event.liquidityAmount
            if (amount === 0n) break

            const positionId = createLiquidityPositionId(poolId, userId, event.bottomTick, event.topTick)
            actions.push(
                new ChangeLiquidityPoolAction(item.block, item.transaction!, {
                    pool: ctx.store.defer(Pool, item.address),
                    amount,
                }),
                new EnsureUserAction(item.block, item.transaction!, {
                    user: ctx.store.defer(User, userId),
                    address: userId,
                }),
                new EnsureLiquidityPositionAction(item.block, item.transaction!, {
                    position: ctx.store.defer(LiquidityPosition, positionId),
                    id: positionId,
                    user: ctx.store.defer(User, userId),
                    pool: ctx.store.defer(Pool, item.address),
                }),
                new ChangeLiquidityPoolAction(item.block, item.transaction!, {
                    pool: ctx.store.defer(Pool, item.address),
                    amount,
                }),
                new ValueUpdateLiquidityPositionAction(item.block, item.transaction!, {
                    position: ctx.store.defer(LiquidityPosition, positionId, {pool: true}),
                    amount,
                    amount0: -event.amount0,
                    amount1: -event.amount1,
                })
            )

            if (HypervisorManager.get(ctx).isTracked(userId)) {
                actions.push(
                    new RemovePositionHypervisorAction(item.block, item.transaction!, {
                        hypervisor: ctx.store.defer(Hypervisor, userId, {basePosition: true, limitPosition: true}),
                        position: ctx.store.defer(LiquidityPosition, positionId),
                    })
                )
            }

            break
        }
        default: {
            ctx.log.error(`unknown event ${item.topics[0]}`)
        }
    }

    return actions
}
