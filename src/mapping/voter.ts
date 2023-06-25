import assert from 'assert'
import {DataHandlerContext} from '@subsquid/evm-processor'
import * as voterAbi from '../abi/voterV3'
import {Action, LazyAction} from '../action'
import {CreateBribeAction, UpdateStakeBribeAction} from '../action/bribe'
import {CreateGaugeAction} from '../action/gauge'
import {EnsureVoteAction, UpdateVoteAction} from '../action/vote'
import {VOTER} from '../config'
import {Bribe, Pool, VeToken, Vote} from '../model'
import {Log} from '../processor'
import {createVeTokenId, createVoteId} from '../utils/ids'
import {GaugeManager} from '../utils/manager/gaugeManager'
import {StoreWithCache} from '@belopash/squid-tools'
import {BribeManager} from '../utils/manager/bribeManager'

export function isVoterItem(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    return item.address === VOTER
}

export async function getVoterActions(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    const actions: Action[] = []

    switch (item.topics[0]) {
        case voterAbi.events.GaugeCreated.topic: {
            const event = voterAbi.events.GaugeCreated.decode(item)

            const gauge = event.gauge.toLowerCase()
            const externalBribe = event.external_bribe.toLowerCase()
            const internalBribe = event.internal_bribe.toLowerCase()
            const pool = event.pool.toLowerCase()

            actions.push(
                new CreateBribeAction(item.block, item.transaction!, {
                    address: externalBribe,
                    pool: ctx.store.defer(Pool, pool),
                }),
                new CreateBribeAction(item.block, item.transaction!, {
                    address: internalBribe,
                    pool: ctx.store.defer(Pool, pool),
                }),
                new CreateGaugeAction(item.block, item.transaction!, {
                    address: gauge,
                    externalBribe: ctx.store.defer(Bribe, externalBribe),
                    internalBribe: ctx.store.defer(Bribe, internalBribe),
                    pool: ctx.store.defer(Pool, pool),
                })
            )

            GaugeManager.get(ctx).addGauge(gauge)
            BribeManager.get(ctx).addBribe(externalBribe)
            BribeManager.get(ctx).addBribe(internalBribe)

            break
        }
        case voterAbi.events.Voted.topic: {
            const event = voterAbi.events.Voted.decode(item)

            const tokenId = createVeTokenId(event.tokenId)
            const value = event.weight

            const token = ctx.store.defer(VeToken, tokenId)
            actions.push(
                new LazyAction(item.block, item.transaction!, async (ctx) => {
                    const bribeUpdate = UpdateStakeBribeAction.getLast(ctx)
                    if (
                        bribeUpdate == null ||
                        bribeUpdate.transaction.hash != item.transaction?.hash ||
                        bribeUpdate.info.amount !== value ||
                        bribeUpdate.info.token !== tokenId
                    )
                        return []

                    // assert(bribeUpdate.info.amount === value)
                    // assert(bribeUpdate.info.token === tokenId)

                    const poolId = bribeUpdate.info.pool
                    const voteId = createVoteId(tokenId, poolId)

                    return [
                        new EnsureVoteAction(item.block, item.transaction!, {
                            vote: ctx.store.defer(Vote, voteId),
                            id: voteId,
                            token,
                            pool: ctx.store.defer(Pool, poolId),
                        }),
                        new UpdateVoteAction(item.block, item.transaction!, {
                            vote: ctx.store.defer(Vote, voteId),
                            value: event.weight,
                        }),
                    ]
                })
            )

            break
        }
        case voterAbi.events.Abstained.topic: {
            const event = voterAbi.events.Abstained.decode(item)

            const tokenId = createVeTokenId(event.tokenId)
            const value = -event.weight

            const token = ctx.store.defer(VeToken, tokenId)
            actions.push(
                new LazyAction(item.block, item.transaction!, async (ctx) => {
                    const bribeUpdate = UpdateStakeBribeAction.getLast(ctx)
                    if (
                        bribeUpdate == null ||
                        bribeUpdate.transaction.hash != item.transaction?.hash ||
                        bribeUpdate.info.amount !== value ||
                        bribeUpdate.info.token !== tokenId
                    )
                        return []

                    // assert(bribeUpdate.info.amount === value)
                    // assert(bribeUpdate.info.token === tokenId)

                    const poolId = bribeUpdate.info.pool
                    const voteId = createVoteId(tokenId, poolId)

                    return [
                        new EnsureVoteAction(item.block, item.transaction!, {
                            vote: ctx.store.defer(Vote, voteId),
                            id: voteId,
                            token,
                            pool: ctx.store.defer(Pool, poolId),
                        }),
                        new UpdateVoteAction(item.block, item.transaction!, {
                            vote: ctx.store.defer(Vote, voteId),
                            value,
                        }),
                    ]
                })
            )

            break
        }
    }

    return actions
}
