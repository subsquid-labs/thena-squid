import {In} from 'typeorm'
import {BatchHandlerContext} from '@subsquid/evm-processor'
import {Store, TypeormDatabase} from '@subsquid/typeorm-store'
import {Pool, Trade, User} from './model'
import {processor} from './processor'
import {getTimestamp, last, toEntityMap} from './utils/misc'
import {ALGEBRA_FACTORY} from './config'
import assert from 'assert'
import {
    getActions,
    Action,
    ActionKind,
    UserActionDataType,
    UserAction,
    SwapUserActionData,
    PoolAction,
    BalanceUserActionData,
    PoolActionDataType,
    CreationPoolActionData,
    BalanceUserAction,
    SwapUserAction,
    CreationPoolAction,
} from './action'

processor.run(new TypeormDatabase(), async (ctx) => {
    const actions = await getActions(ctx)
    await processActions(ctx, actions)
})

type CommonContext<Store> = Omit<BatchHandlerContext<Store, unknown>, 'blocks'>

async function processActions(ctx: CommonContext<Store>, actions: Action[]) {
    const userIds = getUserIds(actions)
    const users = await ctx.store.findBy(User, {id: In(userIds)}).then(toEntityMap)

    const poolIds = getPoolIds(actions)
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

    for (const action of actions) {
        switch (action.kind) {
            case ActionKind.Pool:
                processPoolAction(procCtx, action)
                break
            case ActionKind.User:
                processUserAction(procCtx, action)
                break
        }
    }

    await ctx.store.upsert([...users.values()])
    await ctx.store.upsert([...pools.values()])
    await ctx.store.insert([...trades.values()].flat())
}

function getUserIds(actions: Action[]) {
    return [...new Set(actions.filter((i): i is UserAction => i.kind === ActionKind.User).map((i) => i.data.id))]
}

function getPoolIds(actions: Action[]) {
    return [...new Set(actions.filter((i): i is PoolAction => i.kind === ActionKind.Pool).map((i) => i.data.id))]
}

type Storage<T extends Record<string, any>> = {
    [k in keyof T]: Map<string, T[k]>
}

function processPoolAction(
    ctx: CommonContext<Storage<{users: User; pools: Pool; trades: Trade[]}>>,
    action: PoolAction
) {
    switch (action.data.type) {
        case PoolActionDataType.Creation: {
            processPoolCreation(ctx, action as CreationPoolAction)
            break
        }
    }
}

function processPoolCreation(ctx: CommonContext<Storage<{pools: Pool}>>, action: CreationPoolAction) {
    const pool = new Pool({
        id: action.data.id,
        token0: action.data.token0,
        token1: action.data.token1,
        factory: ALGEBRA_FACTORY,
    })
    ctx.store.pools.set(pool.id, pool)
}

function processUserAction(
    ctx: CommonContext<Storage<{users: User; pools: Pool; trades: Trade[]}>>,
    action: UserAction
) {
    switch (action.data.type) {
        case UserActionDataType.Balance: {
            processBalanceAction(ctx, action as BalanceUserAction)
            break
        }
        case UserActionDataType.Swap: {
            processSwapAction(ctx, action as SwapUserAction)
            break
        }
    }
}

function processBalanceAction(ctx: CommonContext<Storage<{users: User}>>, action: BalanceUserAction) {
    let user = ctx.store.users.get(action.data.id)
    if (user == null) {
        user = new User({
            id: action.data.id,
            firstInteractAt: getTimestamp(action.block),
            balance: 0n,
        })
        ctx.store.users.set(user.id, user)
    }

    user.balance += action.data.amount
    assert(user.balance >= 0)
}

function processSwapAction(
    ctx: CommonContext<Storage<{users: User; pools: Pool; trades: Trade[]}>>,
    action: SwapUserAction
) {
    const pool = ctx.store.pools.get(action.data.pool)
    if (pool == null) return // not our factory pool

    let user = ctx.store.users.get(action.data.id)
    if (user == null) {
        user = new User({
            id: action.data.id,
            firstInteractAt: getTimestamp(action.block),
            balance: 0n,
        })
        ctx.store.users.set(user.id, user)
    }

    let txTrades = ctx.store.trades.get(action.transaction.id)
    if (txTrades == null) {
        txTrades = []
        ctx.store.trades.set(action.transaction.id, txTrades)
    }

    const {tokenIn, tokenOut, amountIn, amountOut} = convertTokenValues({
        token0: pool.token0,
        token1: pool.token1,
        amount0: action.data.amount0,
        amount1: action.data.amount1,
    })

    let trade = txTrades.length > 0 ? last(txTrades) : undefined
    if (trade == null || trade.tokenOut !== tokenIn || trade.amountOut !== amountIn) {
        trade = new Trade({
            id: createTradeId(action.transaction.id, txTrades.length),
            blockNumber: action.block.height,
            timestamp: new Date(action.block.timestamp),
            txHash: action.transaction.hash,
            user,
            tokenIn,
            amountIn,
            tokenOut,
            amountOut,
            routes: [action.data.pool],
        })
        txTrades.push(trade)
    } else {
        trade.amountOut = amountOut
        trade.tokenOut = tokenOut
        trade.user = user
        trade.routes.push(action.data.pool)
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
