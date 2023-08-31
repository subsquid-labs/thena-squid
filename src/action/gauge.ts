import {DataHandlerContext} from '@subsquid/evm-processor'
import {Action} from './base'
import {StoreWithCache} from '@belopash/typeorm-store'
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
    async perform(): Promise<void> {
        let pool = await this.store.get(Pool, this.data.poolId)
        // assert(pool != null)

        const internalBribe = await this.store.getOrFail(Bribe, this.data.internalBribeId)
        const externalBribe = await this.store.getOrFail(Bribe, this.data.externalBribeId)

        const gauge = new Gauge({
            id: this.data.address,
            pool,
            externalBribe,
            internalBribe,
            totalSupply: 0n,
            isAlive: true,
        })

        await this.store.insert(gauge)
        this.log.debug(`created Gauge ${gauge.id}`)
    }
}

export interface UpdateTotalSupplyGaugeData {
    gaugeId: string
    amount: bigint
}

export class UpdateTotalSupplyGaugeAction extends Action<UpdateTotalSupplyGaugeData> {
    async perform(): Promise<void> {
        const gauge = await this.store.getOrFail(Gauge, this.data.gaugeId)

        gauge.totalSupply += this.data.amount

        await this.store.upsert(gauge)
    }
}

export interface CreateGaugeStakeData {
    stakeId: string
    userId: string
    gaugeId: string
}

export class CreateStakeGaugeAction extends Action<CreateGaugeStakeData> {
    async perform(): Promise<void> {
        const gauge = await this.store.getOrFail(Gauge, this.data.gaugeId)
        const user = await this.store.getOrFail(User, this.data.userId)

        const stake = new GaugeStake({
            id: this.data.stakeId,
            gauge,
            user,
            value: 0n,
            totalReward: 0n,
        })

        await this.store.insert(stake)
    }
}

export interface UpdateGaugeStakeData {
    stakeId: string
    amount: bigint
}

export class UpdateStakeGaugeAction extends Action<UpdateGaugeStakeData> {
    async perform(): Promise<void> {
        const stake = await this.store.getOrFail(GaugeStake, this.data.stakeId)

        stake.value += this.data.amount

        await this.store.upsert(stake)
    }
}

export interface RewardGaugeStakeData {
    stakeId: string
    amount: bigint
}

export class RewardStakeGaugeAction extends Action<RewardGaugeStakeData> {
    async perform(): Promise<void> {
        const stake = await this.store.get(GaugeStake, this.data.stakeId)
        if (stake == null) return // FIXME: rework rewards indexing

        stake.totalReward += this.data.amount

        await this.store.upsert(stake)
    }
}
