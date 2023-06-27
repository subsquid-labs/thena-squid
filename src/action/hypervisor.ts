import assert from 'assert'
import {DataHandlerContext} from '@subsquid/evm-processor'
import * as hypervisorAbi from '../abi/hypervisor'
import {Hypervisor, LiquidityPosition, Pool, PoolType, Token} from '../model'
import {CallCache} from '../utils/callCache'
import {DeferredValue} from '../utils/deferred'
import {StoreWithCache} from '@belopash/squid-tools'
import {Action} from './base'
import {CreatePoolAction} from './pool'
import {EnsureTokenAction} from './token'

export interface BaseHypervisorActionData {
    hypervisor: DeferredValue<Hypervisor, true>
}

export abstract class BaseHypervisorAction<
    T extends BaseHypervisorActionData = BaseHypervisorActionData
> extends Action<T> {}

export interface EnsureHypervisorActionData extends BaseHypervisorActionData {
    address: string
    pool: string
    hypervisorPool: Promise<string>
    token0: Promise<string>
    token1: Promise<string>
}

export class EnsureHypervisorAction extends BaseHypervisorAction<EnsureHypervisorActionData> {
    async _perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        let hypervisor = await this.data.hypervisor.get()
        if (hypervisor != null) return

        const callCache = CallCache.get(ctx)

        const token0Address = await this.data.token0
        const token0Decimals = callCache.defer(this.block, [hypervisorAbi.functions.decimals, token0Address, []])
        const token0Symbol = callCache.defer(this.block, [hypervisorAbi.functions.symbol, token0Address, []])
        const ensureToken0 = new EnsureTokenAction(this.block, this.transaction, {
            token: ctx.store.defer(Token, token0Address),
            address: token0Address,
            get decimals() {
                return token0Decimals.get()
            },
            get symbol() {
                return token0Symbol.get()
            },
        })

        const token1Address = await this.data.token1
        const token1Decimals = callCache.defer(this.block, [hypervisorAbi.functions.decimals, token1Address, []])
        const token1Symbol = callCache.defer(this.block, [hypervisorAbi.functions.symbol, token1Address, []])
        const ensureToken1 = new EnsureTokenAction(this.block, this.transaction, {
            token: ctx.store.defer(Token, token1Address),
            address: token0Address,
            get decimals() {
                return token1Decimals.get()
            },
            get symbol() {
                return token1Symbol.get()
            },
        })

        const poolCreation = new CreatePoolAction(this.block, this.transaction, {
            pool: ctx.store.defer(Pool, this.data.address),
            address: this.data.address,
            factory: this.data.address,
            type: PoolType.Hypervisor,
            token0: ctx.store.defer(Token, token0Address),
            token1: ctx.store.defer(Token, token1Address),
        })

        await ensureToken0.perform(ctx)
        await ensureToken1.perform(ctx)
        await poolCreation.perform(ctx)

        const pool = await ctx.store.getOrFail(Pool, this.data.pool)

        hypervisor = new Hypervisor({
            id: this.data.address,
            pool,
            basePosition: undefined,
            limitPosition: undefined,
        })

        await ctx.store.insert(hypervisor)
        ctx.log.debug(`Hypervisor ${hypervisor.id} created`)
    }
}

export interface SetPositionHypervisorActionData extends BaseHypervisorActionData {
    position: DeferredValue<LiquidityPosition, true>
}

export class SetPositionHypervisorAction extends BaseHypervisorAction<SetPositionHypervisorActionData> {
    async _perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const hypervisor = await this.data.hypervisor.get()
        assert(hypervisor != null)

        const position = await this.data.position.get()
        assert(position != null, 'Missing position')

        if (hypervisor.basePosition == null) {
            hypervisor.basePosition = position
            ctx.log.debug(`Base position of Hypervisor ${hypervisor.id} set to ${position.id}`)
        } else if (hypervisor.limitPosition == null) {
            hypervisor.limitPosition = position
            ctx.log.debug(`Limit position of Hypervisor ${hypervisor.id} set to ${position.id}`)
        } else {
            // throw new Error(`Unexpected case`)
            return
        }

        await ctx.store.upsert(hypervisor)
    }
}

export interface RemovePositionHypervisorActionData extends BaseHypervisorActionData {
    position: DeferredValue<LiquidityPosition, true>
}

export class RemovePositionHypervisorAction extends BaseHypervisorAction<RemovePositionHypervisorActionData> {
    async _perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const hypervisor = await this.data.hypervisor.get()
        assert(hypervisor != null)

        const position = await this.data.position.get()
        assert(position != null, 'Missing position')

        if (hypervisor.basePosition?.id === position.id) {
            hypervisor.basePosition = null
            ctx.log.debug(`Base position of Hypervisor ${hypervisor.id} removed`)
        } else if (hypervisor.limitPosition?.id == position.id) {
            hypervisor.limitPosition = null
            ctx.log.debug(`Limit position of Hypervisor ${hypervisor.id} removed`)
        } else {
            // throw new Error(`Unexpected case`)
            return
        }

        await ctx.store.upsert(hypervisor)
    }
}

export type HypervisorAction = EnsureHypervisorAction | SetPositionHypervisorAction | RemovePositionHypervisorAction
