import {DataHandlerContext} from '@subsquid/evm-processor'
import {LiquidityPosition, LiquidityPositionUpdate, Pool, User} from '../model'
import {DeferredValue} from '../utils/deferred'
import {StoreWithCache} from '@belopash/squid-tools'
import {Action} from './base'
import assert from 'assert'
import {createLiquidityPositionUpdateId} from '../utils/ids'

export interface BaseLiquidityPositionActionData {
    positionId: string
}

export abstract class BaseLiquidityPositionAction<
    T extends BaseLiquidityPositionActionData = BaseLiquidityPositionActionData
> extends Action<T> {}

export interface EnsureLiquidityPositionActionData extends BaseLiquidityPositionActionData {
    userId: string
    poolId: string
}

export class EnsureLiquidityPositionAction extends BaseLiquidityPositionAction<EnsureLiquidityPositionActionData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const user = await ctx.store.getOrFail(User, this.data.userId)
        const pool = await ctx.store.getOrFail(Pool, this.data.poolId)

        const position = new LiquidityPosition({
            id: this.data.positionId,
            user,
            pool,
            value: 0n,
        })

        await ctx.store.insert(position)
        ctx.log.debug(`Created LiquidityPosition ${position.id}`)
    }
}

export interface ValueUpdateLiquidityPositionActionData extends BaseLiquidityPositionActionData {
    amount: bigint
    amount0?: bigint
    amount1?: bigint
}

export class ValueUpdateLiquidityPositionAction extends BaseLiquidityPositionAction<ValueUpdateLiquidityPositionActionData> {
    static lastUpdate:
        | {
              id: string
              txHash: string
              blockNumber: number
              index: number
          }
        | undefined

    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const position = await ctx.store.getOrFail(LiquidityPosition, this.data.positionId, {pool: true})
        const pool = position.pool

        position.value += this.data.amount
        // assert(position.value >= 0)

        await ctx.store.upsert(position)
        ctx.log.debug(`Value of LiquidityPostition ${position.id} updated to ${position.value} (${this.data.amount})`)

        const amount0 =
            this.data.amount0 != null ? this.data.amount0 : (this.data.amount * pool.reserve0) / pool.liquidity
        const amount1 =
            this.data.amount1 != null ? this.data.amount1 : (this.data.amount * pool.reserve1) / pool.liquidity

        const index =
            ValueUpdateLiquidityPositionAction.lastUpdate?.txHash === this.transaction.hash
                ? ValueUpdateLiquidityPositionAction.lastUpdate.index + 1
                : 0
        const positionUpdate = new LiquidityPositionUpdate({
            id: createLiquidityPositionUpdateId(this.transaction.id, index),
            blockNumber: this.block.height,
            timestamp: new Date(this.block.timestamp),
            txHash: this.transaction.hash,
            position,
            amount: this.data.amount,
            amount0,
            amount1,
        })

        await ctx.store.insert(positionUpdate)

        ValueUpdateLiquidityPositionAction.lastUpdate = {...positionUpdate, index}
    }
}

export interface AdjustValueUpdateLiquidityPositionActionData extends BaseLiquidityPositionActionData {
    amount0: bigint
    amount1: bigint
}

export class AdjustValueUpdateLiquidityPositionAction extends BaseLiquidityPositionAction<AdjustValueUpdateLiquidityPositionActionData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        if (
            ValueUpdateLiquidityPositionAction.lastUpdate == null ||
            ValueUpdateLiquidityPositionAction.lastUpdate.blockNumber !== this.block.height ||
            ValueUpdateLiquidityPositionAction.lastUpdate.txHash !== this.transaction.hash
        )
            return

        const positionUpdate = await ctx.store.getOrFail(
            LiquidityPositionUpdate,
            ValueUpdateLiquidityPositionAction.lastUpdate.id
        )

        positionUpdate.amount0 = this.data.amount0
        positionUpdate.amount1 = this.data.amount1

        await ctx.store.upsert(positionUpdate)
    }
}
