import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import {ALGEBRA_FACTORY} from '../config'
import {ProcessorItem} from '../processor'
import * as algebraFactory from '../abi/algebraFactory'
import {Action, ActionKind, PoolActionDataType, UserActionDataType} from './types'
import {PoolManager} from '../utils/pairManager'

export function isAlgebraFactoryItem(item: ProcessorItem) {
    return item.address === ALGEBRA_FACTORY
}

export function getAlgebraFactoryActions(
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

                    const pool = event.pool.toLowerCase()

                    actions.push({
                        kind: ActionKind.Pool,
                        block,
                        transaction: item.transaction,
                        data: {
                            id: pool,
                            type: PoolActionDataType.Creation,
                            token0: event.token0.toLowerCase(),
                            token1: event.token1.toLowerCase(),
                            factory: ALGEBRA_FACTORY,
                        },
                    })

                    PoolManager.instance.addPool(item.address, pool)

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
