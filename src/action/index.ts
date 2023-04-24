import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import {ProcessorItem} from '../processor'
import {getRouterV2Actions, isRouterV2Item} from './routerV2'
import {getThenaActions, isThenaItem} from './thena'
import {Action} from './types'
import {getRouterV3Actions, isRouterV3Item} from './routerV3'
import {getAlgebraFactoryActions, isAlgebraItem} from './algebra'
import {getSolidlyFactoryActions, isSolidlyItem} from './solidly'

export * from './types'

export async function getActions(ctx: BatchHandlerContext<unknown, ProcessorItem>): Promise<Action[]> {
    const actions: Action[] = []
    for (let {header: block, items} of ctx.blocks) {
        let prevItem: ProcessorItem | undefined
        for (let item of items) {
            const result = await getItemActions(ctx, block, item, prevItem)
            actions.push(...result)
            prevItem = item
        }
    }
    return actions
}

export async function getItemActions(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem,
    prevItem: ProcessorItem | undefined
): Promise<Action[]> {
    if (isThenaItem(item)) {
        ctx.log.debug(`processing Thena item...`)
        return await getThenaActions(ctx, block, item)
    }

    if (isRouterV2Item(item)) {
        ctx.log.debug(`processing RouterV2 item...`)
        return await getRouterV2Actions(ctx, block, item)
    }

    if (isRouterV3Item(item)) {
        ctx.log.debug(`processing RouterV3 item...`)
        return await getRouterV3Actions(ctx, block, item)
    }

    if (isAlgebraItem(item)) {
        ctx.log.debug(`processing AlgebraFactory item...`)
        return await getAlgebraFactoryActions(ctx, block, item)
    }

    if (isSolidlyItem(item)) {
        ctx.log.debug(`processing Solidly Factory item...`)
        return await getSolidlyFactoryActions(ctx, block, item)
    }

    return []
}
