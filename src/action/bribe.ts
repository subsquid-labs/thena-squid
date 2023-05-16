import {DataHandlerContext} from '@subsquid/evm-processor'
import {Action} from './base'
import {StoreWithCache} from '../utils/store'
import {DeferredValue} from '../utils/deferred'
import {Bribe, User} from '../model'
import assert from 'assert'

export interface CreateBribeData {
    address: string
}

export class CreateBribeAction extends Action<CreateBribeData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const bribe = new Bribe({
            id: this.data.address,
            totalSupply: 0n,
        })

        await ctx.store.insert(bribe)
        ctx.log.debug(`created Bribe ${bribe.id}`)
    }
}
