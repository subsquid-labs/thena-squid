import {DataHandlerContext} from '@subsquid/evm-processor'
import * as thena from '../abi/bep20'
import {THENA_ADDRESS, ZERO_ADDRESS} from '../config'
import {Log} from '../processor'
import {Action, BalanceUserAction, EnsureUserAction} from '../action'
import {StoreWithCache} from '@belopash/squid-tools'
import {User} from '../model'
import {ContractChecker} from '../utils/contractChecker'

export function isThenaItem(item: Log) {
    return item.address === THENA_ADDRESS
}

export function getThenaActions(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    const actions: Action[] = []

    // switch (item.kind) {
    //     case 'evmLog': {
    ctx.log.debug(`processing evm log...`)
    switch (item.topics[0]) {
        case thena.events.Transfer.topic: {
            ctx.log.debug(`processing Transfer event...`)
            const event = thena.events.Transfer.decode(item)

            const amount = event.value
            const from = event.from.toLowerCase()
            const to = event.to.toLowerCase()

            if (from !== ZERO_ADDRESS) {
                actions.push(
                    new EnsureUserAction(item.block, item.transaction!, {
                        user: ctx.store.defer(User, from),
                        address: from,
                        isContract: ContractChecker.get(ctx).defer(from),
                    }),
                    new BalanceUserAction(item.block, item.transaction!, {
                        user: ctx.store.defer(User, from),
                        amount: -amount,
                    })
                )
            }

            if (to !== ZERO_ADDRESS) {
                actions.push(
                    new EnsureUserAction(item.block, item.transaction!, {
                        user: ctx.store.defer(User, to),
                        address: to,
                        isContract: ContractChecker.get(ctx).defer(to),
                    }),
                    new BalanceUserAction(item.block, item.transaction!, {
                        user: ctx.store.defer(User, to),
                        amount,
                    })
                )
            }

            break
        }
        case thena.events.Approval.topic: {
            const event = thena.events.Approval.decode(item)

            let owner = event.owner.toLowerCase()
            let spender = event.spender.toLowerCase()

            actions.push(
                new EnsureUserAction(item.block, item.transaction!, {
                    user: ctx.store.defer(User, owner),
                    address: owner,
                    isContract: ContractChecker.get(ctx).defer(owner),
                }),
                new EnsureUserAction(item.block, item.transaction!, {
                    user: ctx.store.defer(User, spender),
                    address: spender,
                    isContract: ContractChecker.get(ctx).defer(spender),
                })
            )
            break
        }
    }
    // break
    // }
    //     case 'transaction': {
    //         if (item.transaction.from != null) {
    //             ctx.log.debug(`processing transaction...`)
    //             actions.push(new UnknownUserAction(block, item.transaction, {id: item.transaction.from}))
    //         }
    //         break
    //     }
    // }

    return actions
}
