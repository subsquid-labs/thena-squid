import assert from 'assert'
import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import * as algebraPool from '../abi/algebraPool'
import {ProcessorItem} from '../processor'
import {Interaction, InteractionType, ProviderType} from './types'
import {ROUTER_V3_ADDRESS} from '../config'

export function isRouterV3Item(item: ProcessorItem) {
    return (
        item.address === ROUTER_V3_ADDRESS ||
        (item.kind === 'evmLog' && item.evmLog.topics[0] === algebraPool.events.Swap.topic)
    )
}

export async function getRouterV3Interactions(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem
): Promise<Interaction[]> {
    const interactions: Interaction[] = []

    switch (item.kind) {
        case 'evmLog': {
            switch (item.evmLog.topics[0]) {
                case algebraPool.events.Swap.topic: {
                    const event = algebraPool.events.Swap.decode(item.evmLog)

                    const id = event.recipient
                    const pool = item.address

                    const amount0 = event.amount0.toBigInt()
                    const amount1 = event.amount1.toBigInt()

                    interactions.push({
                        id,
                        type: InteractionType.Swap,
                        block,
                        provider: ProviderType.Algebra,
                        transaction: item.transaction,
                        amount0,
                        amount1,
                        pool,
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
                interactions.push({
                    id: item.transaction.from,
                    type: InteractionType.Unknown,
                    block,
                    transaction: item.transaction,
                })
            }
            break
        }
    }

    return interactions
}
