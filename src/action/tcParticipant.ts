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
            startBalance: 0n,
            pnl: 0n,
            winAmount: 0n,
            winTokenPriceInUSD: 0,
            winTokenDecimal: 0
        })

        await this.store.insert(tcParticipant)
        this.log.debug(`Created Trading Competition Participant ${tcParticipant.id}`)
    }
}

export interface UpdateTCParticipantActionData {
    id: string
    startBalance: bigint
    pnl: bigint
    winAmount: bigint
    winTokenPriceInUSD: number
    winTokenDecimal: number
}

export class UpdateTCParticipantAction extends Action<UpdateTCParticipantActionData> {
    async perform(): Promise<void> {
        const tcParticipant = await this.store.getOrFail(TCParticipant, this.data.id)
        assert(tcParticipant != null)

        if (this.data.startBalance > 0n)
            tcParticipant.startBalance = this.data.startBalance

        if (this.data.pnl != 0n)
            tcParticipant.pnl = this.data.pnl

        if (this.data.winAmount > 0n)
            tcParticipant.winAmount = this.data.winAmount

        if (this.data.winTokenPriceInUSD > 0)
            tcParticipant.winTokenPriceInUSD = this.data.winTokenPriceInUSD

        if (this.data.winTokenDecimal > 0)
            tcParticipant.winTokenDecimal = this.data.winTokenDecimal

        await this.store.upsert(tcParticipant)
        this.log.debug(`Updated Trading Competition Participant ${tcParticipant.id}`)
    }
}
