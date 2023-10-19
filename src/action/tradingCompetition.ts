import assert from 'assert'
import { CompetitionRules, MarketType, Prize, TimestampInfo, TradingCompetition, User } from '../model'
import { DeferredValue } from '../utils/deferred'
import { Action } from './base'

export interface CreateTradingCompetitionActionData {
    id: string
    entryFee: bigint
    maxParticipants: bigint
    ownerId: string
    tradingCompetition: string
    name: string
    description: string
    timestamp: TimestampInfo
    market: MarketType
    prize: Prize
    competitionRules: CompetitionRules
}

export class CreateTradingCompetitionAction extends Action<CreateTradingCompetitionActionData> {
    async perform(): Promise<void> {
        const owner = await this.store.getOrFail(User, this.data.ownerId)
        assert(owner != null)

        const tc = new TradingCompetition({
            id: this.data.id,
            entryFee: this.data.entryFee,
            maxParticipants: this.data.maxParticipants,
            owner,
            tradingCompetitionSpot: this.data.tradingCompetition,
            name: this.data.name,
            description: this.data.description,
            timestamp: this.data.timestamp,
            market: this.data.market,
            prize: this.data.prize,
            competitionRules: this.data.competitionRules,
            participantCount: 0
        })

        await this.store.insert(tc)
        this.log.debug(`Created Trading Competition ${tc.id}`)
    }
}

export interface UpdateTCInfoActionData {
    id: string
    count: number
    totalPrize: bigint
}
export class UpdateTCInfoAction extends Action<UpdateTCInfoActionData> {
    async perform(): Promise<void> {
        const tc = await this.store.getOrFail(TradingCompetition, this.data.id)
        assert(tc != null)

        tc.participantCount = this.data.count
        tc.prize.totalPrize = this.data.totalPrize

        await this.store.upsert(tc)
    }
}