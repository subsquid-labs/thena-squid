import {Pool, VeToken, Vote} from '../model'
import {Action} from './base'

export interface CreateVoteData {
    voteId: string
    tokenId: string
    poolId: string
}

export class CreateVoteAction extends Action<CreateVoteData> {
    async perform(): Promise<void> {
        const token = await this.store.getOrFail(VeToken, this.data.tokenId)
        const pool = await this.store.getOrFail(Pool, this.data.poolId)

        const vote = new Vote({
            id: this.data.voteId,
            token,
            pool,
            weight: 0n,
        })
        await this.store.insert(vote)
        this.log.debug(`created Vote ${vote.id}`)
    }
}

export interface UpdateVoteData {
    voteId: string
    value: bigint
}

export class UpdateVoteAction extends Action<UpdateVoteData> {
    async perform(): Promise<void> {
        let vote = await this.store.getOrFail(Vote, this.data.voteId)

        vote.weight += this.data.value

        await this.store.upsert(vote)
    }
}
