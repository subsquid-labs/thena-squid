import { StoreWithCache } from '@belopash/typeorm-store'
import * as usernameNftAbi from '../abi/usernameNft'
import { USERNAME_NFT_ADDRESS, ZERO_ADDRESS } from '../config'
import { MappingContext } from '../interfaces'
import { Attribute, UsernameNft, User } from '../model'
import { Log } from '../processor'
import { CallCache } from '../utils/callCache'
import { createUsernameNftId } from '../utils/ids'
import { Item } from './common'

export function getUsernameNftActions(ctx: MappingContext<StoreWithCache>, item: Item) {
    if (item.address !== USERNAME_NFT_ADDRESS) return

    switch (item.kind) {
        case 'log': {
            const log = item.value
            switch (log.topics[0]) {
                case usernameNftAbi.events.Transfer.topic:
                    transferHandler(ctx, log)
                    break
            }
            break
        }
    }
}

function transferHandler(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = usernameNftAbi.events.Transfer.decode(log)

    const index = event.tokenId
    const tokenId = createUsernameNftId(index)

    const fromId = event.from.toLowerCase()
    const fromUserDeferred = ctx.store.defer(User, fromId)

    const toId = event.to.toLowerCase()
    const toUserDeferred = ctx.store.defer(User, toId)

    if (fromId === ZERO_ADDRESS) {
        const callCache = CallCache.get(ctx)
        const nameDeferred = callCache.defer(log.block, [usernameNftAbi.functions.usernames, USERNAME_NFT_ADDRESS, [index]])

        ctx.queue
        .lazy(async () => {
            const from = await fromUserDeferred.get()
            if (from == null) {
                ctx.queue.add('user_create', {
                    userId: fromId,
                    address: ZERO_ADDRESS,
                })
            }
        })
        .lazy(async () => {
            const owner = await toUserDeferred.get()
            if (owner == null) {
                ctx.queue.add('user_create', {
                    userId: toId,
                    address: toId,
                })
            }
        })
        .lazy(async () => {
            const name = await nameDeferred.get();
            ctx.queue.add('usernameNft_create', {
                tokenId,
                index,
                name,
                ownerId: toId,
            })
        })
        
    } else {
        ctx.queue
        .lazy(async () => {
            const owner = await toUserDeferred.get()
            if (owner == null) {
                ctx.queue.add('user_create', {
                    userId: toId,
                    address: toId,
                })
            }
        })
        .add('usernameNft_updateOwner', {
            tokenId,
            fromId,
            toId,
        })
    }
}
