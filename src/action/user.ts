import {StoreWithCache} from '@belopash/typeorm-store'
import {BigDecimal} from '@subsquid/big-decimal'
import {DataHandlerContext} from '@subsquid/evm-processor'
import assert from 'assert'
import {BNB_DECIMALS, WHITELIST_TOKENS, ZERO_ADDRESS} from '../config'
import {Pool, Token, Trade, User} from '../model'
import {CheckerDeferredValue, ContractChecker} from '../utils/contractChecker'
import {createTradeId} from '../utils/ids'
import {Action, ActionConfig} from './base'

export interface CreateUserActionData {
    userId: string
    address: string
}

export class CreateUserAction extends Action<CreateUserActionData> {
    private isContract!: CheckerDeferredValue

    constructor(config: ActionConfig, data: CreateUserActionData) {
        super(config, data)

        const checker = ContractChecker.get(config)
        this.isContract = checker.defer(this.data.address)
    }

    async perform() {
        const isContract = this.data.address === ZERO_ADDRESS ? true : await this.isContract.get()

        let user = new User({
            id: this.data.userId,
            firstInteractAt: new Date(this.block.timestamp),
            balance: 0n,
            isContract,
        })

        await this.store.insert(user)
        this.log.debug(`User ${user.id} created`)
    }
}

export interface BalanceUserActionData {
    userId: string
    amount: bigint
}

export class BalanceUserAction extends Action<BalanceUserActionData> {
    async perform(): Promise<void> {
        const user = await this.store.getOrFail(User, this.data.userId)

        user.balance += this.data.amount
        // assert(user.balance >= 0)

        this.store.upsert(user)
        this.log.debug(`Balance of user ${user.id} updated to ${user.balance} (${this.data.amount})`)
    }
}

export interface SwapUserActionData {
    userId: string
    amount0: bigint
    amount1: bigint
    poolId: string
    usdTokenId: string
}

export class SwapAction extends Action<SwapUserActionData> {
    static lastTrade:
        | {
              id: string
              txHash: string
              blockNumber: number
              index: number
          }
        | undefined

    async perform(): Promise<void> {
        assert(this.transaction != null)

        const pool = await this.store.getOrFail(Pool, {id: this.data.poolId, relations: {token0: true, token1: true}})
        const user = await this.store.getOrFail(User, this.data.userId)

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
        const usdToken = await this.store.get(Token, this.data.usdTokenId)
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
            SwapAction.lastTrade != null &&
            SwapAction.lastTrade.blockNumber === this.block.height &&
            SwapAction.lastTrade.txHash === this.transaction.hash
        ) {
            trade = await this.store.getOrFail(Trade, {id: SwapAction.lastTrade.id, relations: {tokenOut: true}})
        } else {
            SwapAction.lastTrade = undefined
        }

        if (trade == null || trade.tokenOut.id !== tokenIn.id || trade.amountOut !== amountIn) {
            const index = SwapAction.lastTrade != null ? SwapAction.lastTrade.index + 1 : 0
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
            await this.store.insert(trade)
            SwapAction.lastTrade = {...trade, index}
        } else {
            trade.amountOut = amountOut
            trade.tokenOut = tokenOut
            trade.user = user
            trade.routes.push(pool.id)
            await this.store.upsert(trade)
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
