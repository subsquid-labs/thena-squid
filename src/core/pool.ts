import assert from 'assert'
import {CreationPoolAction, LiquidityPoolAction, PoolAction, PoolActionDataType, SyncPoolAction} from '../action/types'
import {ALGEBRA_FACTORY} from '../config'
import {Pool, Trade, User} from '../model'
import {CommonContext, Storage} from './types'

export function processPoolAction(
    ctx: CommonContext<Storage<{users: User; pools: Pool; trades: Trade[]}>>,
    action: PoolAction
) {
    switch (action.data.type) {
        case PoolActionDataType.Creation:
            processPoolCreation(ctx, action as CreationPoolAction)
            break
        case PoolActionDataType.Liquidity:
            processLiquidity(ctx, action as LiquidityPoolAction)
            break
        case PoolActionDataType.Sync:
            processBalances(ctx, action as SyncPoolAction)
            break
    }
}

function processPoolCreation(ctx: CommonContext<Storage<{pools: Pool}>>, action: CreationPoolAction) {
    assert(!ctx.store.pools.has(action.data.id), `Pool ${action.data.id} already exists 0_o`)

    const pool = new Pool({
        id: action.data.id,
        token0: action.data.token0,
        token1: action.data.token1,
        factory: ALGEBRA_FACTORY,
        liquidity: 0n,
        reserved0: 0n,
        reserved1: 0n,
    })
    ctx.store.pools.set(pool.id, pool)

    ctx.log.info(`Created pool ${action.data.id}`)
}

function processLiquidity(ctx: CommonContext<Storage<{pools: Pool}>>, action: LiquidityPoolAction) {
    const pool = ctx.store.pools.get(action.data.id)
    if (pool == null) return // not our pool

    pool.liquidity += action.data.amount

    ctx.log.info(`Liquidity of pool ${pool.id} changed by ${action.data.amount}`)
}

function processBalances(ctx: CommonContext<Storage<{pools: Pool}>>, action: SyncPoolAction) {
    const pool = ctx.store.pools.get(action.data.id)
    if (pool == null) return // not our pool

    pool.reserved0 = action.data.amount0
    pool.reserved1 = action.data.amount1

    ctx.log.info(`Balances of pool ${pool.id} updated to ${action.data.amount0}, ${action.data.amount1}`)
}
