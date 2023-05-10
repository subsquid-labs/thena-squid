import assert from 'assert'
import {
    ChangeBalancesPoolAction,
    ChangeLiquidityPoolAction,
    CreatePoolAction,
    PoolAction,
    PoolActionType,
    RecalculatePricesPoolAction,
    SetBalancesPoolAction,
    SetLiquidityPoolAction,
    SetSqrtPricePoolAction,
} from '../types/action'
import {Pool, PoolType, Token} from '../model'
import {CommonContext, Storage} from '../types/util'
import {Store} from '@subsquid/typeorm-store'

export async function processPoolAction(ctx: CommonContext<Store>, action: PoolAction) {
    switch (action.type) {
        case PoolActionType.Creation:
            await processPoolCreation(ctx, action)
            break
        case PoolActionType.ChangeLiquidity:
            await processLiquidity(ctx, action)
            break
        case PoolActionType.SetBalances:
            await processBalances(ctx, action)
            break
        case PoolActionType.SetSqrtPrice:
            await processSetSqrtPrice(ctx, action)
            break
        case PoolActionType.SetLiquidity:
            await processSetLiquidity(ctx, action)
            break
        case PoolActionType.ChangeBalances:
            await processChangeBalances(ctx, action)
            break
        case PoolActionType.RecalculatePrices:
            await processRecalculatePrices(ctx, action)
            break
    }
}

async function processPoolCreation(ctx: CommonContext<Store>, action: CreatePoolAction) {
    const pool = new Pool({
        id: action.data.id,
        token0Id: await action.data.token0.get(ctx),
        token1Id: await action.data.token1.get(ctx),
        factory: action.data.factory,
        liquidity: 0n,
        reserve0: 0n,
        reserve1: 0n,
        price0: 0n,
        price1: 0n,
        stable: action.data.stable,
        type: action.data.type,
    })

    await ctx.store.insert(pool)
    ctx.log.debug(`Created pool ${pool.id}`)
}

async function processLiquidity(ctx: CommonContext<Store>, action: ChangeLiquidityPoolAction) {
    const pool = await ctx.store.get(Pool, action.data.id)
    assert(pool != null, `Missing pool ${action.data.id}`)

    pool.liquidity += action.data.amount

    await ctx.store.upsert(pool)
    ctx.log.debug(`Liquidity of pool ${pool.id} changed by ${action.data.amount}`)
}

async function processSetLiquidity(ctx: CommonContext<Store>, action: SetLiquidityPoolAction) {
    const pool = await ctx.store.get(Pool, action.data.id)
    assert(pool != null, `Missing pool ${action.data.id}`)

    pool.liquidity = await action.data.value.get(ctx)

    await ctx.store.upsert(pool)
    ctx.log.debug(`Liquidity of pool ${pool.id} set to ${pool.liquidity}`)
}

async function processBalances(ctx: CommonContext<Store>, action: SetBalancesPoolAction) {
    const pool = await ctx.store.get(Pool, action.data.id)
    assert(pool != null, `Missing pool ${action.data.id}`)

    pool.reserve0 = await action.data.value0.get(ctx)
    pool.reserve1 = await action.data.value1.get(ctx)

    await ctx.store.upsert(pool)
    ctx.log.debug(`Balances of pool ${pool.id} updated to ${action.data.value0}, ${action.data.value1}`)
}

async function processRecalculatePrices(ctx: CommonContext<Store>, action: RecalculatePricesPoolAction) {
    const pool = await ctx.store.get(Pool, action.data.id)
    assert(pool != null, `Missing pool ${action.data.id}`)

    const token0 = await ctx.store.get(Token, pool.token0Id)
    assert(token0 != null)
    const token1 = await ctx.store.get(Token, pool.token1Id)
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

async function processChangeBalances(ctx: CommonContext<Store>, action: ChangeBalancesPoolAction) {
    const pool = await ctx.store.get(Pool, action.data.id)
    assert(pool != null, `Missing pool ${action.data.id}`)

    pool.reserve0 += action.data.value0
    pool.reserve1 += action.data.value1

    await ctx.store.upsert(pool)
    ctx.log.debug(
        `Balances of pool ${pool.id} updated to ${pool.reserve0} (${action.data.value0}), ${pool.reserve1} (${action.data.value1})`
    )
}

async function processSetSqrtPrice(ctx: CommonContext<Store>, action: SetSqrtPricePoolAction) {
    const pool = await ctx.store.get(Pool, action.data.id)
    assert(pool != null, `Missing pool ${action.data.id}`)

    pool.sqrtPriceX96 = action.data.value

    await ctx.store.upsert(pool)
}

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
        let decimals0 = 10n ** BigInt(tokenIn.id == pool.token0Id ? tokenIn.decimals : tokenOut.decimals)
        let decimals1 = 10n ** BigInt(tokenOut.id == pool.token1Id ? tokenOut.decimals : tokenIn.decimals)
        let xy = _k(pool.reserve0, pool.reserve1, pool.stable, decimals0, decimals1)
        let _reserve0 = (pool.reserve0 * _1E18) / decimals0
        let _reserve1 = (pool.reserve1 * _1E18) / decimals1
        let [reserveA, reserveB] = tokenIn.id == pool.token0Id ? [_reserve0, _reserve1] : [_reserve1, _reserve0]
        amountIn = tokenIn.id == pool.token0Id ? (amountIn * _1E18) / decimals0 : (amountIn * _1E18) / decimals1
        let y = reserveB - _get_y(amountIn + reserveA, xy, reserveB)
        y = y < 0n ? 0n : y
        return (y * (tokenIn.id == pool.token0Id ? decimals1 : decimals0)) / _1E18
    } else {
        let [reserveA, reserveB] =
            tokenIn.id == pool.token0Id ? [pool.reserve0, pool.reserve1] : [pool.reserve1, pool.reserve0]
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
