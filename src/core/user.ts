import assert from 'assert'
import {User, Pool, Trade, Token} from '../model'
import {last} from '../utils/misc'
import {UserAction, UserActionType, BalanceUserAction, SwapUserAction} from '../types/action'
import {CommonContext, Storage} from '../types/util'
import {createTradeId} from '../utils/ids'
import {BNB_DECIMALS, USD_ADDRESS} from '../config'
import {BigDecimal} from '@subsquid/big-decimal'
import {Store} from '@subsquid/typeorm-store'

export async function processUserAction(ctx: CommonContext<Store>, action: UserAction) {
    switch (action.type) {
        case UserActionType.Balance: {
            await processBalanceAction(ctx, action)
            break
        }
        case UserActionType.Swap: {
            await processSwapAction(ctx, action)
            break
        }
        default: {
            await getOrCreateUser(ctx, action)
            break
        }
    }
}

async function processBalanceAction(ctx: CommonContext<Store>, action: BalanceUserAction) {
    const user = await getOrCreateUser(ctx, action)

    user.balance += action.data.amount

    ctx.store.upsert(user)
    ctx.log.debug(`Balance of user ${user.id} updated to ${user.balance} (${action.data.amount})`)

    // assert(user.balance >= 0)
}

async function processSwapAction(ctx: CommonContext<Store>, action: SwapUserAction) {
    const pool = await ctx.store.get(Pool, action.data.poolId)
    if (pool == null) return // not our factory pool

    const user = await getOrCreateUser(ctx, action)

    const txTrades = await ctx.store.find(Trade, {where: {txHash: action.transaction.hash}})

    const {tokenInId, tokenOutId, amountIn, amountOut} = convertTokenValues({
        token0Id: pool.token0Id,
        amount0: action.data.amount0,
        token1Id: pool.token1Id,
        amount1: action.data.amount1,
    })

    const tokenIn = await ctx.store.get(Token, tokenInId)
    assert(tokenIn != null)
    const tokenOut = await ctx.store.get(Token, tokenOutId)
    assert(tokenOut != null)
    const usdToken = await ctx.store.get(Token, USD_ADDRESS)
    // assert(usdToken != null)

    const usdBnbPrice = BigDecimal(usdToken ? usdToken.bnbPrice : 0n, BNB_DECIMALS)
    const amountInUSD = usdBnbPrice.gt(0)
        ? BigDecimal(tokenIn.bnbPrice, BNB_DECIMALS)
              .div(usdBnbPrice)
              .mul(BigDecimal(amountIn, tokenIn.decimals))
              .toNumber()
        : 0
    const amountOutUSD = usdBnbPrice.gt(0)
        ? BigDecimal(tokenOut.bnbPrice, BNB_DECIMALS)
              .div(usdBnbPrice)
              .mul(BigDecimal(amountOut, tokenOut.decimals))
              .toNumber()
        : 0

    let trade = txTrades.length > 0 ? last(txTrades) : undefined
    if (trade == null || trade.tokenOut !== tokenIn || trade.amountOut !== amountIn) {
        trade = new Trade({
            id: createTradeId(action.transaction.id, txTrades.length),
            blockNumber: action.block.height,
            timestamp: new Date(action.block.timestamp),
            txHash: action.transaction.hash,
            user,
            tokenInId,
            amountIn,
            amountInUSD,
            tokenOutId,
            amountOut,
            amountOutUSD,
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

function convertTokenValues(data: {token0Id: string; amount0: bigint; token1Id: string; amount1: bigint}) {
    const {token0Id, amount0, token1Id, amount1} = data

    if (amount0 > 0 && amount1 < 0) {
        return {
            tokenInId: token0Id,
            amountIn: amount0,
            tokenOutId: token1Id,
            amountOut: -amount1,
        }
    } else if (amount0 < 0 && amount1 > 0) {
        return {
            tokenInId: token1Id,
            amountIn: amount1,
            tokenOutId: token0Id,
            amountOut: -amount0,
        }
    } else {
        throw new Error(`Unexpected case: amount0: ${amount0}, amount1: ${amount1}`)
    }
}

async function createUser(ctx: CommonContext<Store>, action: UserAction) {
    const user = new User({
        id: action.data.id,
        firstInteractAt: new Date(action.block.timestamp),
        balance: 0n,
    })

    await ctx.store.insert(user)
    ctx.log.debug(`User ${user.id} created`)

    return user
}

async function getOrCreateUser(ctx: CommonContext<Store>, action: UserAction) {
    let user = await ctx.store.get(User, action.data.id)
    if (user == null) {
        user = await createUser(ctx, action)
    }

    return user
}
