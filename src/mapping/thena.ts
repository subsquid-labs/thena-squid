import {DataHandlerContext} from '@subsquid/evm-processor'
import * as thena from '../abi/bep20'
import {THENA_ADDRESS, ZERO_ADDRESS} from '../config'
import {Log} from '../processor'
import {Action, ActionKind, BalanceUserAction, UnknownUserAction, UserActionType} from '../types/action'

export function isThenaItem(item: Log) {
    return item.address === THENA_ADDRESS
}

export function getThenaActions(ctx: DataHandlerContext<unknown>, item: Log) {
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
                    new BalanceUserAction(item.block, item.transaction!, {
                        id: from,
                        amount: -amount,
                    })
                )
            }

            if (to !== ZERO_ADDRESS) {
                actions.push(
                    new BalanceUserAction(item.block, item.transaction!, {
                        id: to,
                        amount,
                    })
                )
            }

            break
        }
        case thena.events.Approval.topic: {
            const event = thena.events.Approval.decode(item)

            actions.push(new UnknownUserAction(item.block, item.transaction!, {id: event.owner.toLowerCase()}))
            actions.push(new UnknownUserAction(item.block, item.transaction!, {id: event.spender.toLowerCase()}))
            break
        }
        default: {
            ctx.log.error(`unknown event ${item.topics[0]}`)
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
