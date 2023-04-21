import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import {THENA_ADDRESS, ROUTER_V2_ADDRESS} from '../config'
import {ProcessorItem} from '../processor'
import {getRouterV2Interactions, isRouterV2Item} from './routerV2'
import {getThenaInteractions, isThenaItem} from './thena'
import {Interaction} from './types'

export * from './types'

export async function getInteractions(ctx: BatchHandlerContext<unknown, ProcessorItem>): Promise<Interaction[]> {
    const interactions: Interaction[] = []
    for (let {header: block, items} of ctx.blocks) {
        const result = await getBlockInteractions(ctx, block, items)
        interactions.push(...result)
    }
    return interactions
}

export async function getBlockInteractions(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    items: ProcessorItem[]
): Promise<Interaction[]> {
    let interactions: Interaction[] = []

    let prevItem: ProcessorItem | undefined
    for (let item of items) {
        const result = await getItemInteractions(ctx, block, item, prevItem)
        interactions.push(...result)
        prevItem = item
    }

    return interactions
}

export async function getItemInteractions(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem,
    prevItem: ProcessorItem | undefined
): Promise<Interaction[]> {
    if (isThenaItem(item)) {
        ctx.log.debug(`processing Thena item...`)
        return await getThenaInteractions(ctx, block, item)
    } else if (isRouterV2Item(item)) {
        ctx.log.debug(`processing RouterV2 item...`)
        return await getRouterV2Interactions(ctx, block, item, prevItem)
    } else {
        return []
    }
}
