import {DataHandlerContext} from '@subsquid/evm-processor'
import * as algebraPool from '../abi/algebraPool'
import {ALGEBRA_FACTORY} from '../config'
import {Log} from '../processor'
import {PoolManager} from '../utils/pairManager'
import {
    Action,
    ChangeLiquidityPoolAction,
    RemovePositionHypervisorAction,
    SetLiquidityPoolAction,
    SetPositionHypervisorAction,
    SetSqrtPricePoolAction,
    SwapUserAction,
    UnknownPoolAction,
    UnknownTokenAction,
    UnknownUserAction,
    ValueUpdateLiquidityPositionAction,
} from '../types/action'
import {createLiquidityPositionId} from '../utils/ids'
import {WrappedValue} from '../utils/deferred'
import {HypervisorManager} from '../utils/hypervisorManager'

export function isAlgebraPoolItem(item: Log) {
    return PoolManager.instance.isPool(ALGEBRA_FACTORY, item.address)
}

export function getAlgebraPoolActions(ctx: DataHandlerContext<unknown>, item: Log) {
    const actions: Action[] = []

    // switch (item.kind) {
    //     case 'evmLog': {
    switch (item.topics[0]) {
        case algebraPool.events.Swap.topic: {
            const event = algebraPool.events.Swap.decode(item)

            const id = event.recipient
            const poolId = item.address

            const amount0 = event.amount0
            const amount1 = event.amount1

            const liquidity = event.liquidity

            actions.push(
                new UnknownTokenAction(item.block, item.transaction!, {
                    id: PoolManager.instance.getTokens(poolId).token0,
                })
            )
            actions.push(
                new UnknownTokenAction(item.block, item.transaction!, {
                    id: PoolManager.instance.getTokens(poolId).token1,
                })
            )

            actions.push(
                new SwapUserAction(item.block, item.transaction!, {
                    id,
                    amount0,
                    amount1,
                    poolId,
                })
            )

            actions.push(
                new SetLiquidityPoolAction(item.block, item.transaction!, {
                    id: poolId,
                    value: new WrappedValue(liquidity),
                })
            )

            actions.push(
                new SetSqrtPricePoolAction(item.block, item.transaction!, {
                    id: poolId,
                    value: event.price,
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

            actions.push(
                new ChangeLiquidityPoolAction(item.block, item.transaction!, {
                    id: poolId,
                    amount,
                })
            )

            actions.push(new UnknownUserAction(item.block, item.transaction!, {id: userId}))

            actions.push(
                new ValueUpdateLiquidityPositionAction(item.block, item.transaction!, {
                    id: createLiquidityPositionId(poolId, userId, event.bottomTick, event.topTick),
                    amount,
                    userId,
                    poolId,
                })
            )

            actions.push(
                new ChangeLiquidityPoolAction(item.block, item.transaction!, {
                    id: poolId,
                    amount,
                })
            )

            if (HypervisorManager.instance.isTracked(userId)) {
                actions.push(
                    new SetPositionHypervisorAction(item.block, item.transaction!, {
                        id: userId,
                        positionId: createLiquidityPositionId(poolId, userId, event.bottomTick, event.topTick),
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

            actions.push(
                new ChangeLiquidityPoolAction(item.block, item.transaction!, {
                    id: poolId,
                    amount,
                })
            )

            actions.push(new UnknownUserAction(item.block, item.transaction!, {id: userId}))

            actions.push(
                new ValueUpdateLiquidityPositionAction(item.block, item.transaction!, {
                    id: createLiquidityPositionId(poolId, userId, event.bottomTick, event.topTick),
                    amount,
                    userId,
                    poolId,
                })
            )

            actions.push(
                new ChangeLiquidityPoolAction(item.block, item.transaction!, {
                    id: poolId,
                    amount,
                })
            )

            if (HypervisorManager.instance.isTracked(userId)) {
                actions.push(
                    new RemovePositionHypervisorAction(item.block, item.transaction!, {
                        id: userId,
                        positionId: createLiquidityPositionId(poolId, userId, event.bottomTick, event.topTick),
                    })
                )
            }

            break
        }
        default: {
            ctx.log.error(`unknown event ${item.topics[0]}`)
        }
    }
    //         break
    //     }
    // }

    return actions
}
