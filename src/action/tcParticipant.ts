import assert from 'assert'
import { TCParticipant, TradingCompetition, User } from '../model'
import { DeferredValue } from '../utils/deferred'
import { Action } from './base'

export interface CreateTCParticipantActionData {
    id: string
    userId: string
    tcId: string
}

export class CreateTCParticipantAction extends Action<CreateTCParticipantActionData> {
    async perform(): Promise<void> {
        const user = await this.store.getOrFail(User, this.data.userId)
        assert(user != null)

        const tc = await this.store.getOrFail(TradingCompetition, this.data.tcId)
        assert(tc != null)

        const tcParticipant = new TCParticipant({
            id: this.data.id,
            tradingCompetition: tc,
            participant: user,
            winAmount: 0n,
            isFetched: false
        })

        await this.store.insert(tcParticipant)
        this.log.debug(`Created Trading Competition Participant ${tcParticipant.id}`)
    }
}

export interface UpdateTCParticipantActionData {
    id: string
    winAmount: bigint
}

export class UpdateTCParticipantAction extends Action<UpdateTCParticipantActionData> {
    async perform(): Promise<void> {
        const tcParticipant = await this.store.getOrFail(TCParticipant, this.data.id)
        assert(tcParticipant != null)

        tcParticipant.winAmount = this.data.winAmount
        tcParticipant.isFetched = true;

        await this.store.upsert(tcParticipant)
        this.log.debug(`Updated Trading Competition Participant ${tcParticipant.id}`)
    }
}
