import {StoreWithCache} from '@belopash/typeorm-store'
import * as rebaseDistributor from '../abi/rebaseDistributor'
import {REBASE_DISTRIBUTOR} from '../config'
import {MappingContext} from '../interfaces'
import {VeToken} from '../model'
import {Log} from '../processor'
import {createVeTokenId} from '../utils/ids'
import {Item} from './common'

export function getRebaseDistributorActions(ctx: MappingContext<StoreWithCache>, item: Item) {
    if (item.address !== REBASE_DISTRIBUTOR) return

    switch (item.kind) {
        case 'log': {
            const log = item.value
            switch (log.topics[0]) {
                case rebaseDistributor.events.Claimed.topic:
                    handleClaimed(ctx, log)
                    break
            }
            break
        }
    }
}

function handleClaimed(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = rebaseDistributor.events.Claimed.decode(log)

    const tokenId = createVeTokenId(event.tokenId)
    ctx.store.defer(VeToken, tokenId)

    const amount = event.amount

    ctx.queue.add('veToken_reward', {
        tokenId,
        amount,
    })
}
