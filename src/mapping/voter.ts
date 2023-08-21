import {StoreWithCache} from '@belopash/squid-tools'
import * as voterAbi from '../abi/voterV3'
import {Action} from '../action'
import {UpdateStakeBribeAction} from '../action/bribe'
import {VOTER} from '../config'
import {MappingContext} from '../interfaces'
import {Pool, VeToken, Vote} from '../model'
import {Log} from '../processor'
import {createVeTokenId, createVoteId} from '../utils/ids'
import {BribeManager} from '../utils/manager/bribeManager'
import {GaugeManager} from '../utils/manager/gaugeManager'

export function isVoterItem(ctx: MappingContext<StoreWithCache>, item: Log) {
    return item.address === VOTER
}

export function getVoterActions(ctx: MappingContext<StoreWithCache>, item: Log) {
    switch (item.topics[0]) {
        case voterAbi.events.GaugeCreated.topic: {
            const event = voterAbi.events.GaugeCreated.decode(item)

            const gaugeId = event.gauge.toLowerCase()
            const externalBribeId = event.external_bribe.toLowerCase()
            const internalBribeId = event.internal_bribe.toLowerCase()
            const poolId = event.pool.toLowerCase()

            ctx.queue
                .add('bribe_create', {
                    bribeId: internalBribeId,
                    address: internalBribeId,
                    poolId,
                })
                .add('bribe_create', {
                    bribeId: externalBribeId,
                    address: externalBribeId,
                    poolId,
                })
                .add('gauge_create', {
                    gaugeId,
                    address: gaugeId,
                    poolId,
                    internalBribeId,
                    externalBribeId,
                })

            GaugeManager.get(ctx).addGauge(gaugeId)
            BribeManager.get(ctx).addBribe(externalBribeId)
            BribeManager.get(ctx).addBribe(internalBribeId)

            break
        }
        case voterAbi.events.Voted.topic: {
            const event = voterAbi.events.Voted.decode(item)

            const tokenId = createVeTokenId(event.tokenId)
            ctx.store.defer(VeToken, tokenId)

            const value = event.weight

            ctx.queue.lazy(async () => {
                const bribeUpdate = UpdateStakeBribeAction.getLast(ctx)
                if (
                    bribeUpdate == null ||
                    bribeUpdate.transaction.hash != item.transaction?.hash ||
                    bribeUpdate.data.amount !== value ||
                    bribeUpdate.data.tokenId !== tokenId ||
                    bribeUpdate.data.poolId == null
                )
                    return

                // assert(bribeUpdate.info.amount === value)
                // assert(bribeUpdate.info.token === tokenId)

                const poolId = bribeUpdate.data.poolId
                ctx.store.defer(Pool, poolId)

                const voteId = createVoteId(tokenId, poolId)
                const voteDeferred = ctx.store.defer(Vote, voteId)

                ctx.queue
                    .lazy(async () => {
                        const vote = await voteDeferred.get()
                        if (vote == null) {
                            ctx.queue.add('vote_create', {
                                poolId,
                                tokenId,
                                voteId,
                            })
                        }
                    })
                    .add('vote_updateWeigth', {
                        voteId,
                        value,
                    })
            })

            break
        }
        case voterAbi.events.Abstained.topic: {
            const event = voterAbi.events.Abstained.decode(item)

            const tokenId = createVeTokenId(event.tokenId)
            ctx.store.defer(VeToken, tokenId)

            const value = -event.weight

            ctx.queue.lazy(async () => {
                const bribeUpdate = UpdateStakeBribeAction.getLast(ctx)
                if (
                    bribeUpdate == null ||
                    bribeUpdate.transaction.hash != item.transaction?.hash ||
                    bribeUpdate.data.amount !== value ||
                    bribeUpdate.data.tokenId !== tokenId ||
                    bribeUpdate.data.poolId == null
                )
                    return

                // assert(bribeUpdate.info.amount === value)
                // assert(bribeUpdate.info.token === tokenId)

                const poolId = bribeUpdate.data.poolId
                ctx.store.defer(Pool, poolId)

                const voteId = createVoteId(tokenId, poolId)
                const voteDeferred = ctx.store.defer(Vote, voteId)

                ctx.queue
                    .lazy(async () => {
                        const vote = await voteDeferred.get()
                        if (vote == null) {
                            ctx.queue.add('vote_create', {
                                poolId,
                                tokenId,
                                voteId,
                            })
                        }
                    })
                    .add('vote_updateWeigth', {
                        voteId,
                        value,
                    })
            })

            break
        }
    }
}
