import {In} from 'typeorm'
import {BatchHandlerContext} from '@subsquid/evm-processor'
import {Store, TypeormDatabase} from '@subsquid/typeorm-store'
import {BalanceInteraction, Interaction, InteractionType, SwapInteraction, getInteractions} from './interaction'
import {Pool, Trade, User} from './model'
import {processor} from './processor'
import {getTimestamp, last, toEntityMap} from './utils/misc'
import {getPoolCreations} from './factory'
import {PoolCreation} from './factory/types'
import {ALGEBRA_FACTORY} from './config'
import assert from 'assert'

processor.run(new TypeormDatabase(), async (ctx) => {
    const poolCreations = await getPoolCreations(ctx)
    await processPoolCreations(ctx, poolCreations)

    const interactions = await getInteractions(ctx)
    await processInteractions(ctx, interactions)
})

async function processPoolCreations(ctx: BatchHandlerContext<Store, unknown>, creations: PoolCreation[]) {
    const pools: Pool[] = []

    for (const creation of creations) {
        const pool = new Pool({
            id: creation.id,
            token0: creation.token0,
            token1: creation.token1,
            factory: ALGEBRA_FACTORY,
        })
        pools.push(pool)
    }

    await ctx.store.insert(pools)
}

type CommonContext<Store> = Omit<BatchHandlerContext<Store, unknown>, 'blocks'>

async function processInteractions(ctx: CommonContext<Store>, interactions: Interaction[]) {
    const userIds = [...new Set(interactions.map((i) => i.id))]
    const users = await ctx.store.findBy(User, {id: In(userIds)}).then(toEntityMap)

    const poolIds = [
        ...new Set(
            interactions.filter((i): i is SwapInteraction => i.type === InteractionType.Swap).map((i) => i.pool)
        ),
    ]
    const pools = await ctx.store.findBy(Pool, {id: In(poolIds)}).then(toEntityMap)

    const trades = new Map<string, Trade[]>()

    const procCtx = {
        ...ctx,
        store: {
            users,
            pools,
            trades,
        },
    }

    for (const interaction of interactions) {
        switch (interaction.type) {
            case InteractionType.Balance: {
                // processBalanceInteraction(procCtx, interaction)
                break
            }
            case InteractionType.Swap: {
                processSwapInteraction(procCtx, interaction)
                break
            }
        }
    }

    await ctx.store.upsert([...users.values()])
    await ctx.store.upsert([...pools.values()])
    await ctx.store.insert([...trades.values()].flat())
}

type Storage<T extends Record<string, any>> = {
    [k in keyof T]: Map<string, T[k]>
}

function processBalanceInteraction(ctx: CommonContext<Storage<{users: User}>>, interaction: BalanceInteraction) {
    let user = ctx.store.users.get(interaction.id)
    if (user == null) {
        user = new User({
            id: interaction.id,
            firstInteractAt: getTimestamp(interaction.block),
            balance: 0n,
        })
        ctx.store.users.set(user.id, user)
    }

    user.balance += interaction.amount
    assert(user.balance >= 0)
}

function processSwapInteraction(
    ctx: CommonContext<Storage<{users: User; pools: Pool; trades: Trade[]}>>,
    interaction: SwapInteraction
) {
    const pool = ctx.store.pools.get(interaction.pool)
    if (pool == null) return // not our factory pool

    let user = ctx.store.users.get(interaction.id)
    if (user == null) {
        user = new User({
            id: interaction.id,
            firstInteractAt: getTimestamp(interaction.block),
            balance: 0n,
        })
        ctx.store.users.set(user.id, user)
    }

    let txTrades = ctx.store.trades.get(interaction.transaction.id)
    if (txTrades == null) {
        txTrades = []
        ctx.store.trades.set(interaction.transaction.id, txTrades)
    }

    const {tokenIn, tokenOut, amountIn, amountOut} = convertTokenValues({
        token0: pool.token0,
        token1: pool.token1,
        amount0: interaction.amount0,
        amount1: interaction.amount1,
    })

    let trade = txTrades.length > 0 ? last(txTrades) : undefined
    if (trade == null || trade.tokenOut !== tokenIn || trade.amountOut !== amountIn) {
        trade = new Trade({
            id: createTradeId(interaction.transaction.id, txTrades.length),
            blockNumber: interaction.block.height,
            timestamp: new Date(interaction.block.timestamp),
            txHash: interaction.transaction.hash,
            user,
            tokenIn,
            amountIn,
            tokenOut,
            amountOut,
            routes: [interaction.pool],
        })
        txTrades.push(trade)
    } else {
        trade.amountOut = amountOut
        trade.tokenOut = tokenOut
        trade.user = user
        trade.routes.push(interaction.pool)
    }
}

function createTradeId(txId: string, index: number) {
    return `${txId}-${index.toString().padStart(5, '0')}`
}

function convertTokenValues(data: {token0: string; amount0: bigint; token1: string; amount1: bigint}) {
    const {token0, amount0, token1, amount1} = data

    if (amount0 > 0 && amount1 < 0) {
        return {
            tokenIn: token1,
            amountIn: -amount1,
            tokenOut: token0,
            amountOut: amount0,
        }
    } else if (amount0 < 0 && amount1 > 0) {
        return {
            tokenIn: token0,
            amountIn: -amount0,
            tokenOut: token1,
            amountOut: amount1,
        }
    } else {
        throw new Error(`Unexpected case: amount0: ${amount0}, amount1: ${amount1}`)
    }
}
