import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import {ALGEBRA_FACTORY} from '../config'
import {ProcessorItem} from '../processor'
import * as algebraFactory from '../abi/algebraFactory'
import {Action, ActionKind, PoolActionDataType, UserActionDataType} from './types'

export function isAlgebraItem(item: ProcessorItem) {
    return item.address === ALGEBRA_FACTORY
}

export async function getAlgebraFactoryActions(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem
) {
    const actions: Action[] = []

    switch (item.kind) {
        case 'evmLog': {
            ctx.log.debug(`processing evm log...`)
            switch (item.evmLog.topics[0]) {
                case algebraFactory.events.Pool.topic: {
                    ctx.log.debug(`processing Pool creation event...`)
                    const event = algebraFactory.events.Pool.decode(item.evmLog)

                    actions.push({
                        kind: ActionKind.Pool,
                        block,
                        transaction: item.transaction,
                        data: {
                            id: event.pool.toLowerCase(),
                            type: PoolActionDataType.Creation,
                            token0: event.token0.toLowerCase(),
                            token1: event.token1.toLowerCase(),
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
    }

    return actions
}
