import assert from 'assert'
import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import * as pair from '../abi/solidlyPair'
import * as routerV2 from '../abi/routerV2'
import {ProcessorItem} from '../processor'
import {Interaction, InteractionType} from './types'
import {ROUTER_V2_ADDRESS} from '../config'

export function isRouterV2Item(item: ProcessorItem) {
    return item.address === ROUTER_V2_ADDRESS
}

export async function getRouterV2Interactions(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem,
    prevItem: ProcessorItem | undefined
): Promise<Interaction[]> {
    const interactions: Interaction[] = []

    switch (item.kind) {
        case 'evmLog': {
            switch (item.evmLog.topics[0]) {
                case routerV2.events.Swap.topic: {
                    assert(prevItem != null)
                    assert(prevItem.kind === 'evmLog')
                    assert(prevItem.evmLog.topics[0] === pair.events.Swap.topic)

                    const pairEvent = pair.events.Swap.decode(prevItem.evmLog)
                    const routerEvent = routerV2.events.Swap.decode(item.evmLog)

                    const route = prevItem.address
                    const to = routerEvent.to.toLowerCase()

                    const contract = new pair.Contract(ctx, block, prevItem.address)

                    const tokenIn = routerEvent._tokenIn.toLowerCase()
                    let tokenOut: string
                    let amountIn: bigint
                    let amountOut: bigint
                    if (pairEvent.amount0In.toBigInt() === 0n) {
                        tokenOut = await contract.token0().then((t) => t.toLowerCase())
                        amountIn = pairEvent.amount1In.toBigInt()
                        assert(pairEvent.amount1Out.toBigInt() === 0n)
                        amountOut = pairEvent.amount0Out.toBigInt()
                    } else {
                        tokenOut = await contract.token1().then((t) => t.toLowerCase())
                        amountIn = pairEvent.amount0In.toBigInt()
                        assert(pairEvent.amount0Out.toBigInt() === 0n)
                        amountOut = pairEvent.amount1Out.toBigInt()
                    }
                    assert(amountIn === routerEvent.amount0In.toBigInt())
                    assert(tokenOut !== tokenIn)

                    interactions.push({
                        id: to,
                        type: InteractionType.Swap,
                        block,
                        transaction: item.transaction,
                        tokenIn,
                        amountIn,
                        tokenOut,
                        amountOut,
                        route,
                    })
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
