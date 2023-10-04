import { StoreWithCache } from '@belopash/typeorm-store'
import { MappingContext } from '../interfaces'
import { Log } from '../processor'
import * as tradingCompetitionSpot from '../abi/tradingCompetitionSpot'
import { CallCache } from '../utils/callCache'
import { User, TradingCompetition, TCParticipant } from '../model'
import { createTCParticipantId } from '../utils/ids'

export function getTCParticipantActions(ctx: MappingContext<StoreWithCache>, log: Log) {
    ctx.log.debug(`getting trading competition participants...`)

    const callCache = CallCache.get(ctx)

    ctx.queue.lazy(async () => {
        const tradingCompetitions = await ctx.store.find(TradingCompetition, {})
        for (let tc of tradingCompetitions) {

            const participantsDeferred = callCache.defer(log.block, [
                tradingCompetitionSpot.functions.users,
                tc.tradingCompetitionSpot,
                [],
            ])

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

                        const startBalance = await startBalanceDeferred.get();
                        ctx.queue.add('tcParticipant_update', {
                            id,
                            startBalance: startBalance[0],
                            pnl: 0n,
                            winAmount: 0n,
                        })
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

                        const pnl = await pnlDeferred.get();
                        const claimable = await claimableDeferred.get();

                        ctx.queue.add('tcParticipant_update', {
                            id,
                            startBalance: 0n,
                            pnl: pnl,
                            winAmount: claimable.amount,
                        })
                    }
                }
            }

            ctx.queue.add('tc_update_participantCount', {
                id: tc.id,
                count: participants.length
            })

        }
    })
}
