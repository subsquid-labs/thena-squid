import {getRouterV2Actions, isRouterV2Item} from './routerV2'
import {getThenaActions, isThenaItem} from './thena'
import {Action} from '../action'
import {getRouterV3Actions, isRouterV3Item} from './routerV3'
import {getAlgebraFactoryActions, isAlgebraFactoryItem} from './algebraFactory'
import {getSolidlyFactoryActions, isSolidlyFactoryItem} from './solidlyFactory'
import {getSolidlyPairActions, isSolidlyPairItem} from './solidlyPair'
import {getAlgebraPoolActions, isAlgebraPoolItem} from './algebraPool'
import {getHypervisorActions, isHypervisorItem} from './hypervisor'
import {DataHandlerContext} from '@subsquid/evm-processor'
import {Fields, Log} from '../processor'
import {StoreWithCache} from '../utils/store'
import {getVoterActions, isVoterItem} from './voter'
import {getGaugeActions, isGaugeItem} from './gauge'
import {GaugeManager, PoolManager, HypervisorManager} from '../utils/manager'
import {getVeTokenActions, isVeTokenItem} from './veToken'
import {getRebaseDistributorActions, isRebaseDistributorItem} from './rebaseDistributor'
import {getBribeActions, isBribeItem} from './bribe'

export async function getActions(ctx: DataHandlerContext<StoreWithCache, Fields>): Promise<Action[]> {
    await GaugeManager.get(ctx).init()
    await PoolManager.get(ctx).init()
    await HypervisorManager.get(ctx).init()

    const actions: Action[] = []
    for (let {logs, transactions, traces} of ctx.blocks) {
        for (let log of logs) {
            const result = await getItemActions(ctx, log)
            actions.push(...result)
        }
    }
    return actions
}

export async function getItemActions(ctx: DataHandlerContext<StoreWithCache, Fields>, item: Log): Promise<Action[]> {
    if (isThenaItem(item)) {
        return getThenaActions(ctx, item)
    }

    if (isRouterV2Item(item)) {
        return getRouterV2Actions(ctx, item)
    }

    if (isRouterV3Item(item)) {
        return getRouterV3Actions(ctx, item)
    }

    if (isSolidlyFactoryItem(item)) {
        return getSolidlyFactoryActions(ctx, item)
    }

    if (isSolidlyPairItem(ctx, item)) {
        return getSolidlyPairActions(ctx, item)
    }

    if (isAlgebraFactoryItem(item)) {
        return getAlgebraFactoryActions(ctx, item)
    }

    if (isAlgebraPoolItem(ctx, item)) {
        return getAlgebraPoolActions(ctx, item)
    }

    if (isHypervisorItem(ctx, item)) {
        return await getHypervisorActions(ctx, item)
    }

    if (isVoterItem(ctx, item)) {
        return await getVoterActions(ctx, item)
    }

    if (isGaugeItem(ctx, item)) {
        return await getGaugeActions(ctx, item)
    }

    if (isBribeItem(ctx, item)) {
        return await getBribeActions(ctx, item)
    }

    if (isVeTokenItem(ctx, item)) {
        return await getVeTokenActions(ctx, item)
    }

    if (isRebaseDistributorItem(ctx, item)) {
        return await getRebaseDistributorActions(ctx, item)
    }

    return []
}
