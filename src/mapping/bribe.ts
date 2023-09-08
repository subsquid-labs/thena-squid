import {StoreWithCache} from '@belopash/typeorm-store'
import * as bribeAbi from '../abi/bribe'
import {MappingContext} from '../interfaces'
import {Bribe, Token} from '../model'
import {Log} from '../processor'
import {createVeTokenId} from '../utils/ids'
import {BribeManager} from '../utils/manager/bribeManager'
import {Item} from './common'

export function getBribeActions(ctx: MappingContext<StoreWithCache>, item: Item) {
    if (item.address == null || !BribeManager.get(ctx).isBribe(item.address)) return

    switch (item.kind) {
        case 'log': {
            const log = item.value
            switch (log.topics[0]) {
                case bribeAbi.events.Staked.topic:
                    handleStaked(ctx, log)
                    break

                case bribeAbi.events.Withdrawn.topic:
                    handleWithdrawn(ctx, log)
                    break
            }
            break
        }
    }
}

function handleStaked(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = bribeAbi.events.Staked.decode(log)

    const bribeId = log.address
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
}

function handleWithdrawn(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = bribeAbi.events.Withdrawn.decode(log)

    const bribeId = log.address
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
}
