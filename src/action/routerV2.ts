import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import * as pair from '../abi/solidlyPair'
import * as solidlyPair from '../abi/solidlyPair'
import {ProcessorItem} from '../processor'
import {Action, ActionKind, PoolActionDataType, UserActionDataType} from './types'
import {ROUTER_V2_ADDRESS} from '../config'

export function isRouterV2Item(item: ProcessorItem) {
    return (
        item.address === ROUTER_V2_ADDRESS ||
        (item.kind === 'evmLog' &&
            (item.evmLog.topics[0] === solidlyPair.events.Swap.topic ||
                item.evmLog.topics[0] === solidlyPair.events.Sync.topic))
    )
}

export async function getRouterV2Actions(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem
): Promise<Action[]> {
    const actions: Action[] = []

    switch (item.kind) {
        case 'evmLog': {
            switch (item.evmLog.topics[0]) {
                case solidlyPair.events.Swap.topic: {
                    const event = pair.events.Swap.decode(item.evmLog)

                    const pool = item.address
                    const to = event.to.toLowerCase()

                    let amount0: bigint, amount1: bigint
                    if (event.amount0In.toBigInt() === 0n) {
                        amount0 = event.amount0Out.toBigInt()
                        amount1 = -event.amount1In.toBigInt()
                    } else {
                        amount0 = -event.amount0In.toBigInt()
                        amount1 = event.amount1Out.toBigInt()
                    }

                    actions.push({
                        kind: ActionKind.User,
                        block,
                        transaction: item.transaction,
                        data: {
                            id: to,
                            type: UserActionDataType.Swap,
                            amount0,
                            amount1,
                            pool,
                        },
                    })

                    actions.push({
                        kind: ActionKind.Pool,
                        block,
                        transaction: item.transaction,
                        data: {
                            id: pool,
                            type: PoolActionDataType.Unknown,
                        },
                    })

                    break
                }
                case solidlyPair.events.Sync.topic: {
                    const event = pair.events.Sync.decode(item.evmLog)

                    actions.push({
                        block,
                        kind: ActionKind.Pool,
                        transaction: item.transaction,
                        data: {
                            id: item.address,
                            type: PoolActionDataType.Sync,
                            amount0: event.reserve0.toBigInt(),
                            amount1: event.reserve1.toBigInt(),
                        },
                    })

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
                //             type: PoolActionDataType.Balances,
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
                //             type: PoolActionDataType.Balances,
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
                //             type: PoolActionDataType.Balances,
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
        case 'transaction': {
            if (item.transaction.from != null) {
                actions.push({
                    kind: ActionKind.User,
                    block,
                    transaction: item.transaction,
                    data: {
                        id: item.transaction.from,
                        type: UserActionDataType.Unknown,
                    },
                })
            }
            break
        }
    }

    return actions
}
