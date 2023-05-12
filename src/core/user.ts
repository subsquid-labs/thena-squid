import assert from 'assert'
import {User, Pool, Trade, Token} from '../model'
import {last} from '../utils/misc'
import {UserAction, UserActionType, BalanceUserAction, SwapUserAction, EnsureUserAction} from '../types/action'
import {createTradeId} from '../utils/ids'
import {BNB_DECIMALS, USD_ADDRESS} from '../config'
import {BigDecimal} from '@subsquid/big-decimal'
import {DataHandlerContext} from '@subsquid/evm-processor'
import {StoreWithCache} from '../utils/store'

export async function processUserAction(ctx: DataHandlerContext<StoreWithCache>, action: UserAction) {
    switch (action.type) {
        case UserActionType.Balance: {
            await processBalanceAction(ctx, action)
            break
        }
        case UserActionType.Swap: {
            await processSwapAction(ctx, action)
            break
        }
        case UserActionType.Ensure: {
            await processEnsureAction(ctx, action)
            break
        }
    }
}

async function processEnsureAction(ctx: DataHandlerContext<StoreWithCache>, action: EnsureUserAction) {
    let user = await action.data.user.get(ctx)
    if (user != null) return

    user = new User({
        id: action.data.address,
        firstInteractAt: new Date(action.block.timestamp),
        balance: 0n,
    })

    await ctx.store.insert(user)
    ctx.log.debug(`User ${user.id} created`)
}

async function processBalanceAction(ctx: DataHandlerContext<StoreWithCache>, action: BalanceUserAction) {
    const user = await action.data.user.get(ctx)
    assert(user != null)

    user.balance += action.data.amount

    ctx.store.upsert(user)
    ctx.log.debug(`Balance of user ${user.id} updated to ${user.balance} (${action.data.amount})`)

    // assert(user.balance >= 0)
}

async function processSwapAction(ctx: DataHandlerContext<StoreWithCache>, action: SwapUserAction) {
    const pool = await action.data.pool.get(ctx)
    assert(pool != null)

    const user = await action.data.user.get(ctx)
    assert(user != null)

    const txTrades = await ctx.store.find(Trade, {where: {txHash: action.transaction.hash}})
    const {tokenInId, tokenOutId, amountIn, amountOut} = convertTokenValues({
        token0Id: pool.token0.id,
        amount0: action.data.amount0,
        token1Id: pool.token1.id,
        amount1: action.data.amount1,
    })

    const [tokenIn, tokenOut] = tokenInId == pool.token0.id ? [pool.token0, pool.token1] : [pool.token1, pool.token0]
    assert(tokenIn != null)
    assert(tokenOut != null)
    const usdToken = await action.data.usdToken.get(ctx)
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
            routes: [pool.id],
        })
        await ctx.store.insert(trade)
    } else {
        trade.amountOut = amountOut
        trade.tokenOut = tokenOut
        trade.user = user
        trade.routes.push(pool.id)
        await ctx.store.upsert(trade)
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
