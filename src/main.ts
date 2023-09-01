import {StoreWithCache, TypeormDatabaseWithCache} from '@belopash/typeorm-store'
import {ActionQueue} from './action/actionQueue'
import {MappingContext} from './interfaces'
import {getAlgebraFactoryActions, isAlgebraFactoryItem} from './mapping/algebraFactory'
import {getAlgebraPoolActions, isAlgebraPoolItem} from './mapping/algebraPool'
import {getBribeActions, isBribeItem} from './mapping/bribe'
import {getGaugeActions, isGaugeItem} from './mapping/gauge'
import {getHypervisorActions, isHypervisorItem} from './mapping/hypervisor'
import {getRebaseDistributorActions, isRebaseDistributorItem} from './mapping/rebaseDistributor'
import {getRouterV2Actions, isRouterV2Item} from './mapping/routerV2'
import {getRouterV3Actions, isRouterV3Item} from './mapping/routerV3'
import {getSolidlyFactoryActions, isSolidlyFactoryItem} from './mapping/solidlyFactory'
import {getSolidlyPairActions, isSolidlyPairItem} from './mapping/solidlyPair'
import {getThenaActions, isThenaItem} from './mapping/thena'
import {getVeTokenActions, isVeTokenItem} from './mapping/veToken'
import {getVoterActions, isVoterItem} from './mapping/voter'
import {getTradingCompetitionManagerActions, isTradingCompetitionManagerItem} from './mapping/tradingCompetitionManager'
import {Log, processor} from './processor'
import {GaugeManager, HypervisorManager, PoolManager} from './utils/manager'
import {BribeManager} from './utils/manager/bribeManager'

processor.run(new TypeormDatabaseWithCache({supportHotBlocks: true}), async (ctx) => {
    const queue = new ActionQueue({
        _chain: ctx._chain,
        log: ctx.log,
        store: ctx.store,
    })

    await GaugeManager.get(ctx).init()
    await BribeManager.get(ctx).init()
    await PoolManager.get(ctx).init()
    await HypervisorManager.get(ctx).init()

    for (let block of ctx.blocks) {
        queue.setBlock(block.header)
        for (let log of block.logs) {
            queue.setTransaction(log.transaction)
            getItemActions({...ctx, queue}, log)
        }
    }

    await queue.process()
    await ctx.store.flush()
})

export function getItemActions(ctx: MappingContext<StoreWithCache>, item: Log) {
    if (isThenaItem(item)) {
        getThenaActions(ctx, item)
    }

    if (isRouterV2Item(item)) {
        getRouterV2Actions(ctx, item)
    }

    if (isRouterV3Item(item)) {
        getRouterV3Actions(ctx, item)
    }

    if (isSolidlyFactoryItem(item)) {
        getSolidlyFactoryActions(ctx, item)
    }

    if (isSolidlyPairItem(ctx, item)) {
        getSolidlyPairActions(ctx, item)
    }

    if (isAlgebraFactoryItem(item)) {
        getAlgebraFactoryActions(ctx, item)
    }

    if (isAlgebraPoolItem(ctx, item)) {
        getAlgebraPoolActions(ctx, item)
    }

    if (isHypervisorItem(ctx, item)) {
        getHypervisorActions(ctx, item)
    }

    if (isVoterItem(ctx, item)) {
        getVoterActions(ctx, item)
    }

    if (isGaugeItem(ctx, item)) {
        getGaugeActions(ctx, item)
    }

    if (isBribeItem(ctx, item)) {
        getBribeActions(ctx, item)
    }

    if (isVeTokenItem(ctx, item)) {
        getVeTokenActions(ctx, item)
    }

    if (isRebaseDistributorItem(ctx, item)) {
        getRebaseDistributorActions(ctx, item)
    }

    if (isTradingCompetitionManagerItem(item)) {
        return getTradingCompetitionManagerActions(ctx, item)
    }
}
