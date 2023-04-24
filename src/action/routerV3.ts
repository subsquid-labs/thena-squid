import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import * as algebraPool from '../abi/algebraPool'
import {ProcessorItem} from '../processor'
import {Action, ActionKind, PoolActionDataType, UserActionDataType} from './types'
import {ROUTER_V3_ADDRESS} from '../config'

export function isRouterV3Item(item: ProcessorItem) {
    return (
        item.address === ROUTER_V3_ADDRESS ||
        (item.kind === 'evmLog' && item.evmLog.topics[0] === algebraPool.events.Swap.topic)
    )
}

export async function getRouterV3Actions(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem
): Promise<Action[]> {
    const actions: Action[] = []

    switch (item.kind) {
        case 'evmLog': {
            switch (item.evmLog.topics[0]) {
                case algebraPool.events.Swap.topic: {
                    const event = algebraPool.events.Swap.decode(item.evmLog)

                    const id = event.recipient
                    const pool = item.address

                    const amount0 = event.amount0.toBigInt()
                    const amount1 = event.amount1.toBigInt()

                    actions.push({
                        kind: ActionKind.User,
                        block,
                        transaction: item.transaction,
                        data: {
                            id,
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
                default: {
                    ctx.log.error({block, item}, `unknown event ${item.evmLog.topics[0]}`)
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
