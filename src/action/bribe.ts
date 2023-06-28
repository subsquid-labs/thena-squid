import assert from 'assert'
import {DataHandlerContext} from '@subsquid/evm-processor'
import {Bribe, Pool, User, VeToken} from '../model'
import {DeferredValue} from '../utils/deferred'
import {StoreWithCache} from '@belopash/squid-tools'
import {Action} from './base'

export interface CreateBribeData {
    address: string
    pool: DeferredValue<Pool, true>
}

export class CreateBribeAction extends Action<CreateBribeData> {
    async _perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        let pool = await this.data.pool.get()
        // assert(pool != null)

        const bribe = new Bribe({
            id: this.data.address,
            pool,
        })

        await ctx.store.insert(bribe)
        ctx.log.debug(`created Bribe ${bribe.id}`)
    }
}

export interface UpdateStakeBribeData {
    bribe: DeferredValue<Bribe, true>
    token: DeferredValue<VeToken, true>
    amount: bigint
}

export interface UpdateStakeBribeInfo {
    bribe: string
    pool?: string
    token: string
    amount: bigint
}

export class UpdateStakeBribeAction extends Action<UpdateStakeBribeData> {
    protected static lasts: WeakMap<StoreWithCache, UpdateStakeBribeAction> = new WeakMap()

    static getLast(ctx: DataHandlerContext<StoreWithCache>) {
        return this.lasts.get(ctx.store)
    }

    private _info: UpdateStakeBribeInfo | undefined

    public get info(): UpdateStakeBribeInfo {
        assert(this.performed && this._info != null)
        return this._info
    }

    async _perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        let token = await this.data.token.get()
        assert(token != null)

        const bribe = await this.data.bribe.get()
        assert(bribe != null)

        const pool = bribe.pool

        this._info = {
            bribe: bribe.id,
            pool: pool?.id,
            token: token.id,
            amount: this.data.amount,
        }
        UpdateStakeBribeAction.lasts.set(ctx.store, this)
    }
}
