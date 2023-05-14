import assert from 'assert'
import {DataHandlerContext} from '@subsquid/evm-processor'
import {Pool, PoolType, Token} from '../model'
import {DeferredValue} from '../utils/deferred'
import {StoreWithCache} from '../utils/store'
import {Action} from './base'

export interface BasePoolActionData {
    pool: DeferredValue<Pool, true>
}

export abstract class BasePoolAction<T extends BasePoolActionData = BasePoolActionData> extends Action<T> {}

export interface CreatePoolActionData extends BasePoolActionData {
    address: string
    token0: DeferredValue<Token, true>
    token1: DeferredValue<Token, true>
    stable?: boolean
    factory: string
    type: PoolType
}

export class CreatePoolAction extends BasePoolAction<CreatePoolActionData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        let pool = await this.data.pool.get()
        assert(pool == null, 'Pool already exists 0_o')

        const token0 = await this.data.token0.get()
        assert(token0 != null)
        const token1 = await this.data.token1.get()
        assert(token1 != null)

        pool = new Pool({
            id: this.data.address,
            token0,
            token1,
            factory: this.data.factory,
            liquidity: 0n,
            reserve0: 0n,
            reserve1: 0n,
            price0: 0n,
            price1: 0n,
            stable: this.data.stable,
            type: this.data.type,
        })

        await ctx.store.insert(pool)
        ctx.log.debug(`Created pool ${pool.id}`)
    }
}

export interface SetBalancesPoolActionData extends BasePoolActionData {
    value0: DeferredValue<bigint>
    value1: DeferredValue<bigint>
}

export class SetBalancesPoolAction extends BasePoolAction<SetBalancesPoolActionData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const pool = await this.data.pool.get()
        assert(pool != null, `Missing pool`)

        pool.reserve0 = await this.data.value0.get()
        pool.reserve1 = await this.data.value1.get()

        await ctx.store.upsert(pool)
        ctx.log.debug(`Balances of pool ${pool.id} updated to ${this.data.value0}, ${this.data.value1}`)
    }
}

export interface ChangeBalancesPoolActionData extends BasePoolActionData {
    value0: bigint
    value1: bigint
}

export class ChangeBalancesPoolAction extends BasePoolAction<ChangeBalancesPoolActionData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const pool = await this.data.pool.get()
        assert(pool != null, `Missing pool`)

        pool.reserve0 += this.data.value0
        pool.reserve1 += this.data.value1

        await ctx.store.upsert(pool)
        ctx.log.debug(
            `Balances of pool ${pool.id} updated to ${pool.reserve0} (${this.data.value0}), ${pool.reserve1} (${this.data.value1})`
        )
    }
}

export interface ChangeLiquidityPoolActionData extends BasePoolActionData {
    amount: bigint
}

export class ChangeLiquidityPoolAction extends BasePoolAction<ChangeLiquidityPoolActionData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const pool = await this.data.pool.get()
        assert(pool != null, `Missing pool`)

        pool.liquidity += this.data.amount

        await ctx.store.upsert(pool)
        ctx.log.debug(`Liquidity of pool ${pool.id} changed by ${this.data.amount}`)
    }
}

export interface SetLiquidityPoolActionData extends BasePoolActionData {
    value: DeferredValue<bigint>
}

export class SetLiquidityPoolAction extends BasePoolAction<SetLiquidityPoolActionData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const pool = await this.data.pool.get()
        assert(pool != null, `Missing pool`)

        pool.liquidity = await this.data.value.get()

        await ctx.store.upsert(pool)
        ctx.log.debug(`Liquidity of pool ${pool.id} set to ${pool.liquidity}`)
    }
}

export interface SetSqrtPricePoolActionData extends BasePoolActionData {
    value: bigint
}

export class SetSqrtPricePoolAction extends BasePoolAction<SetSqrtPricePoolActionData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const pool = await this.data.pool.get()
        assert(pool != null, `Missing pool`)

        pool.sqrtPriceX96 = this.data.value

        await ctx.store.upsert(pool)
    }
}

export class RecalculatePricesPoolAction extends BasePoolAction {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const pool = await this.data.pool.get()
        assert(pool != null, `Missing pool`)

        const token0 = pool.token0
        assert(token0 != null)
        const token1 = pool.token1
        assert(token1 != null)

        switch (pool.type) {
            case PoolType.Solidly:
            case PoolType.Hypervisor:
                pool.price0 = _getPrice(pool, token0, token1)
                pool.price1 = _getPrice(pool, token1, token0)
                break
            case PoolType.Algebra:
                const {price0, price1} = sqrtPriceX96ToTokenPrices(pool, token0, token1)
                pool.price0 = price0
                pool.price1 = price1
                break
        }

        await ctx.store.upsert(pool)
        ctx.log.debug(`Prices of pool ${pool.id} updated to ${pool.price0}, ${pool.price1}`)
    }
}

export type PoolAction =
    | CreatePoolAction
    | SetBalancesPoolAction
    | ChangeBalancesPoolAction
    | SetLiquidityPoolAction
    | ChangeLiquidityPoolAction
    | SetSqrtPricePoolAction
    | RecalculatePricesPoolAction

export function sqrtPriceX96ToTokenPrices(pool: Pool, token0: Token, token1: Token) {
    assert(pool.sqrtPriceX96 != null)
    let priceX96 = pool.sqrtPriceX96 ** 2n
    let price0 = priceX96 / Q192

    let price1 = price0 * 10n ** BigInt(token1.decimals - token0.decimals)
    return {price0, price1}
}

function _getPrice(pool: Pool, tokenIn: Token, tokenOut: Token) {
    let amountIn = 10n ** BigInt(tokenIn.decimals)
    if (pool.stable) {
        let decimals0 = 10n ** BigInt(tokenIn.id == pool.token0.id ? tokenIn.decimals : tokenOut.decimals)
        let decimals1 = 10n ** BigInt(tokenOut.id == pool.token1.id ? tokenOut.decimals : tokenIn.decimals)
        let xy = _k(pool.reserve0, pool.reserve1, pool.stable, decimals0, decimals1)
        let _reserve0 = (pool.reserve0 * _1E18) / decimals0
        let _reserve1 = (pool.reserve1 * _1E18) / decimals1
        let [reserveA, reserveB] = tokenIn.id == pool.token0.id ? [_reserve0, _reserve1] : [_reserve1, _reserve0]
        amountIn = tokenIn.id == pool.token0.id ? (amountIn * _1E18) / decimals0 : (amountIn * _1E18) / decimals1
        let y = reserveB - _get_y(amountIn + reserveA, xy, reserveB)
        y = y < 0n ? 0n : y
        return (y * (tokenIn.id == pool.token0.id ? decimals1 : decimals0)) / _1E18
    } else {
        let [reserveA, reserveB] =
            tokenIn.id == pool.token0.id ? [pool.reserve0, pool.reserve1] : [pool.reserve1, pool.reserve0]
        return (amountIn * reserveB) / (reserveA + amountIn)
    }
}

function _k(x: bigint, y: bigint, stable: boolean, decimals0: bigint, decimals1: bigint) {
    if (stable) {
        let _x = (x * _1E18) / decimals0
        let _y = (y * _1E18) / decimals1
        let _a = (_x * _y) / _1E18
        let _b = (_x * _x) / _1E18 + (_y * _y) / _1E18
        return (_a * _b) / _1E18 // x3y+y3x >= k
    } else {
        return x * y // xy >= k
    }
}

function _get_y(x0: bigint, xy: bigint, y: bigint) {
    for (let i = 0; i < 255; i++) {
        let y_prev = y
        let k = _f(x0, y)
        if (k < xy) {
            let dy = ((xy - k) * _1E18) / _d(x0, y)
            y = y + dy
        } else {
            let dy = ((k - xy) * _1E18) / _d(x0, y)
            y = y - dy
            y = y < 0n ? 0n : y
        }
        if (y > y_prev) {
            if (y - y_prev <= 1n) {
                return y
            }
        } else {
            if (y_prev - y <= 1n) {
                return y
            }
        }
    }
    return y
}

function _f(x0: bigint, y: bigint) {
    return (x0 * ((((y * y) / _1E18) * y) / _1E18)) / _1E18 + (((((x0 * x0) / _1E18) * x0) / _1E18) * y) / _1E18
}

function _d(x0: bigint, y: bigint) {
    return (3n * x0 * ((y * y) / _1E18)) / _1E18 + (((x0 * x0) / _1E18) * x0) / _1E18
}

const _1E18 = 10n ** 18n
const Q192 = 2n ** 192n
