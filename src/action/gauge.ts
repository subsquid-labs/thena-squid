import {DataHandlerContext} from '@subsquid/evm-processor'
import {Action} from './base'
import {StoreWithCache} from '@belopash/squid-tools'
import {Bribe, Gauge, GaugeStake, Pool, Token, User} from '../model'
import assert from 'assert'

export interface CreateGaugeData {
    gaugeId: string
    address: string
    poolId: string
    internalBribeId: string
    externalBribeId: string
}

export class CreateGaugeAction extends Action<CreateGaugeData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        let pool = await ctx.store.get(Pool, this.data.poolId)
        // assert(pool != null)

        const internalBribe = await ctx.store.getOrFail(Bribe, this.data.internalBribeId)
        const externalBribe = await ctx.store.getOrFail(Bribe, this.data.externalBribeId)

        const gauge = new Gauge({
            id: this.data.address,
            pool,
            externalBribe,
            internalBribe,
            totalSupply: 0n,
            isAlive: true,
        })

        await ctx.store.insert(gauge)
        ctx.log.debug(`created Gauge ${gauge.id}`)
    }
}

export interface UpdateTotalSupplyGaugeData {
    gaugeId: string
    amount: bigint
}

export class UpdateTotalSupplyGaugeAction extends Action<UpdateTotalSupplyGaugeData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const gauge = await ctx.store.getOrFail(Gauge, this.data.gaugeId)

        gauge.totalSupply += this.data.amount

        await ctx.store.upsert(gauge)
    }
}

export interface CreateGaugeStakeData {
    stakeId: string
    userId: string
    gaugeId: string
}

export class CreateStakeGaugeAction extends Action<CreateGaugeStakeData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const gauge = await ctx.store.getOrFail(Gauge, this.data.gaugeId)
        const user = await ctx.store.getOrFail(User, this.data.userId)

        const stake = new GaugeStake({
            id: this.data.stakeId,
            gauge,
            user,
            value: 0n,
            totalReward: 0n,
        })

        await ctx.store.insert(stake)
    }
}

export interface UpdateGaugeStakeData {
    stakeId: string
    amount: bigint
}

export class UpdateStakeGaugeAction extends Action<UpdateGaugeStakeData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const stake = await ctx.store.getOrFail(GaugeStake, this.data.stakeId)

        stake.value += this.data.amount

        await ctx.store.upsert(stake)
    }
}

export interface RewardGaugeStakeData {
    stakeId: string
    amount: bigint
}

export class RewardStakeGaugeAction extends Action<RewardGaugeStakeData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const stake = await ctx.store.get(GaugeStake, this.data.stakeId)
        if (stake == null) return // FIXME: rework rewards indexing

        stake.totalReward += this.data.amount

        await ctx.store.upsert(stake)
    }
}
