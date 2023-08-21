import {StoreWithCache} from '@belopash/squid-tools'
import * as bribeAbi from '../abi/bribe'
import {MappingContext} from '../interfaces'
import {Bribe, Token} from '../model'
import {Log} from '../processor'
import {createVeTokenId} from '../utils/ids'
import {BribeManager} from '../utils/manager/bribeManager'

export function isBribeItem(ctx: MappingContext<StoreWithCache>, item: Log) {
    return BribeManager.get(ctx).isBribe(item.address)
}

export function getBribeActions(ctx: MappingContext<StoreWithCache>, item: Log) {
    switch (item.topics[0]) {
        case bribeAbi.events.Staked.topic: {
            const event = bribeAbi.events.Staked.decode(item)

            const bribeId = item.address
            const bribeDeferred = ctx.store.defer(Bribe, bribeId)

            const tokenId = createVeTokenId(event.tokenId)
            ctx.store.defer(Token, tokenId)

            const amount = event.amount

            ctx.queue.lazy(async () => {
                const bribe = await bribeDeferred.getOrFail()

                ctx.queue.add('bribe_updateStake', {
                    bribeId,
                    tokenId,
                    poolId: bribe.pool?.id,
                    amount,
                })
            })

            break
        }
        case bribeAbi.events.Withdrawn.topic: {
            const event = bribeAbi.events.Withdrawn.decode(item)

            const bribeId = item.address
            const bribeDeferred = ctx.store.defer(Bribe, bribeId)

            const tokenId = createVeTokenId(event.tokenId)
            ctx.store.defer(Token, tokenId)

            const amount = -event.amount

            ctx.queue.lazy(async () => {
                const bribe = await bribeDeferred.getOrFail()

                ctx.queue.add('bribe_updateStake', {
                    bribeId,
                    tokenId,
                    poolId: bribe.pool?.id,
                    amount,
                })
            })

            break
        }
    }
}
