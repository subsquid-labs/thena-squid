import {StoreWithCache} from '@belopash/squid-tools'
import assert from 'assert'
import * as veTokenAbi from '../abi/votingEscrow'
import {VE_TOKEN, ZERO_ADDRESS} from '../config'
import {MappingContext} from '../interfaces'
import {User, VeToken} from '../model'
import {Log} from '../processor'
import {createVeTokenId} from '../utils/ids'

export function isVeTokenItem(ctx: MappingContext<StoreWithCache>, item: Log) {
    return item.address === VE_TOKEN
}

export function getVeTokenActions(ctx: MappingContext<StoreWithCache>, item: Log) {
    switch (item.topics[0]) {
        case veTokenAbi.events.Transfer.topic: {
            const event = veTokenAbi.events.Transfer.decode(item)

            const tokenId = createVeTokenId(event.tokenId)
            ctx.store.defer(VeToken, tokenId, {owner: true})

            const fromId = event.from.toLowerCase()
            const fromDeferred = ctx.store.defer(User, fromId)

            const toId = event.to.toLowerCase()
            const toDeferred = ctx.store.defer(User, toId)

            if (fromId === ZERO_ADDRESS) {
                ctx.queue
                    .lazy(async () => {
                        const from = await fromDeferred.get()
                        if (from == null) {
                            ctx.queue.add('user_create', {
                                userId: fromId,
                                address: ZERO_ADDRESS,
                            })
                        }
                    })
                    .add('veToken_create', {
                        tokenId,
                        index: Number(event.tokenId),
                        ownerId: fromId,
                    })
            }

            ctx.queue
                .lazy(async () => {
                    const owner = await toDeferred.get()
                    if (owner == null) {
                        ctx.queue.add('user_create', {
                            userId: toId,
                            address: toId,
                        })
                    }
                })
                .add('veToken_transfer', {
                    tokenId,
                    fromId,
                    toId,
                })

            break
        }
        case veTokenAbi.events.Deposit.topic: {
            const event = veTokenAbi.events.Deposit.decode(item)

            const tokenId = createVeTokenId(event.tokenId)
            ctx.store.defer(VeToken, tokenId)

            const amount = event.value
            const lockTime = new Date(Number(event.locktime) * 1000)

            ctx.queue
                .add('veToken_updateValue', {
                    tokenId,
                    amount,
                })
                .add('veToken_setLockTime', {
                    tokenId,
                    lockTime,
                })

            break
        }
        case veTokenAbi.events.Withdraw.topic: {
            const event = veTokenAbi.events.Withdraw.decode(item)

            const tokenId = createVeTokenId(event.tokenId)
            ctx.store.defer(VeToken, tokenId)

            const amount = -event.value

            ctx.queue.add('veToken_updateValue', {
                tokenId,
                amount,
            })

            break
        }
    }
}
