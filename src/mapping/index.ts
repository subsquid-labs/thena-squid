import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import {ProcessorItem} from '../processor'
import {getRouterV2Actions, isRouterV2Item} from './routerV2'
import {getThenaActions, isThenaItem} from './thena'
import {Action} from '../types/action'
import {getRouterV3Actions, isRouterV3Item} from './routerV3'
import {getAlgebraFactoryActions, isAlgebraFactoryItem} from './algebraFactory'
import {getSolidlyFactoryActions, isSolidlyFactoryItem} from './solidlyFactory'
import {getSolidlyPairActions, isSolidlyPairItem} from './solidlyPair'
import {getAlgebraPoolActions, isAlgebraPoolItem} from './algebraPool'
import {getHypervisorActions, isHypervisorItem} from './hypervisor'

export * from '../types/action'

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
        return getThenaActions(ctx, block, item)
    }

    if (isRouterV2Item(item)) {
        ctx.log.debug(`processing RouterV2 item...`)
        return getRouterV2Actions(ctx, block, item)
    }

    if (isRouterV3Item(item)) {
        ctx.log.debug(`processing RouterV3 item...`)
        return getRouterV3Actions(ctx, block, item)
    }

    if (isSolidlyFactoryItem(item)) {
        ctx.log.debug(`processing Solidly Factory item...`)
        return getSolidlyFactoryActions(ctx, block, item)
    }

    if (isSolidlyPairItem(item)) {
        ctx.log.debug(`processing Solidly Pair item...`)
        return getSolidlyPairActions(ctx, block, item)
    }

    if (isAlgebraFactoryItem(item)) {
        ctx.log.debug(`processing Algebra Factory item...`)
        return getAlgebraFactoryActions(ctx, block, item)
    }

    if (isAlgebraPoolItem(item)) {
        ctx.log.debug(`processing Algebra Pool item...`)
        return getAlgebraPoolActions(ctx, block, item)
    }

    if (isHypervisorItem(item)) {
        ctx.log.debug(`processing Hypervisor item...`)
        return await getHypervisorActions(ctx, block, item)
    }

    return []
}
