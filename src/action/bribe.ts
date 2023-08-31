import assert from 'assert'
import {DataHandlerContext} from '@subsquid/evm-processor'
import {Bribe, Pool, Token, User, VeToken} from '../model'
import {StoreWithCache} from '@belopash/typeorm-store'
import {Action} from './base'

export interface CreateBribeData {
    bribeId: string
    address: string
    poolId: string
}

export class CreateBribeAction extends Action<CreateBribeData> {
    async perform(): Promise<void> {
        let pool = await this.store.get(Pool, this.data.poolId)

        const bribe = new Bribe({
            id: this.data.address,
            pool,
        })

        await this.store.insert(bribe)
        this.log.debug(`created Bribe ${bribe.id}`)
    }
}

export interface UpdateStakeBribeData {
    bribeId: string
    tokenId: string
    poolId?: string
    amount: bigint
}

export class UpdateStakeBribeAction extends Action<UpdateStakeBribeData> {
    protected static lasts: WeakMap<StoreWithCache, UpdateStakeBribeAction> = new WeakMap()

    static getLast(ctx: {store: StoreWithCache}) {
        return this.lasts.get(ctx.store)
    }

    // public get info(): UpdateStakeBribeInfo {
    //     assert(this.performed && this._info != null)
    //     return this._info
    // }

    async perform(): Promise<void> {
        UpdateStakeBribeAction.lasts.set(this.store, this)
    }
}
