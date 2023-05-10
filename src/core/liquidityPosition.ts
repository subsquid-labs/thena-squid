import assert from 'assert'
import {User, Pool, LiquidityPosition, LiquidityPositionUpdate} from '../model'
import {CommonContext, Storage} from '../types/util'
import {createLiquidityPositionUpdateId} from '../utils/ids'
import {
    AdjustValueUpdateLiquidityPositionAction,
    LiquidityPositionAction,
    LiquidityPositionActionType,
    ValueUpdateLiquidityPositionAction,
} from '../mapping'
import {last} from '../utils/misc'
import {Store} from '@subsquid/typeorm-store'

export async function processLiquidityPositionAction(ctx: CommonContext<Store>, action: LiquidityPositionAction) {
    switch (action.type) {
        case LiquidityPositionActionType.ValueUpdate:
            await processLiquidityPositionUpdate(ctx, action)
            break
        case LiquidityPositionActionType.AdjustValueUpdate:
            await processLiquidityPositionAdjustUpdate(ctx, action)
            break
    }
}

async function processLiquidityPositionUpdate(ctx: CommonContext<Store>, action: ValueUpdateLiquidityPositionAction) {
    const pool = await ctx.store.get(Pool, action.data.poolId)
    assert(pool != null, `Missing pool ${action.data.poolId}`)

    const user = await ctx.store.get(User, action.data.userId)
    assert(user != null, `Missing user ${action.data.userId}`)

    let position = await ctx.store.get(LiquidityPosition, action.data.id)
    if (position == null) {
        position = new LiquidityPosition({
            id: action.data.id,
            user,
            pool,
            value: 0n,
        })

        await ctx.store.insert(position)
        ctx.log.debug(`LiquidityPosition ${position.id} created`)
    }

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
    ctx: CommonContext<Store>,
    action: AdjustValueUpdateLiquidityPositionAction
) {
    const txPositionUpdates = await ctx.store.find(LiquidityPositionUpdate, {where: {txHash: action.transaction.hash}})

    const positionUpdate = last(txPositionUpdates)
    positionUpdate.amount0 = action.data.amount0
    positionUpdate.amount1 = action.data.amount1

    await ctx.store.upsert(positionUpdate)
}
