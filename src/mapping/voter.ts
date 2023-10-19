import {StoreWithCache} from '@belopash/typeorm-store'
import * as voterAbi from '../abi/voterV3'
import {UpdateStakeBribeAction} from '../action/bribe'
import {VOTER} from '../config'
import {MappingContext} from '../interfaces'
import {Pool, VeToken, Vote} from '../model'
import {Log} from '../processor'
import {createVeTokenId, createVoteId} from '../utils/ids'
import {BribeManager} from '../utils/manager/bribeManager'
import {GaugeManager} from '../utils/manager/gaugeManager'
import {Item} from './common'

export function getVoterActions(ctx: MappingContext<StoreWithCache>, item: Item) {
    if (item.address !== VOTER) return

    switch (item.kind) {
        case 'log': {
            const log = item.value
            switch (log.topics[0]) {
                case voterAbi.events.GaugeCreated.topic:
                    handleGaugeCreated(ctx, log)
                    break

                case voterAbi.events.Voted.topic:
                    handleVoted(ctx, log)
                    break

                case voterAbi.events.Abstained.topic:
                    handleAbstained(ctx, log)
                    break
            }
            break
        }
    }
}

function handleGaugeCreated(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = voterAbi.events.GaugeCreated.decode(log)

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
}

function handleVoted(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = voterAbi.events.Voted.decode(log)

    const tokenId = createVeTokenId(event.tokenId)
    ctx.store.defer(VeToken, tokenId)

    const value = event.weight

    ctx.queue.lazy(async () => {
        const bribeUpdate = UpdateStakeBribeAction.getLast(ctx)
        if (
            bribeUpdate == null ||
            bribeUpdate.transaction?.hash != log.transaction?.hash ||
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
}

function handleAbstained(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = voterAbi.events.Abstained.decode(log)

    const tokenId = createVeTokenId(event.tokenId)
    ctx.store.defer(VeToken, tokenId)

    const value = -event.weight

    ctx.queue.lazy(async () => {
        const bribeUpdate = UpdateStakeBribeAction.getLast(ctx)
        if (
            bribeUpdate == null ||
            bribeUpdate.transaction?.hash != log.transaction?.hash ||
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
}
