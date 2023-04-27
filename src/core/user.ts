import assert from 'assert'
import {User, Pool, Trade} from '../model'
import {last} from '../utils/misc'
import {UserAction, UserActionType, BalanceUserAction, SwapUserAction} from '../types/action'
import {CommonContext, Storage} from '../types'
import {createTradeId} from '../utils/ids'

export function processUserAction(
    ctx: CommonContext<Storage<{users: User; pools: Pool; trades: Trade[]}>>,
    action: UserAction
) {
    switch (action.type) {
        case UserActionType.Balance: {
            processBalanceAction(ctx, action)
            break
        }
        case UserActionType.Swap: {
            processSwapAction(ctx, action)
            break
        }
        default: {
            getOrCreateUser(ctx, action)
            break
        }
    }
}

function processBalanceAction(ctx: CommonContext<Storage<{users: User}>>, action: BalanceUserAction) {
    const user = getOrCreateUser(ctx, action)

    user.balance += action.data.amount
    ctx.log.debug(`Balance of user ${user.id} updated to ${user.balance} (${action.data.amount})`)

    // assert(user.balance >= 0)
}

function processSwapAction(
    ctx: CommonContext<Storage<{users: User; pools: Pool; trades: Trade[]}>>,
    action: SwapUserAction
) {
    const pool = ctx.store.pools.get(action.data.poolId)
    if (pool == null) return // not our factory pool

    const user = getOrCreateUser(ctx, action)

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
            routes: [action.data.poolId],
        })
        txTrades.push(trade)
    } else {
        trade.amountOut = amountOut
        trade.tokenOut = tokenOut
        trade.user = user
        trade.routes.push(action.data.poolId)
    }
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

function createUser(ctx: CommonContext<Storage<{users: User}>>, action: UserAction) {
    const user = new User({
        id: action.data.id,
        firstInteractAt: new Date(action.block.timestamp),
        balance: 0n,
    })
    ctx.store.users.set(user.id, user)

    ctx.log.debug(`User ${user.id} created`)

    return user
}

function getOrCreateUser(ctx: CommonContext<Storage<{users: User}>>, action: UserAction) {
    let user = ctx.store.users.get(action.data.id)
    if (user == null) {
        user = createUser(ctx, action)
    }

    return user
}
