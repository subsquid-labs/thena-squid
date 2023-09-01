import assert from 'assert'
import {CompetitionRules, MarketType, Prize, TimestampInfo, TradingCompetition} from '../model'
import {DeferredValue} from '../utils/deferred'
import {Action} from './base'

export interface CreateTradingCompetitionActionData {
    id: string
    entryFee: bigint
    maxParticipants: bigint
    owner: string
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
        const tc = new TradingCompetition({
            id: this.data.id,
            entryFee: this.data.entryFee,
            maxParticipants: this.data.maxParticipants,
            owner: this.data.owner,
            tradingCompetition: this.data.tradingCompetition,
            name: this.data.name,
            description: this.data.description,
            timestamp: this.data.timestamp,
            market: this.data.market,
            prize: this.data.prize,
            competitionRules: this.data.competitionRules,
        })

        await this.store.insert(tc)
        this.log.debug(`Created Trading Competition ${tc.id}`)
    }
}

export type TradingCompetitionAction = CreateTradingCompetitionAction
