import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import * as solidlyPair from '../abi/solidlyPair'
import {SOLIDLY_FACTORY, ZERO_ADDRESS} from '../config'
import {ProcessorItem} from '../processor'
import {PoolManager} from '../utils/pairManager'
import {
    Action,
    ActionKind,
    LiquidityUpdatePoolAction,
    SwapUserAction,
    SyncPoolAction,
    UnknownPoolAction,
    UnknownUserAction,
} from './types'
import {LiquidityPositionActionType, ValueUpdateLiquidityPositionAction} from './types/liquidityPosition'
import {createLiquidityPositionId} from '../utils/ids'

export function isSolidlyPairItem(item: ProcessorItem) {
    return PoolManager.instance.isPool(SOLIDLY_FACTORY, item.address)
}

export function getSolidlyPairActions(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem
) {
    const actions: Action[] = []

    switch (item.kind) {
        case 'evmLog': {
            switch (item.evmLog.topics[0]) {
                case solidlyPair.events.Swap.topic: {
                    const event = solidlyPair.events.Swap.decode(item.evmLog)

                    const poolId = item.address
                    const id = event.to.toLowerCase()

                    const [amount0, amount1] =
                        event.amount0In.toBigInt() === 0n
                            ? [event.amount0Out.toBigInt(), -event.amount1In.toBigInt()]
                            : [-event.amount0In.toBigInt(), event.amount1Out.toBigInt()]
                    if (amount0 === 0n || amount1 === 0n) break

                    // to make sure it will be prefetched
                    actions.push(new UnknownPoolAction(block, item.transaction, {id: poolId}))

                    actions.push(
                        new SwapUserAction(block, item.transaction, {
                            id,
                            amount0,
                            amount1,
                            poolId,
                        })
                    )

                    break
                }
                case solidlyPair.events.Sync.topic: {
                    const event = solidlyPair.events.Sync.decode(item.evmLog)

                    actions.push(
                        new SyncPoolAction(block, item.transaction, {
                            id: item.address,
                            amount0: event.reserve0.toBigInt(),
                            amount1: event.reserve1.toBigInt(),
                        })
                    )

                    break
                }
                case solidlyPair.events.Transfer.topic: {
                    const event = solidlyPair.events.Transfer.decode(item.evmLog)

                    const amount = event.amount.toBigInt()
                    const from = event.from.toLowerCase()
                    const to = event.to.toLowerCase()

                    const poolId = item.address

                    // to make sure it will be prefetched
                    actions.push(new UnknownPoolAction(block, item.transaction, {id: poolId}))

                    if (from === ZERO_ADDRESS) {
                        actions.push(
                            new LiquidityUpdatePoolAction(block, item.transaction, {
                                id: item.address,
                                amount,
                            })
                        )
                    } else {
                        actions.push(new UnknownUserAction(block, item.transaction, {id: from}))

                        actions.push(
                            new ValueUpdateLiquidityPositionAction(block, item.transaction, {
                                id: createLiquidityPositionId(item.address, from),
                                amount: -amount,
                                userId: from,
                                poolId,
                            })
                        )
                    }

                    if (to === ZERO_ADDRESS && from !== ZERO_ADDRESS) {
                        actions.push(
                            new LiquidityUpdatePoolAction(block, item.transaction, {
                                id: item.address,
                                amount: -amount,
                            })
                        )
                    } else {
                        actions.push(new UnknownUserAction(block, item.transaction, {id: from}))

                        actions.push(
                            new ValueUpdateLiquidityPositionAction(block, item.transaction, {
                                id: createLiquidityPositionId(item.address, from),
                                amount,
                                userId: to,
                                poolId,
                            })
                        )
                    }
                    break
                }
                // case solidlyPair.events.Mint.topic: {
                //     const event = pair.events.Mint.decode(item.evmLog)

                //     actions.push({
                //         block,
                //         kind: ActionKind.Pool,
                //         transaction: item.transaction,
                //         data: {
                //             id: item.address,
                //             type: PoolActionType.Balances,
                //             amount0: event.amount0.toBigInt(),
                //             amount1: event.amount1.toBigInt(),
                //         },
                //     })

                //     break
                // }
                // case solidlyPair.events.Burn.topic: {
                //     const event = pair.events.Burn.decode(item.evmLog)

                //     actions.push({
                //         block,
                //         kind: ActionKind.Pool,
                //         transaction: item.transaction,
                //         data: {
                //             id: item.address,
                //             type: PoolActionType.Balances,
                //             amount0: -event.amount0.toBigInt(),
                //             amount1: -event.amount1.toBigInt(),
                //         },
                //     })

                //     break
                // }
                // case solidlyPair.events.Fees.topic: {
                //     const event = pair.events.Burn.decode(item.evmLog)

                //     actions.push({
                //         block,
                //         kind: ActionKind.Pool,
                //         transaction: item.transaction,
                //         data: {
                //             id: item.address,
                //             type: PoolActionType.Balances,
                //             amount0: -event.amount0.toBigInt(),
                //             amount1: -event.amount1.toBigInt(),
                //         },
                //     })

                //     break
                // }
                default: {
                    ctx.log.error(`unknown event ${item.evmLog.topics[0]}`)
                }
            }
            break
        }
    }

    return actions
}
