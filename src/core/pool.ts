import assert from 'assert'
import {CreatePoolAction, LiquidityUpdatePoolAction, PoolAction, PoolActionType, SyncPoolAction} from '../mapping'
import {Pool, Token, Trade, User} from '../model'
import {CommonContext, Storage} from '../types/util'

export function processPoolAction(ctx: CommonContext<Storage<{pools: Pool; tokens: Token}>>, action: PoolAction) {
    switch (action.type) {
        case PoolActionType.Creation:
            processPoolCreation(ctx, action)
            break
        case PoolActionType.LiquidityUpdate:
            processLiquidity(ctx, action)
            break
        case PoolActionType.Sync:
            processBalances(ctx, action)
            break
    }
}

function processPoolCreation(ctx: CommonContext<Storage<{pools: Pool}>>, action: CreatePoolAction) {
    assert(!ctx.store.pools.has(action.data.id), `Pool ${action.data.id} already exists 0_o`)

    const pool = new Pool({
        id: action.data.id,
        token0: action.data.token0,
        token1: action.data.token1,
        factory: action.data.factory,
        liquidity: 0n,
        reserve0: 0n,
        reserve1: 0n,
        price0: 0n,
        price1: 0n,
        stable: action.data.stable,
    })
    ctx.store.pools.set(pool.id, pool)

    ctx.log.debug(`Created pool ${pool.id}`)
}

function processLiquidity(ctx: CommonContext<Storage<{pools: Pool}>>, action: LiquidityUpdatePoolAction) {
    const pool = ctx.store.pools.get(action.data.id)
    assert(pool != null, `Missing pool ${action.data.id}`)

    pool.liquidity += action.data.amount

    ctx.log.debug(`Liquidity of pool ${pool.id} changed by ${action.data.amount}`)
}

function processBalances(ctx: CommonContext<Storage<{pools: Pool; tokens: Token}>>, action: SyncPoolAction) {
    const pool = ctx.store.pools.get(action.data.id)
    assert(pool != null, `Missing pool ${action.data.id}`)

    pool.reserve0 = action.data.amount0
    pool.reserve1 = action.data.amount1

    const token0 = ctx.store.tokens.get(pool.token0)
    assert(token0 != null)
    const token1 = ctx.store.tokens.get(pool.token1)
    assert(token1 != null)

    pool.price0 = _getPrice(pool, token0, token1)
    pool.price1 = _getPrice(pool, token1, token0)

    ctx.log.debug(`Balances of pool ${pool.id} updated to ${action.data.amount0}, ${action.data.amount1}`)
}

function _getPrice(pool: Pool, tokenIn: Token, tokenOut: Token) {
    let amountIn = 10n ** BigInt(tokenIn.decimals)
    if (pool.stable) {
        let decimals0 = 10n ** BigInt(tokenIn.id == pool.token0 ? tokenIn.decimals : tokenOut.decimals)
        let decimals1 = 10n ** BigInt(tokenOut.id == pool.token1 ? tokenOut.decimals : tokenIn.decimals)
        let xy = _k(pool.reserve0, pool.reserve1, pool.stable, decimals0, decimals1)
        let _reserve0 = (pool.reserve0 * _1E18) / decimals0
        let _reserve1 = (pool.reserve1 * _1E18) / decimals1
        let [reserveA, reserveB] = tokenIn.id == pool.token0 ? [_reserve0, _reserve1] : [_reserve1, _reserve0]
        amountIn = tokenIn.id == pool.token0 ? (amountIn * _1E18) / decimals0 : (amountIn * _1E18) / decimals1
        let y = reserveB - _get_y(amountIn + reserveA, xy, reserveB)
        y = y < 0n ? 0n : y
        return (y * (tokenIn.id == pool.token0 ? decimals1 : decimals0)) / _1E18
    } else {
        let [reserveA, reserveB] =
            tokenIn.id == pool.token0 ? [pool.reserve0, pool.reserve1] : [pool.reserve1, pool.reserve0]
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
