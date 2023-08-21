import {DataHandlerContext} from '@subsquid/evm-processor'
import {Pool, VeToken, Vote} from '../model'
import {StoreWithCache} from '@belopash/squid-tools'
import {Action} from './base'

export interface EnsureVoteData {
    voteId: string
    tokenId: string
    poolId: string
}

export class EnsureVoteAction extends Action<EnsureVoteData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const token = await ctx.store.getOrFail(VeToken, this.data.tokenId)
        const pool = await ctx.store.getOrFail(Pool, this.data.poolId)

        const vote = new Vote({
            id: this.data.voteId,
            token,
            pool,
            weight: 0n,
        })
        await ctx.store.insert(vote)
        ctx.log.debug(`created Vote ${vote.id}`)
    }
}

export interface UpdateVoteData {
    voteId: string
    value: bigint
}

export class UpdateVoteAction extends Action<UpdateVoteData> {
    async perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        let vote = await ctx.store.getOrFail(Vote, this.data.voteId)

        vote.weight += this.data.value

        await ctx.store.upsert(vote)
    }
}
