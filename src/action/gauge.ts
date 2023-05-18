import {DataHandlerContext} from '@subsquid/evm-processor'
import {Action} from './base'
import {StoreWithCache} from '../utils/store'
import {DeferredValue} from '../utils/deferred'
import {Bribe, Gauge, GaugeStake, Pool, Token, User} from '../model'
import assert from 'assert'

export interface CreateGaugeData {
    address: string
    pool: DeferredValue<Pool, true>
    internalBribe: DeferredValue<Bribe, true>
    externalBribe: DeferredValue<Bribe, true>
}

export class CreateGaugeAction extends Action<CreateGaugeData> {
    async _perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        let pool = await this.data.pool.get()
        assert(pool != null)

        const internalBribe = await this.data.internalBribe.get()
        assert(internalBribe != null)

        const externalBribe = await this.data.externalBribe.get()
        assert(externalBribe != null)

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
    gauge: DeferredValue<Gauge, true>
    amount: bigint
}

export class UpdateTotalSupplyGaugeAction extends Action<UpdateTotalSupplyGaugeData> {
    async _perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const gauge = await this.data.gauge.get()
        assert(gauge != null)

        gauge.totalSupply += this.data.amount

        await ctx.store.upsert(gauge)
    }
}

export interface EnsureGaugeStakeData {
    stake: DeferredValue<GaugeStake, true>
    id: string
    user: DeferredValue<User, true>
    gauge: DeferredValue<Gauge, true>
}

export class EnsureStakeGaugeAction extends Action<EnsureGaugeStakeData> {
    async _perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        let stake = await this.data.stake.get()
        if (stake == null) return

        const gauge = await this.data.gauge.get()
        assert(gauge != null)

        const user = await this.data.user.get()
        assert(user != null)

        stake = new GaugeStake({
            id: this.data.id,
            gauge,
            user,
            value: 0n,
            totalReward: 0n,
        })

        await ctx.store.insert(stake)
    }
}

export interface UpdateGaugeStakeData {
    stake: DeferredValue<GaugeStake, true>
    amount: bigint
}

export class UpdateStakeGaugeAction extends Action<UpdateGaugeStakeData> {
    async _perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const stake = await this.data.stake.get()
        assert(stake != null)

        stake.value += this.data.amount

        await ctx.store.upsert(stake)
    }
}

export interface RewardGaugeStakeData {
    stake: DeferredValue<GaugeStake, true>
    amount: bigint
}

export class RewardStakeGaugeAction extends Action<RewardGaugeStakeData> {
    async _perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const stake = await this.data.stake.get()
        assert(stake != null)

        stake.totalReward += this.data.amount

        await ctx.store.upsert(stake)
    }
}
