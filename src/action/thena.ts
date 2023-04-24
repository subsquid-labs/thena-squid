import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import * as thena from '../abi/bep20'
import {THENA_ADDRESS, ZERO_ADDRESS} from '../config'
import {ProcessorItem} from '../processor'
import {Action, ActionKind, UserActionDataType} from './types'

export function isThenaItem(item: ProcessorItem) {
    return item.address === THENA_ADDRESS
}

export function getThenaActions(ctx: BatchHandlerContext<unknown, unknown>, block: EvmBlock, item: ProcessorItem) {
    const actions: Action[] = []

    switch (item.kind) {
        case 'evmLog': {
            ctx.log.debug(`processing evm log...`)
            switch (item.evmLog.topics[0]) {
                case thena.events.Transfer.topic: {
                    ctx.log.debug(`processing Transfer event...`)
                    const event = thena.events.Transfer.decode(item.evmLog)

                    const amount = event.value.toBigInt()
                    const from = event.from.toLowerCase()
                    const to = event.to.toLowerCase()

                    if (from !== ZERO_ADDRESS) {
                        actions.push({
                            kind: ActionKind.User,
                            block,
                            transaction: item.transaction,
                            data: {
                                id: from,
                                type: UserActionDataType.Balance,
                                amount: -amount,
                            },
                        })
                    }

                    if (to !== ZERO_ADDRESS) {
                        actions.push({
                            kind: ActionKind.User,
                            block,
                            transaction: item.transaction,
                            data: {
                                id: to,
                                type: UserActionDataType.Balance,
                                amount,
                            },
                        })
                    }

                    break
                }
                case thena.events.Approval.topic: {
                    const event = thena.events.Approval.decode(item.evmLog)

                    actions.push({
                        kind: ActionKind.User,
                        block,
                        transaction: item.transaction,
                        data: {
                            id: event.owner,
                            type: UserActionDataType.Unknown,
                        },
                    })

                    actions.push({
                        kind: ActionKind.User,
                        block,
                        transaction: item.transaction,
                        data: {
                            id: event.spender,
                            type: UserActionDataType.Unknown,
                        },
                    })
                    break
                }
                default: {
                    ctx.log.error(`unknown event ${item.evmLog.topics[0]}`)
                }
            }
            break
        }
        case 'transaction': {
            if (item.transaction.from != null) {
                ctx.log.debug(`processing transaction...`)
                actions.push({
                    kind: ActionKind.User,
                    block,
                    transaction: item.transaction,
                    data: {
                        id: item.transaction.from,
                        type: UserActionDataType.Unknown,
                    },
                })
            }
            break
        }
    }

    return actions
}
