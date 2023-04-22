import assert from 'assert'
import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import * as pair from '../abi/solidlyPair'
import * as routerV2 from '../abi/routerV2'
import * as solidlyPair from '../abi/solidlyPair'
import {ProcessorItem} from '../processor'
import {Interaction, InteractionType, ProviderType} from './types'
import {ROUTER_V2_ADDRESS} from '../config'

export function isRouterV2Item(item: ProcessorItem) {
    return (
        item.address === ROUTER_V2_ADDRESS ||
        (item.kind === 'evmLog' && item.evmLog.topics[0] === solidlyPair.events.Swap.topic)
    )
}

export async function getRouterV2Interactions(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem
): Promise<Interaction[]> {
    const interactions: Interaction[] = []

    switch (item.kind) {
        case 'evmLog': {
            switch (item.evmLog.topics[0]) {
                case solidlyPair.events.Swap.topic: {
                    // assert(prevItem != null)
                    // assert(prevItem.kind === 'evmLog')
                    // assert(prevItem.evmLog.topics[0] === pair.events.Swap.topic)

                    const event = pair.events.Swap.decode(item.evmLog)
                    // const routerEvent = routerV2.events.Swap.decode(item.evmLog)

                    const pool = item.address
                    const to = event.to.toLowerCase()

                    // const tokenIn = routerEvent._tokenIn.toLowerCase()
                    let amount0: bigint, amount1: bigint
                    if (event.amount0In.toBigInt() === 0n) {
                        amount0 = event.amount0Out.toBigInt()
                        amount1 = -event.amount1In.toBigInt()
                    } else {
                        amount0 = -event.amount0In.toBigInt()
                        amount1 = event.amount1Out.toBigInt()
                    }

                    interactions.push({
                        id: to,
                        type: InteractionType.Swap,
                        block,
                        transaction: item.transaction,
                        provider: ProviderType.Solidly,
                        // tokenIn,
                        amount0,
                        amount1,
                        pool,
                    })
                    break
                }
                default: {
                    ctx.log.error(`unknown event ${item.evmLog.topics[0]}`)
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
