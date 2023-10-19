import { StoreWithCache } from '@belopash/typeorm-store'
import { HttpAgent, HttpClient } from '@subsquid/http-client'
import { MappingContext } from '../interfaces'
import { Log } from '../processor'
import * as tradingCompetitionSpot from '../abi/tradingCompetitionSpot'
import * as tradingCompetitionManager from '../abi/tradingCompetitionManager'
import { CallCache } from '../utils/callCache'
import { User, TradingCompetition, TCParticipant } from '../model'
import { createTCParticipantId } from '../utils/ids'
import { TCMANAGER_ADDRESS, TOKEN_PRICE_API } from '../config'

const client = new HttpClient({
    headers: { 'Content-Type': 'application/json' },
    retryAttempts: 5,
    agent: new HttpAgent({
        keepAlive: true,
    }),
})

export function getTCParticipantActions(ctx: MappingContext<StoreWithCache>, log: Log) {
    ctx.log.debug(`getting trading competition participants...`)

    const callCache = CallCache.get(ctx)

    const startBalanceDeferredArray:any = []
    const pnlDeferredArray:any = []
    const claimableDeferredArray:any = []
    const tcDeferredArray:any = []

    ctx.queue.lazy(async () => {
        const tradingCompetitions = await ctx.store.find(TradingCompetition, {})
        for (let tc of tradingCompetitions) {

            const participantsDeferred = callCache.defer(log.block, [
                tradingCompetitionSpot.functions.users,
                tc.tradingCompetitionSpot,
                [],
            ])

            let winTokenPriceInUSD = 0
            let winTokenDecimal = 0
            try {
                const res = await client.get(`${TOKEN_PRICE_API}/${tc.competitionRules.winningToken}`)
                winTokenPriceInUSD = res?.data?.price || 0
                winTokenDecimal = res?.data?.decimals || 0
            } catch (error) {

            }

            const participants = await participantsDeferred.get()

            for (let participant of participants) {
                const userId = participant.toLowerCase()
                const id = createTCParticipantId(tc.id, userId)

                const tcParticipantDeferred = ctx.store.defer(TCParticipant, id)
                const tcParticipant = await tcParticipantDeferred.get();

                if (tcParticipant == null) {
                    const userDeferred = ctx.store.defer(User, userId)
                    const user = await userDeferred.get();
                    if (user == null) {
                        ctx.queue.add('user_create', {
                            userId,
                            address: userId,
                        })
                    }

                    ctx.queue.add('tcParticipant_create', {
                        id,
                        userId,
                        tcId: tc.id,
                    })
                }

                if (log.block.timestamp >= tc.timestamp.registrationStart * 1000n && log.block.timestamp <= (tc.timestamp.startTimestamp + 360n) * 1000n) {
                    if (tcParticipant) {
                        const startBalanceDeferred = callCache.defer(log.block, [
                            tradingCompetitionSpot.functions.user,
                            tc.tradingCompetitionSpot,
                            [userId],
                        ])

                        startBalanceDeferredArray.push({
                            id,
                            deferred: startBalanceDeferred
                        })

                        // const startBalance = await startBalanceDeferred.get();
                        // ctx.queue.add('tcParticipant_update', {
                        //     id,
                        //     startBalance: startBalance[0],
                        //     pnl: 0n,
                        //     winAmount: 0n,
                        //     winTokenPriceInUSD: 0,
                        //     winTokenDecimal: 0
                        // })
                    }
                }

                if (log.block.timestamp >= tc.timestamp.startTimestamp * 1000n && log.block.timestamp <= (tc.timestamp.endTimestamp + 360n) * 1000n) {
                    if (tcParticipant) {
                        const pnlDeferred = callCache.defer(log.block, [
                            tradingCompetitionSpot.functions.getPNLOf,
                            tc.tradingCompetitionSpot,
                            [userId],
                        ])
                        const claimableDeferred = callCache.defer(log.block, [
                            tradingCompetitionSpot.functions.claimable,
                            tc.tradingCompetitionSpot,
                            [userId],
                        ])

                        pnlDeferredArray.push({
                            id,
                            deferred: pnlDeferred,
                            winTokenPriceInUSD,
                            winTokenDecimal
                        })

                        claimableDeferredArray.push({
                            id,
                            deferred: claimableDeferred
                        })

                        // const pnl = await pnlDeferred.get();
                        // const claimable = await claimableDeferred.get();

                        // ctx.queue.add('tcParticipant_update', {
                        //     id,
                        //     startBalance: 0n,
                        //     pnl: pnl,
                        //     winAmount: claimable.amount,
                        //     winTokenPriceInUSD,
                        //     winTokenDecimal
                        // })
                    }
                }
            }

            if (log.block.timestamp >= tc.timestamp.registrationStart * 1000n && log.block.timestamp <= (tc.timestamp.endTimestamp + 360n) * 1000n) {
                const tcId = BigInt(tc.id.split('-')[1]);
                const tcDeferred = callCache.defer(log.block, [
                    tradingCompetitionManager.functions.idToTradingCompetition,
                    TCMANAGER_ADDRESS,
                    [tcId],
                ])
                tcDeferredArray.push({
                    id: tc.id,
                    count: participants.length,
                    deferred: tcDeferred
                })
                // const tcData = await tcDeferred.get()
                // ctx.queue.add('tc_update_Info', {
                //     id: tc.id,
                //     count: participants.length,
                //     totalPrize: tcData.prize.totalPrize
                // })
            }
        }
    }).lazy(async () => {
        startBalanceDeferredArray.map(async (item: any) => {
            const startBalance = await item.deferred.get();
            ctx.queue.add('tcParticipant_update', {
                id: item.id,
                startBalance: startBalance[0],
                pnl: 0n,
                winAmount: 0n,
                winTokenPriceInUSD: 0,
                winTokenDecimal: 0
            })
        })

        pnlDeferredArray.map(async (item: any, index: number) => {
            const pnl = await item.deferred.get();
            const claimable = await claimableDeferredArray[index].deferred.get();
            ctx.queue.add('tcParticipant_update', {
                id: item.id,
                startBalance: 0n,
                pnl: pnl,
                winAmount: claimable.amount,
                winTokenPriceInUSD: item.winTokenPriceInUSD,
                winTokenDecimal: item.winTokenDecimal
            })
        })

        tcDeferredArray.map(async (item: any) => {
            const tcData = await item.deferred.get();
            ctx.queue.add('tc_update_Info', {
                id: item.id,
                count: item.count,
                totalPrize: tcData.prize.totalPrize
            })
        })
    })
}
