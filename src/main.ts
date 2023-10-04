import { StoreWithCache, TypeormDatabaseWithCache } from '@belopash/typeorm-store'
import { ActionQueue } from './action/actionQueue'
import { MappingContext } from './interfaces'
import { getAlgebraFactoryActions } from './mapping/algebraFactory'
import { getAlgebraPoolActions } from './mapping/algebraPool'
import { getBribeActions } from './mapping/bribe'
import { Item } from './mapping/common'
import { getGaugeActions } from './mapping/gauge'
import { getHypervisorActions } from './mapping/hypervisor'
import { getRebaseDistributorActions } from './mapping/rebaseDistributor'
import { getRouterV2Actions } from './mapping/routerV2'
import { getRouterV3Actions } from './mapping/routerV3'
import { getSolidlyFactoryActions } from './mapping/solidlyFactory'
import { getSolidlyPairActions } from './mapping/solidlyPair'
import { getThenaActions } from './mapping/thena'
import { getThenianNftActions } from './mapping/thenianNft'
import { getTradingCompetitionManagerActions } from './mapping/tradingCompetitionManager'
import { getVeTokenActions } from './mapping/veToken'
import { getVoterActions } from './mapping/voter'
import { BlockData, processor } from './processor'
import { GaugeManager, HypervisorManager, PoolManager } from './utils/manager'
import { BribeManager } from './utils/manager/bribeManager'
import { getTCParticipantActions } from './mapping/tcParticipant'
import { getUsernameNftActions } from './mapping/usernameNft'

const INTERVAL = 3 * 60 * 1000// 3 minutes
let prevBlock: any = null

processor.run(new TypeormDatabaseWithCache({ supportHotBlocks: true }), async (ctx) => {
    const queue = new ActionQueue({
        _chain: ctx._chain,
        log: ctx.log,
        store: ctx.store,
    })

    await GaugeManager.get(ctx).init()
    await BribeManager.get(ctx).init()
    await PoolManager.get(ctx).init()
    await HypervisorManager.get(ctx).init()

    if (!prevBlock)
        prevBlock = ctx.blocks[0]

    for (let block of ctx.blocks) {
        queue.setBlock(block.header)
        const items = orderItems(block)

        if ((block.header.timestamp - prevBlock.header.timestamp > INTERVAL)) {
            prevBlock = block
            getTCParticipantActions({ ...ctx, queue }, prevBlock.logs[prevBlock.logs.length - 1])
        }


        for (let item of items) {
            const tx = item.kind === 'log' ? item.value.transaction : item.value
            queue.setTransaction(tx)

            processItem({ ...ctx, queue }, item)
        }
    }

    await queue.process()
    await ctx.store.flush()
})

export function orderItems(block: BlockData) {
    const items: Item[] = []

    for (const transaction of block.transactions) {
        items.push({
            kind: 'transaction',
            address: transaction.to,
            value: transaction,
        })
    }

    for (const log of block.logs) {
        items.push({
            kind: 'log',
            address: log.address,
            value: log,
        })
    }

    items.sort((a, b) => {
        if (a.kind === 'log' && b.kind === 'log') {
            return a.value.logIndex - b.value.logIndex
        } else if (a.kind === 'transaction' && b.kind === 'transaction') {
            return a.value.transactionIndex - b.value.transactionIndex
        } else if (a.kind === 'log' && b.kind === 'transaction') {
            return a.value.transactionIndex - b.value.transactionIndex || 1 // transaction before logs
        } else if (a.kind === 'transaction' && b.kind === 'log') {
            return a.value.transactionIndex - b.value.transactionIndex || -1
        } else {
            throw new Error('Unexpected case')
        }
    })

    return items
}

export function processItem(ctx: MappingContext<StoreWithCache>, item: Item) {
    getThenaActions(ctx, item)

    getRouterV2Actions(ctx, item)

    getRouterV3Actions(ctx, item)

    getSolidlyFactoryActions(ctx, item)

    getSolidlyPairActions(ctx, item)

    getAlgebraFactoryActions(ctx, item)

    getAlgebraPoolActions(ctx, item)

    getHypervisorActions(ctx, item)

    getVoterActions(ctx, item)

    getGaugeActions(ctx, item)

    getBribeActions(ctx, item)

    getVeTokenActions(ctx, item)

    getRebaseDistributorActions(ctx, item)

    getTradingCompetitionManagerActions(ctx, item)

    getThenianNftActions(ctx, item)

    getUsernameNftActions(ctx, item)
}
