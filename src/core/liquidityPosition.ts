import assert from 'assert'
import {
    LiquidityPositionAction,
    LiquidityPositionActionDataType,
    UpdateLiquidityPositionAction,
} from '../action/types/liquidityPosition'
import {User, Pool, LiquidityPosition, LiquidityPositionUpdate} from '../model'
import {CommonContext, Storage} from './types'
import {createLiquidityPositionUpdateId} from '../utils/ids'

export function processLiquidityPositionAction(
    ctx: CommonContext<
        Storage<{users: User; pools: Pool; positions: LiquidityPosition; positionUpdates: LiquidityPositionUpdate[]}>
    >,
    action: LiquidityPositionAction
) {
    switch (action.data.type) {
        case LiquidityPositionActionDataType.Update:
            processLiquidityPositionUpdate(ctx, action as UpdateLiquidityPositionAction)
            break
    }
}
function processLiquidityPositionUpdate(
    ctx: CommonContext<
        Storage<{users: User; pools: Pool; positions: LiquidityPosition; positionUpdates: LiquidityPositionUpdate[]}>
    >,
    action: UpdateLiquidityPositionAction
) {
    const pool = ctx.store.pools.get(action.data.pool)
    assert(pool != null, `Missing pool ${action.data.pool}`)

    const user = ctx.store.users.get(action.data.user)
    assert(user != null, `Missing user ${action.data.user}`)

    let position = ctx.store.positions.get(action.data.id)
    if (position == null) {
        position = new LiquidityPosition({
            id: action.data.id,
            user,
            pool,
            value: 0n,
        })
        ctx.store.positions.set(position.id, position)
        ctx.log.debug(`LiquidityPosition ${position.id} created`)
    }

    position.value += action.data.amount
    ctx.log.debug(`Value of LiquidityPostition ${position.id} updated to ${position.value} (${action.data.amount})`)

    // assert(position.value >= 0)

    let txPosotionUpdates = ctx.store.positionUpdates.get(action.transaction.id)
    if (txPosotionUpdates == null) {
        txPosotionUpdates = []
        ctx.store.positionUpdates.set(action.transaction.id, txPosotionUpdates)
    }

    const amount0 = (action.data.amount * pool.reserve0) / pool.liquidity
    const amount1 = (action.data.amount * pool.reserve1) / pool.liquidity

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
    txPosotionUpdates.push(positionUpdate)
}