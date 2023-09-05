import {StoreWithCache} from '@belopash/typeorm-store'
import {MappingContext} from '../interfaces'
import {TCMANAGER_ADDRESS} from '../config'
import {Log} from '../processor'
import * as tradingCompetitionManager from '../abi/tradingCompetitionManager'
import {CallCache} from '../utils/callCache'
import {CompetitionRules, MarketType, TimestampInfo, Prize} from '../model'
import {createTradingCompetitionId} from '../utils/ids'

export function isTradingCompetitionManagerItem(item: Log) {
    return item.address === TCMANAGER_ADDRESS
}

export function getTradingCompetitionManagerActions(ctx: MappingContext<StoreWithCache>, item: Log) {
    switch (item.topics[0]) {
        case tradingCompetitionManager.events.Create.topic: {
            ctx.log.debug(`processing Trading Competition creation event...`)
            const event = tradingCompetitionManager.events.Create.decode(item)
            const idCounter = event.idCounter

            const callCache = CallCache.get(ctx)
            const tcDeferred = callCache.defer(item.block, [
                tradingCompetitionManager.functions.idToTradingCompetition,
                TCMANAGER_ADDRESS,
                [idCounter],
            ])

            ctx.queue.lazy(async () => {
                const tc = await tcDeferred.get()
                const id = createTradingCompetitionId(Number(idCounter), tc.tradingCompetition.toLowerCase())

                ctx.queue.add('tc_create', {
                    id,
                    entryFee: tc.entryFee,
                    maxParticipants: tc.MAX_PARTICIPANTS,
                    owner: tc.owner.toLowerCase(),
                    tradingCompetition: tc.tradingCompetition.toLowerCase(),
                    name: tc.name,
                    description: tc.description,
                    timestamp: new TimestampInfo({
                        startTimestamp: tc.timestamp.startTimestamp,
                        endTimestamp: tc.timestamp.endTimestamp,
                        registrationStart: tc.timestamp.registrationStart,
                        registrationEnd: tc.timestamp.registrationEnd,
                    }),
                    market: tc.market == 0 ? MarketType.SPOT : MarketType.PERPETUALS,
                    prize: new Prize({
                        winType: tc.prize.win_type,
                        weights: tc.prize.weights,
                        totalPrize: tc.prize.totalPrize,
                        ownerFee: tc.prize.owner_fee,
                        token: tc.prize.token,
                    }),
                    competitionRules: new CompetitionRules({
                        startingBalance: tc.competitionRules.starting_balance,
                        winningToken: tc.competitionRules.winning_token,
                        tradingTokens: tc.competitionRules.tradingTokens,
                    }),
                })
            })

            break
        }
    }
}