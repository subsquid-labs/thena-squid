import {getRouterV2Actions, isRouterV2Item} from './routerV2'
import {getThenaActions, isThenaItem} from './thena'
import {Action} from '../types/action'
import {getRouterV3Actions, isRouterV3Item} from './routerV3'
import {getAlgebraFactoryActions, isAlgebraFactoryItem} from './algebraFactory'
import {getSolidlyFactoryActions, isSolidlyFactoryItem} from './solidlyFactory'
import {getSolidlyPairActions, isSolidlyPairItem} from './solidlyPair'
import {getAlgebraPoolActions, isAlgebraPoolItem} from './algebraPool'
import {getHypervisorActions, isHypervisorItem} from './hypervisor'
import {DataHandlerContext} from '@subsquid/evm-processor'
import {Fields, Log} from '../processor'
import {StoreWithCache} from '../utils/store'

export async function getActions(ctx: DataHandlerContext<StoreWithCache, Fields>): Promise<Action[]> {
    const actions: Action[] = []
    for (let {header: block, logs, transactions} of ctx.blocks) {
        for (let log of logs) {
            const result = await getItemActions(ctx, log)
            actions.push(...result)
            // prevItem = item
        }
    }
    return actions
}

export async function getItemActions(ctx: DataHandlerContext<StoreWithCache, Fields>, item: Log): Promise<Action[]> {
    if (isThenaItem(item)) {
        ctx.log.debug(`processing Thena item...`)
        return getThenaActions(ctx, item)
    }

    if (isRouterV2Item(item)) {
        ctx.log.debug(`processing RouterV2 item...`)
        return getRouterV2Actions(ctx, item)
    }

    if (isRouterV3Item(item)) {
        ctx.log.debug(`processing RouterV3 item...`)
        return getRouterV3Actions(ctx, item)
    }

    if (isSolidlyFactoryItem(item)) {
        ctx.log.debug(`processing Solidly Factory item...`)
        return getSolidlyFactoryActions(ctx, item)
    }

    if (isSolidlyPairItem(item)) {
        ctx.log.debug(`processing Solidly Pair item...`)
        return getSolidlyPairActions(ctx, item)
    }

    if (isAlgebraFactoryItem(item)) {
        ctx.log.debug(`processing Algebra Factory item...`)
        return getAlgebraFactoryActions(ctx, item)
    }

    if (isAlgebraPoolItem(item)) {
        ctx.log.debug(`processing Algebra Pool item...`)
        return getAlgebraPoolActions(ctx, item)
    }

    if (isHypervisorItem(item)) {
        ctx.log.debug(`processing Hypervisor item...`)
        return await getHypervisorActions(ctx, item)
    }

    return []
}
