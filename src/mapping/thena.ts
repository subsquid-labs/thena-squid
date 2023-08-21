import {StoreWithCache} from '@belopash/squid-tools'
import * as thena from '../abi/bep20'
import {Action} from '../action'
import {THENA_ADDRESS, ZERO_ADDRESS} from '../config'
import {MappingContext} from '../interfaces'
import {User} from '../model'
import {Log} from '../processor'

export function isThenaItem(item: Log) {
    return item.address === THENA_ADDRESS
}

export function getThenaActions(ctx: MappingContext<StoreWithCache>, item: Log) {
    switch (item.topics[0]) {
        case thena.events.Transfer.topic: {
            ctx.log.debug(`processing Transfer event...`)
            const event = thena.events.Transfer.decode(item)

            const amount = event.value

            const fromId = event.from.toLowerCase()
            const fromDefer = ctx.store.defer(User, fromId)

            if (fromId !== ZERO_ADDRESS) {
                ctx.queue
                    .lazy(async () => {
                        const user = await fromDefer.get()
                        if (user == null) {
                            ctx.queue.add('user_create', {
                                userId: fromId,
                                address: fromId,
                            })
                        }
                    })
                    .add('user_updateBalance', {
                        userId: fromId,
                        amount: -amount,
                    })
            }

            const toId = event.to.toLowerCase()
            const toDefer = ctx.store.defer(User, toId)

            if (toId !== ZERO_ADDRESS) {
                ctx.queue
                    .lazy(async () => {
                        const user = await toDefer.get()
                        if (user == null) {
                            ctx.queue.add('user_create', {
                                userId: toId,
                                address: toId,
                            })
                        }
                    })
                    .add('user_updateBalance', {
                        userId: toId,
                        amount,
                    })
            }

            break
        }
        case thena.events.Approval.topic: {
            const event = thena.events.Approval.decode(item)

            const ownerId = event.owner.toLowerCase()
            const ownerDefer = ctx.store.defer(User, ownerId)

            ctx.queue.lazy(async () => {
                const owner = await ownerDefer.get()
                if (owner == null) {
                    ctx.queue.add('user_create', {
                        userId: ownerId,
                        address: ownerId,
                    })
                }
            })

            const spenderId = event.spender.toLowerCase()
            const spenderDefer = ctx.store.defer(User, spenderId)

            ctx.queue.lazy(async () => {
                const spender = await spenderDefer.get()
                if (spender == null) {
                    ctx.queue.add('user_create', {
                        userId: spenderId,
                        address: spenderId,
                    })
                }
            })

            break
        }
    }
}
