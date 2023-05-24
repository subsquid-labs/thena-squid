import assert from 'assert'
import {DataHandlerContext} from '@subsquid/evm-processor'
import * as hypervisorAbi from '../abi/hypervisor'
import {Hypervisor, LiquidityPosition, Pool, PoolType, Token} from '../model'
import {CallCache} from '../utils/callQueue'
import {DeferredValue} from '../utils/deferred'
import {StoreWithCache} from '../utils/store'
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
    hypervisorPool: DeferredValue<string>
    pool: DeferredValue<Pool, true>
    token0: DeferredValue<string>
    token1: DeferredValue<string>
}

export class EnsureHypervisorAction extends BaseHypervisorAction<EnsureHypervisorActionData> {
    async _perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        let hypervisor = await this.data.hypervisor.get()
        if (hypervisor != null) return

        const callCache = CallCache.get(ctx)

        const token0Address = await this.data.token0.get()
        const ensureToken0 = new EnsureTokenAction(this.block, this.transaction, {
            token: ctx.store.defer(Token, token0Address),
            address: token0Address,
            decimals: callCache.defer(this.block, hypervisorAbi.functions.decimals, {
                address: token0Address,
                args: [],
            }),
            symbol: callCache.defer(this.block, hypervisorAbi.functions.symbol, {
                address: token0Address,
                args: [],
            }),
        })

        const token1Address = await this.data.token1.get()
        const ensureToken1 = new EnsureTokenAction(this.block, this.transaction, {
            token: ctx.store.defer(Token, token1Address),
            address: token0Address,
            decimals: callCache.defer(this.block, hypervisorAbi.functions.decimals, {
                address: token1Address,
                args: [],
            }),
            symbol: callCache.defer(this.block, hypervisorAbi.functions.symbol, {
                address: token1Address,
                args: [],
            }),
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

        const pool = await this.data.pool.get()
        assert(pool != null)

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
