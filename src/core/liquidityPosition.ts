import assert from 'assert'
import {User, Pool, LiquidityPosition, LiquidityPositionUpdate} from '../model'
import {createLiquidityPositionUpdateId} from '../utils/ids'
import {
    AdjustValueUpdateLiquidityPositionAction,
    EnsureLiquidityPositionAction,
    LiquidityPositionAction,
    LiquidityPositionActionType,
    ValueUpdateLiquidityPositionAction,
} from '../types/action'
import {last} from '../utils/misc'
import {DataHandlerContext} from '@subsquid/evm-processor'
import {StoreWithCache} from '../utils/store'

export async function processLiquidityPositionAction(ctx: DataHandlerContext<StoreWithCache>, action: LiquidityPositionAction) {
    switch (action.type) {
        case LiquidityPositionActionType.ValueUpdate:
            await processLiquidityPositionUpdate(ctx, action)
            break
        case LiquidityPositionActionType.AdjustValueUpdate:
            await processLiquidityPositionAdjustUpdate(ctx, action)
            break
        case LiquidityPositionActionType.Ensure:
            await processEnsureLiquidityPositionAction(ctx, action)
            break
    }
}

async function processEnsureLiquidityPositionAction(
    ctx: DataHandlerContext<StoreWithCache>,
    action: EnsureLiquidityPositionAction
) {
    let position = await action.data.position.get()
    if (position != null) return

    const user = await action.data.user.get()
    assert(user != null)
    const pool = await action.data.pool.get()
    assert(pool != null)

    position = new LiquidityPosition({
        id: action.data.id,
        user,
        pool,
        value: 0n,
    })

    await ctx.store.insert(position)
    ctx.log.debug(`LiquidityPosition ${position.id} created`)
}

async function processLiquidityPositionUpdate(
    ctx: DataHandlerContext<StoreWithCache>,
    action: ValueUpdateLiquidityPositionAction
) {
    const position = await action.data.position.get()
    assert(position != null, `Missing position`)

    const pool = position.pool
    assert(pool != null, `Missing pool`)

    position.value += action.data.amount

    await ctx.store.upsert(position)
    ctx.log.debug(`Value of LiquidityPostition ${position.id} updated to ${position.value} (${action.data.amount})`)

    // assert(position.value >= 0)

    let txPosotionUpdates = await ctx.store.find(LiquidityPositionUpdate, {where: {txHash: action.transaction.hash}})

    const amount0 =
        action.data.amount0 != null ? action.data.amount0 : (action.data.amount * pool.reserve0) / pool.liquidity
    const amount1 =
        action.data.amount1 != null ? action.data.amount1 : (action.data.amount * pool.reserve1) / pool.liquidity

    const positionUpdate = new LiquidityPositionUpdate({
        id: createLiquidityPositionUpdateId(action.transaction.id, txPosotionUpdates.length),
        blockNumber: action.block.height,
        timestamp: new Date(action.block.timestamp),
        txHash: action.transaction.hash,
        position,
        amount: action.data.amount,
        amount0,
        amount1,
    })

    await ctx.store.insert(positionUpdate)
}

async function processLiquidityPositionAdjustUpdate(
    ctx: DataHandlerContext<StoreWithCache>,
    action: AdjustValueUpdateLiquidityPositionAction
) {
    const txPositionUpdates = await ctx.store.find(LiquidityPositionUpdate, {where: {txHash: action.transaction.hash}})

    const positionUpdate = last(txPositionUpdates)
    positionUpdate.amount0 = action.data.amount0
    positionUpdate.amount1 = action.data.amount1

    await ctx.store.upsert(positionUpdate)
}
