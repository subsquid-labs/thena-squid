import {StoreWithCache} from '@belopash/typeorm-store'
import * as rebaseDistributor from '../abi/rebaseDistributor'
import {REBASE_DISTRIBUTOR} from '../config'
import {MappingContext} from '../interfaces'
import {VeToken} from '../model'
import {Log} from '../processor'
import {createVeTokenId} from '../utils/ids'

export function isRebaseDistributorItem(ctx: MappingContext<StoreWithCache>, item: Log) {
    return item.address === REBASE_DISTRIBUTOR
}

export function getRebaseDistributorActions(ctx: MappingContext<StoreWithCache>, item: Log) {
    switch (item.topics[0]) {
        case rebaseDistributor.events.Claimed.topic: {
            const event = rebaseDistributor.events.Claimed.decode(item)

            const tokenId = createVeTokenId(event.tokenId)
            ctx.store.defer(VeToken, tokenId)

            const amount = event.amount

            ctx.queue.add('veToken_reward', {
                tokenId,
                amount,
            })

            break
        }
    }
}
