import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import * as algebraPool from '../abi/algebraPool'
import {ALGEBRA_FACTORY} from '../config'
import {ProcessorItem} from '../processor'
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

export function isAlgebraPoolItem(item: ProcessorItem) {
    return PoolManager.instance.isPool(ALGEBRA_FACTORY, item.address)
}

export function getAlgebraPoolActions(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem
) {
    const actions: Action[] = []

    switch (item.kind) {
        case 'evmLog': {
            switch (item.evmLog.topics[0]) {
                case algebraPool.events.Swap.topic: {
                    const event = algebraPool.events.Swap.decode(item.evmLog)

                    const id = event.recipient
                    const poolId = item.address

                    const amount0 = event.amount0.toBigInt()
                    const amount1 = event.amount1.toBigInt()

                    const liquidity = event.liquidity.toBigInt()

                    actions.push(
                        new UnknownTokenAction(block, item.transaction, {
                            id: PoolManager.instance.getTokens(poolId).token0,
                        })
                    )
                    actions.push(
                        new UnknownTokenAction(block, item.transaction, {
                            id: PoolManager.instance.getTokens(poolId).token1,
                        })
                    )

                    actions.push(
                        new SwapUserAction(block, item.transaction, {
                            id,
                            amount0,
                            amount1,
                            poolId,
                        })
                    )

                    actions.push(
                        new SetLiquidityPoolAction(block, item.transaction, {
                            id: poolId,
                            value: new WrappedValue(liquidity),
                        })
                    )

                    actions.push(
                        new SetSqrtPricePoolAction(block, item.transaction, {
                            id: poolId,
                            value: event.price.toBigInt(),
                        })
                    )

                    break
                }
                case algebraPool.events.Mint.topic: {
                    const event = algebraPool.events.Mint.decode(item.evmLog)

                    const userId = event.owner.toLowerCase()
                    const poolId = item.address

                    const amount = event.liquidityAmount.toBigInt()
                    if (amount === 0n) break

                    actions.push(
                        new ChangeLiquidityPoolAction(block, item.transaction, {
                            id: poolId,
                            amount,
                        })
                    )

                    actions.push(new UnknownUserAction(block, item.transaction, {id: userId}))

                    actions.push(
                        new ValueUpdateLiquidityPositionAction(block, item.transaction, {
                            id: createLiquidityPositionId(poolId, userId, event.bottomTick, event.topTick),
                            amount,
                            userId,
                            poolId,
                        })
                    )

                    actions.push(
                        new ChangeLiquidityPoolAction(block, item.transaction, {
                            id: poolId,
                            amount,
                        })
                    )

                    if (HypervisorManager.instance.isTracked(userId)) {
                        actions.push(
                            new SetPositionHypervisorAction(block, item.transaction, {
                                id: userId,
                                positionId: createLiquidityPositionId(poolId, userId, event.bottomTick, event.topTick),
                            })
                        )
                    }

                    break
                }
                case algebraPool.events.Burn.topic: {
                    const event = algebraPool.events.Burn.decode(item.evmLog)

                    const userId = event.owner.toLowerCase()
                    const poolId = item.address

                    const amount = -event.liquidityAmount.toBigInt()
                    if (amount === 0n) break

                    actions.push(
                        new ChangeLiquidityPoolAction(block, item.transaction, {
                            id: poolId,
                            amount,
                        })
                    )

                    actions.push(new UnknownUserAction(block, item.transaction, {id: userId}))

                    actions.push(
                        new ValueUpdateLiquidityPositionAction(block, item.transaction, {
                            id: createLiquidityPositionId(poolId, userId, event.bottomTick, event.topTick),
                            amount,
                            userId,
                            poolId,
                        })
                    )

                    actions.push(
                        new ChangeLiquidityPoolAction(block, item.transaction, {
                            id: poolId,
                            amount,
                        })
                    )

                    if (HypervisorManager.instance.isTracked(userId)) {
                        actions.push(
                            new RemovePositionHypervisorAction(block, item.transaction, {
                                id: userId,
                                positionId: createLiquidityPositionId(poolId, userId, event.bottomTick, event.topTick),
                            })
                        )
                    }

                    break
                }
                default: {
                    ctx.log.error(`unknown event ${item.evmLog.topics[0]}`)
                }
            }
            break
        }
    }

    return actions
}
