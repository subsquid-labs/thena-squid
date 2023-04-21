import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import * as thena from '../abi/bep20'
import {THENA_ADDRESS, ZERO_ADDRESS} from '../config'
import {ProcessorItem} from '../processor'
import {Interaction, InteractionType} from './types'

export function isThenaItem(item: ProcessorItem) {
    return item.address === THENA_ADDRESS
}

export async function getThenaInteractions(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem
): Promise<Interaction[]> {
    const interactions: Interaction[] = []

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
                        interactions.push({
                            id: from,
                            type: InteractionType.Balance,
                            block,
                            transaction: item.transaction,
                            amount: -amount,
                        })
                    }

                    if (to !== ZERO_ADDRESS) {
                        interactions.push({
                            id: to,
                            type: InteractionType.Balance,
                            block,
                            transaction: item.transaction,
                            amount,
                        })
                    }

                    break
                }
                // case thena.events.Approval.topic: {
                //     const e = thena.events.Approval.decode(item.evmLog)

                //     interaction = {
                //         id: e.spender.toLowerCase(),
                //         type: InteractionType.Unknown,
                //         block,
                //         transaction: item.transaction,
                //     }

                //     interactions.push({
                //         id: e.owner.toLowerCase(),
                //         type: InteractionType.Unknown,
                //         block,
                //         transaction: item.transaction,
                //     })
                //     break
                // }
            }
            break
        }
        case 'transaction': {
            if (item.transaction.from != null) {
                ctx.log.debug(`processing transaction...`)
                interactions.push({
                    id: item.transaction.from,
                    type: InteractionType.Unknown,
                    block,
                    transaction: item.transaction,
                })
            }
            break
        }
    }

    return interactions
}
