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

                if (log.block.timestamp > tc.timestamp.endTimestamp * 1000n) {
                    if (tcParticipant && !tcParticipant.isFetched) {
                        const claimableDeferred = callCache.defer(log.block, [
                            tradingCompetitionSpot.functions.claimable,
                            tc.tradingCompetitionSpot,
                            [userId],
                        ])

                        const claimable = await claimableDeferred.get();
                        ctx.queue.add('tcParticipant_update', {
                            id,
                            winAmount: claimable.amount
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
