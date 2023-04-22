import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import {ProcessorItem} from '../processor'
import {PoolCreation} from './types'
import {getAlgebraPoolCreations, isAlgebraItem} from './algebra'
import {getSolidlyPairCreations, isSolidlyItem} from './solidly'

export async function getPoolCreations(ctx: BatchHandlerContext<unknown, ProcessorItem>): Promise<PoolCreation[]> {
    const creations: PoolCreation[] = []
    for (let {header: block, items} of ctx.blocks) {
        const result = await getBlockPoolCreations(ctx, block, items)
        creations.push(...result)
    }
    return creations
}

export async function getBlockPoolCreations(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    items: ProcessorItem[]
): Promise<PoolCreation[]> {
    let creations: PoolCreation[] = []

    for (let item of items) {
        const result = await getItemPoolCreations(ctx, block, item)
        creations.push(...result)
    }

    return creations
}

export async function getItemPoolCreations(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem
): Promise<PoolCreation[]> {
    if (isAlgebraItem(item)) {
        ctx.log.debug(`processing AlgebraFactory item...`)
        return await getAlgebraPoolCreations(ctx, block, item)
    } else if (isSolidlyItem(item)) {
        ctx.log.debug(`processing Solidly Factory item...`)
        return await getSolidlyPairCreations(ctx, block, item)
    } else {
        return []
    }
}
