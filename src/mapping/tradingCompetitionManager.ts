import {StoreWithCache} from '@belopash/typeorm-store'
import {MappingContext} from '../interfaces'
import {TCMANAGER_ADDRESS} from '../config'
import {Log} from '../processor'
import * as tradingCompetitionManager from '../abi/tradingCompetitionManager'
import * as bep20 from '../abi/bep20'
import {CompetitionRules, MarketType, TimestampInfo, TradingCompetition, Prize} from '../model'

export function isTradingCompetitionManagerItem(item: Log) {
    return item.address === TCMANAGER_ADDRESS
}

export function getTradingCompetitionManagerActions(ctx: MappingContext<StoreWithCache>, item: Log) {

    switch (item.topics[0]) {
        case tradingCompetitionManager.events.Create.topic: {
            ctx.log.debug(`processing Trading Competition creation event...`)
            const event = tradingCompetitionManager.events.Create.decode(item)

            console.log('TradingCompetitionManager Create Event: ', item.data)

            const id = event.tradingCompetition.tradingCompetition.toLowerCase()
            const entryFee = event.tradingCompetition.entryFee
            const maxParticipants = event.tradingCompetition.MAX_PARTICIPANTS
            const owner = event.tradingCompetition.owner.toLowerCase()
            const tradingCompetition = event.tradingCompetition.tradingCompetition.toLowerCase()
            const name = event.tradingCompetition.name
            const description = event.tradingCompetition.description
            const timestamp = event.tradingCompetition.timestamp
            const market = event.tradingCompetition.market
            const prize = event.tradingCompetition.prize
            const competitionRules = event.tradingCompetition.competitionRules


            ctx.queue.add('tc_create', {
                    tc: ctx.store.defer(TradingCompetition, id),
                    entryFee,
                    maxParticipants,
                    owner,
                    tradingCompetition,
                    name,
                    description,
                    timestamp: new TimestampInfo(timestamp),
                    market: market === 0 ? MarketType.SPOT : MarketType.PERPETUALS,
                    prize: new Prize({winType: prize.win_type, weights: prize.weights, totalPrize: prize.totalPrize, ownerFee: prize.owner_fee, token: prize.token}),
                    competitionRules: new CompetitionRules({startingBalance: competitionRules.starting_balance, winningToken: competitionRules.winning_token, tradingTokens: competitionRules.tradingTokens})
                })
            break
        }
    }

}
