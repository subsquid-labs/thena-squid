import assert from 'assert'
import {UsernameNft, User} from '../model'
import {Action} from './base'

export interface CreateUsernameNftData {
    tokenId: string
    ownerId: string
    index: bigint
    name: string
}

export class CreateUsernameNftAction extends Action<CreateUsernameNftData> {
    async perform(): Promise<void> {
        const owner = await this.store.getOrFail(User, this.data.ownerId)
        assert(owner != null)

        const usernameNft = new UsernameNft({
            id: this.data.tokenId,
            index: this.data.index,
            name: this.data.name,
            owner,
            timestamp: new Date(this.block.timestamp),
        })

        await this.store.insert(usernameNft)
    }
}

export interface UpdateOwnerUsernameNftData {
    tokenId: string
    fromId: string
    toId: string
}

export class UpdateOwnerUsernameNftAction extends Action<UpdateOwnerUsernameNftData> {
    async perform(): Promise<void> {
        const usernameNft = await this.store.getOrFail(UsernameNft, {id: this.data.tokenId, relations: {owner: true}})
        assert(usernameNft.owner.id === this.data.fromId)

        const to = await this.store.getOrFail(User, this.data.toId)
        assert(to != null)

        usernameNft.owner = to
        usernameNft.timestamp = new Date(this.block.timestamp)

        await this.store.upsert(usernameNft)
    }
}
