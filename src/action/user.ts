import assert from 'assert'
import {BigDecimal} from '@subsquid/big-decimal'
import {DataHandlerContext} from '@subsquid/evm-processor'
import {BNB_DECIMALS, WHITELIST_TOKENS, ZERO_ADDRESS} from '../config'
import {Pool, Token, Trade, User} from '../model'
import {DeferredValue} from '../utils/deferred'
import {createTradeId} from '../utils/ids'
import {StoreWithCache} from '@belopash/squid-tools'
import {Action} from './base'

export interface BaseUserActionData {
    user: DeferredValue<User, true>
}

export abstract class BaseUserAction<T extends BaseUserActionData = BaseUserActionData> extends Action<T> {}

export interface EnsureUserActionData extends BaseUserActionData {
    address: string
    isContract: DeferredValue<boolean>
}

export class EnsureUserAction extends BaseUserAction<EnsureUserActionData> {
    async _perform(ctx: DataHandlerContext<StoreWithCache>) {
        let user = await this.data.user.get()
        if (user != null) return

        const isContract = this.data.address === ZERO_ADDRESS ? true : await this.data.isContract.get()

        user = new User({
            id: this.data.address,
            firstInteractAt: new Date(this.block.timestamp),
            balance: 0n,
            isContract,
        })

        await ctx.store.insert(user)
        ctx.log.debug(`User ${user.id} created`)
    }
}

export interface BalanceUserActionData extends BaseUserActionData {
    amount: bigint
}

export class BalanceUserAction extends BaseUserAction<BalanceUserActionData> {
    async _perform(ctx: DataHandlerContext<StoreWithCache>): Promise<void> {
        const user = await this.data.user.get()
        assert(user != null)

        user.balance += this.data.amount
        // assert(user.balance >= 0)

        ctx.store.upsert(user)
        ctx.log.debug(`Balance of user ${user.id} updated to ${user.balance} (${this.data.amount})`)
    }
}

export interface SwapUserActionData extends BaseUserActionData {
    amount0: bigint
    amount1: bigint
    pool: DeferredValue<Pool, true>
    usdToken: DeferredValue<Token, true>
}

export class SwapUserAction extends BaseUserAction<SwapUserActionData> {
    static lastTrade:
        | {
              id: string
              txHash: string
              blockNumber: number
              index: number
          }
        | undefined

    async _perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const pool = await this.data.pool.get()
        assert(pool != null)

        const user = await this.data.user.get()
        assert(user != null)

        const {tokenInId, tokenOutId, amountIn, amountOut} = convertTokenValues({
            token0Id: pool.token0.id,
            amount0: this.data.amount0,
            token1Id: pool.token1.id,
            amount1: this.data.amount1,
        })

        const [tokenIn, tokenOut] =
            tokenInId == pool.token0.id ? [pool.token0, pool.token1] : [pool.token1, pool.token0]
        assert(tokenIn != null)
        assert(tokenOut != null)
        const usdToken = await this.data.usdToken.get()
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

        let amountUSD: number
        if (WHITELIST_TOKENS.includes(tokenIn.id) && WHITELIST_TOKENS.includes(tokenOut.id)) {
            amountUSD = (amountInUSD + amountOutUSD) / 2
        } else if (!WHITELIST_TOKENS.includes(tokenIn.id) && WHITELIST_TOKENS.includes(tokenOut.id)) {
            amountUSD = amountOutUSD
        } else if (WHITELIST_TOKENS.includes(tokenIn.id) && !WHITELIST_TOKENS.includes(tokenOut.id)) {
            amountUSD = amountInUSD
        } else {
            amountUSD = 0
        }

        let trade: Trade | undefined
        if (
            SwapUserAction.lastTrade != null &&
            SwapUserAction.lastTrade.blockNumber === this.block.height &&
            SwapUserAction.lastTrade.txHash === this.transaction.hash
        ) {
            trade = await ctx.store.getOrFail(Trade, SwapUserAction.lastTrade.id)
        } else {
            SwapUserAction.lastTrade = undefined
        }

        if (trade == null || trade.tokenOut !== tokenIn || trade.amountOut !== amountIn) {
            const index = SwapUserAction.lastTrade != null ? SwapUserAction.lastTrade.index + 1 : 0
            trade = new Trade({
                id: createTradeId(this.transaction.id, index),
                blockNumber: this.block.height,
                timestamp: new Date(this.block.timestamp),
                txHash: this.transaction.hash,
                user,
                tokenIn,
                amountIn,
                amountInUSD,
                tokenOut,
                amountOut,
                amountOutUSD,
                amountUSD,
                routes: [pool.id],
            })
            await ctx.store.insert(trade)
            SwapUserAction.lastTrade = {...trade, index}
        } else {
            trade.amountOut = amountOut
            trade.tokenOut = tokenOut
            trade.user = user
            trade.routes.push(pool.id)
            await ctx.store.upsert(trade)
        }
    }
}

function convertTokenValues(data: {token0Id: string; amount0: bigint; token1Id: string; amount1: bigint}) {
    const {token0Id, amount0, token1Id, amount1} = data

    if (amount0 > 0 && amount1 <= 0) {
        return {
            tokenInId: token0Id,
            amountIn: amount0,
            tokenOutId: token1Id,
            amountOut: -amount1,
        }
    } else if (amount0 <= 0 && amount1 > 0) {
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

export type UserAction = BalanceUserAction | SwapUserAction | EnsureUserAction
