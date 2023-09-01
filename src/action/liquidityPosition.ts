import assert from 'assert'
import {LiquidityPosition, LiquidityPositionUpdate, Pool, User} from '../model'
import {createLiquidityPositionUpdateId} from '../utils/ids'
import {Action} from './base'

export interface BaseLiquidityPositionActionData {
    positionId: string
}

export abstract class BaseLiquidityPositionAction<
    T extends BaseLiquidityPositionActionData = BaseLiquidityPositionActionData
> extends Action<T> {}

export interface CreateLiquidityPositionActionData extends BaseLiquidityPositionActionData {
    userId: string
    poolId: string
}

export class CreateLiquidityPositionAction extends BaseLiquidityPositionAction<CreateLiquidityPositionActionData> {
    async perform(): Promise<void> {
        const user = await this.store.getOrFail(User, this.data.userId)
        const pool = await this.store.getOrFail(Pool, this.data.poolId)

        const position = new LiquidityPosition({
            id: this.data.positionId,
            user,
            pool,
            value: 0n,
        })

        await this.store.insert(position)
        this.log.debug(`Created LiquidityPosition ${position.id}`)
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

    async perform(): Promise<void> {
        assert(this.transaction != null)

        const position = await this.store.getOrFail(LiquidityPosition, this.data.positionId, {pool: true})
        const pool = position.pool

        position.value += this.data.amount
        // assert(position.value >= 0)

        await this.store.upsert(position)
        this.log.debug(`Value of LiquidityPostition ${position.id} updated to ${position.value} (${this.data.amount})`)

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

        await this.store.insert(positionUpdate)

        ValueUpdateLiquidityPositionAction.lastUpdate = {...positionUpdate, index}
    }
}

export interface AdjustValueUpdateLiquidityPositionActionData extends BaseLiquidityPositionActionData {
    amount0: bigint
    amount1: bigint
}

export class AdjustValueUpdateLiquidityPositionAction extends BaseLiquidityPositionAction<AdjustValueUpdateLiquidityPositionActionData> {
    async perform(): Promise<void> {
        assert(this.transaction != null)

        if (
            ValueUpdateLiquidityPositionAction.lastUpdate == null ||
            ValueUpdateLiquidityPositionAction.lastUpdate.blockNumber !== this.block.height ||
            ValueUpdateLiquidityPositionAction.lastUpdate.txHash !== this.transaction.hash
        )
            return

        const positionUpdate = await this.store.getOrFail(
            LiquidityPositionUpdate,
            ValueUpdateLiquidityPositionAction.lastUpdate.id
        )

        positionUpdate.amount0 = this.data.amount0
        positionUpdate.amount1 = this.data.amount1

        await this.store.upsert(positionUpdate)
    }
}
