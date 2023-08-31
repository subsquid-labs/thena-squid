import assert from 'assert'
import {TradingCompetition, MarketType, CompetitionRules, Prize, TimestampInfo} from '../model'
import {DeferredValue} from '../utils/deferred'
import {Action} from './base'

export interface BaseTradingCompetitionActionData {
    tc: DeferredValue<TradingCompetition, true>
}

export abstract class BaseTradingCompetitionAction<T extends BaseTradingCompetitionActionData = BaseTradingCompetitionActionData> extends Action<T> {}

export interface CreateTradingCompetitionActionData extends BaseTradingCompetitionActionData {
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

export class CreateTradingCompetitionAction extends BaseTradingCompetitionAction<CreateTradingCompetitionActionData> {
    async perform(): Promise<void> {
        let tc = await this.data.tc.get()
        assert(tc == null, 'Trading Competition already exists 0_o')

        tc = new TradingCompetition({
            id: this.data.tradingCompetition,
            entryFee: this.data.entryFee,
            maxParticipants: this.data.maxParticipants,
            owner: this.data.owner,
            tradingCompetition: this.data.tradingCompetition,
            name: this.data.name,
            description: this.data.description,
            timestamp: this.data.timestamp,
            market: this.data.market,
            prize: this.data.prize,
            competitionRules: this.data.competitionRules
        })

        await this.store.insert(tc)
        this.log.debug(`Created Trading Competition ${tc.id}`)
    }
}

export type TradingCompetitionAction =
    | CreateTradingCompetitionAction
