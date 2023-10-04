import { StoreWithCache } from '@belopash/typeorm-store'
import { MappingContext } from '../interfaces'
import { TCMANAGER_ADDRESS } from '../config'
import { Log } from '../processor'
import * as tradingCompetitionManager from '../abi/tradingCompetitionManager'
import { CallCache } from '../utils/callCache'
import { CompetitionRules, MarketType, TimestampInfo, Prize, User, Token } from '../model'
import { createTradingCompetitionId } from '../utils/ids'
import { Item } from './common'

export function getTradingCompetitionManagerActions(ctx: MappingContext<StoreWithCache>, item: Item) {
    if (item.address !== TCMANAGER_ADDRESS) return

    switch (item.kind) {
        case 'log': {
            const log = item.value
            switch (log.topics[0]) {
                case tradingCompetitionManager.events.Create.topic: {
                    ctx.log.debug(`processing Trading Competition creation event...`)
                    handleCreate(ctx, log)

                    break
                }
            }
            break
        }
    }
}

function handleCreate(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = tradingCompetitionManager.events.Create.decode(log)
    const idCounter = event.idCounter

    const callCache = CallCache.get(ctx)
    const tcDeferred = callCache.defer(log.block, [
        tradingCompetitionManager.functions.idToTradingCompetition,
        TCMANAGER_ADDRESS,
        [idCounter],
    ])

    ctx.queue.lazy(async () => {
        const tc = await tcDeferred.get()
        const id = createTradingCompetitionId(Number(idCounter), tc.tradingCompetition.toLowerCase())

        const userDeferred = ctx.store.defer(User, tc.owner.toLowerCase())
        const user = await userDeferred.get();
        if (user == null) {
            ctx.queue.add('user_create', {
                userId: tc.owner.toLowerCase(),
                address: tc.owner.toLowerCase(),
            })
        }

        const tokenDeferred = ctx.store.defer(Token, tc.competitionRules.winning_token.toLowerCase())
        const token = await tokenDeferred.get();


        ctx.queue.add('tc_create', {
            id,
            entryFee: tc.entryFee,
            maxParticipants: tc.MAX_PARTICIPANTS,
            ownerId: tc.owner.toLowerCase(),
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
                hostContribution: tc.prize.host_contribution
            }),
            competitionRules: new CompetitionRules({
                startingBalance: tc.competitionRules.starting_balance,
                winningToken: tc.competitionRules.winning_token,
                tradingTokens: tc.competitionRules.tradingTokens,
                winningTokenDecimal: token ? token.decimals : 18
            }),
        })
    })
}
