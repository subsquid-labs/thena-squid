import {DataHandlerContext} from '@subsquid/evm-processor'
import {LiquidityPosition, Pool, Token, VeToken, Vote} from '../model'
import {StoreWithCache} from '../utils/store'
import {Action} from './base'
import {DeferredValue} from '../utils/deferred'
import assert from 'assert'

export interface EnsureVoteData {
    vote: DeferredValue<Vote, true>
    id: string
    token: DeferredValue<VeToken, true>
    pool: DeferredValue<Pool, true>
}

export class EnsureVoteAction extends Action<EnsureVoteData> {
    async _perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        let vote = await this.data.vote.get()
        if (vote != null) return

        const token = await this.data.token.get()
        assert(token != null)
        const pool = await this.data.pool.get()
        assert(pool != null)

        vote = new Vote({
            id: this.data.id,
            token,
            pool,
            weight: 0n,
        })
        await ctx.store.insert(vote)
        ctx.log.debug(`created Vote ${vote.id}`)
    }
}

export interface UpdateVoteData {
    vote: DeferredValue<Vote, true>
    value: bigint
}

export class UpdateVoteAction extends Action<UpdateVoteData> {
    async _perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        let vote = await this.data.vote.get()
        assert(vote != null)

        vote.weight += this.data.value

        await ctx.store.upsert(vote)
    }
}
