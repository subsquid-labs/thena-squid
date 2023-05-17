import {DataHandlerContext} from '@subsquid/evm-processor'
import {StoreWithCache} from '../utils/store'
import {Action} from './base'
import {User, VeToken} from '../model'
import {DeferredValue} from '../utils/deferred'
import assert from 'assert'

export interface CreateVeTokenData {
    id: string
    index: number
    zero: DeferredValue<User, true>
}

export class CreateVeTokenAction extends Action<CreateVeTokenData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const owner = await this.data.zero.get()
        assert(owner != null)

        const veToken = new VeToken({
            id: this.data.id,
            owner,
            lockedUntil: new Date(this.block.timestamp),
            value: 0n,
            totalReward: 0n,
        })

        await ctx.store.insert(veToken)
    }
}

export interface TransferVeTokenData {
    token: DeferredValue<VeToken, true>
    from: DeferredValue<User, true>
    to: DeferredValue<User, true>
}

export class TransferVeTokenAction extends Action<TransferVeTokenData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const veToken = await this.data.token.get()
        assert(veToken != null)

        const from = await this.data.from.get()
        assert(from != null)
        assert(veToken.owner.id === from.id)

        const to = await this.data.to.get()
        assert(to != null)

        veToken.owner = to

        await ctx.store.upsert(veToken)
    }
}

export interface UpdateValueVeTokenData {
    token: DeferredValue<VeToken, true>
    amount: bigint
}

export class UpdateValueVeTokenAction extends Action<UpdateValueVeTokenData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const veToken = await this.data.token.get()
        assert(veToken != null)

        veToken.value += this.data.amount
        assert(veToken.value >= 0n)

        await ctx.store.upsert(veToken)
    }
}

export interface UpdateLockTimeVeTokenData {
    token: DeferredValue<VeToken, true>
    lockTime: Date
}

export class UpdateLockTimeVeTokenAction extends Action<UpdateLockTimeVeTokenData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const veToken = await this.data.token.get()
        assert(veToken != null)

        veToken.lockedUntil = this.data.lockTime

        await ctx.store.upsert(veToken)
    }
}

export interface RewardVeTokenData {
    token: DeferredValue<VeToken, true>
    amount: bigint
}

export class RewardVeTokenAction extends Action<RewardVeTokenData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const veToken = await this.data.token.get()
        assert(veToken != null)

        veToken.totalReward += this.data.amount

        await ctx.store.upsert(veToken)
    }
}
