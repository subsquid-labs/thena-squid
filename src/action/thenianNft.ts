import assert from 'assert'
import {Attribute, ThenianNft, User} from '../model'
import {Action} from './base'

export interface CreateThenianNftData {
    tokenId: string
    ownerId: string
    image: string
    attributes: {traitType: string; value: string}[]
    timestamp: bigint
}

export class CreateThenianNftAction extends Action<CreateThenianNftData> {
    async perform(): Promise<void> {
        const owner = await this.store.getOrFail(User, this.data.ownerId)
        assert(owner != null)

        const thenianNft = new ThenianNft({
            id: this.data.tokenId,
            owner,
            image: this.data.image,
            attributes: this.data.attributes.map((a) => new Attribute(a)),
            timestamp: this.data.timestamp,
        })

        await this.store.insert(thenianNft)
    }
}

export interface UpdateOwnerThenianNftData {
    tokenId: string
    fromId: string
    toId: string
}

export class UpdateOwnerThenianNftAction extends Action<UpdateOwnerThenianNftData> {
    async perform(): Promise<void> {
        const thenianNft = await this.store.getOrFail(ThenianNft, this.data.tokenId, {owner: true})
        assert(thenianNft.owner.id === this.data.fromId)

        const to = await this.store.getOrFail(User, this.data.toId)
        assert(to != null)

        thenianNft.owner = to

        await this.store.upsert(thenianNft)
    }
}
