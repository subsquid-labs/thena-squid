import {Action} from './base'
import {User, VeToken} from '../model'
import assert from 'assert'

export interface CreateVeTokenData {
    tokenId: string
    index: number
    ownerId: string
}

export class CreateVeTokenAction extends Action<CreateVeTokenData> {
    async perform(): Promise<void> {
        const owner = await this.store.getOrFail(User, this.data.ownerId)
        assert(owner != null)

        const veToken = new VeToken({
            id: this.data.tokenId,
            owner,
            lockedUntil: new Date(this.block.timestamp),
            value: 0n,
            totalReward: 0n,
        })

        await this.store.insert(veToken)
    }
}

export interface TransferVeTokenData {
    tokenId: string
    fromId: string
    toId: string
}

export class TransferVeTokenAction extends Action<TransferVeTokenData> {
    async perform(): Promise<void> {
        const veToken = await this.store.getOrFail(VeToken, this.data.tokenId, {owner: true})
        assert(veToken.owner.id === this.data.fromId)

        const to = await this.store.getOrFail(User, this.data.toId)
        assert(to != null)

        veToken.owner = to

        await this.store.upsert(veToken)
    }
}

export interface UpdateValueVeTokenData {
    tokenId: string
    amount: bigint
}

export class UpdateValueVeTokenAction extends Action<UpdateValueVeTokenData> {
    async perform(): Promise<void> {
        const veToken = await this.store.getOrFail(VeToken, this.data.tokenId)

        veToken.value += this.data.amount
        assert(veToken.value >= 0n)

        await this.store.upsert(veToken)
    }
}

export interface UpdateLockTimeVeTokenData {
    tokenId: string
    lockTime: Date
}

export class UpdateLockTimeVeTokenAction extends Action<UpdateLockTimeVeTokenData> {
    async perform(): Promise<void> {
        const veToken = await this.store.getOrFail(VeToken, this.data.tokenId)

        veToken.lockedUntil = this.data.lockTime

        await this.store.upsert(veToken)
    }
}

export interface RewardVeTokenData {
    tokenId: string
    amount: bigint
}

export class RewardVeTokenAction extends Action<RewardVeTokenData> {
    async perform(): Promise<void> {
        const veToken = await this.store.getOrFail(VeToken, this.data.tokenId)

        veToken.totalReward += this.data.amount

        await this.store.upsert(veToken)
    }
}
