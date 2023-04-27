import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import {SOLIDLY_FACTORY} from '../config'
import {ProcessorItem} from '../processor'
import * as solidlyFactory from '../abi/solidlyFactory'
import {Action, CreatePoolAction} from './types'
import {PoolManager} from '../utils/pairManager'

export function isSolidlyFactoryItem(item: ProcessorItem) {
    return item.address === SOLIDLY_FACTORY
}

export function getSolidlyFactoryActions(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem
) {
    const actions: Action[] = []

    switch (item.kind) {
        case 'evmLog': {
            ctx.log.debug(`processing evm log...`)
            switch (item.evmLog.topics[0]) {
                case solidlyFactory.events.PairCreated.topic: {
                    ctx.log.debug(`processing Pair creation event...`)
                    const event = solidlyFactory.events.PairCreated.decode(item.evmLog)

                    const pool = event.pair.toLowerCase()

                    actions.push(
                        new CreatePoolAction(block, item.transaction, {
                            id: pool,
                            token0: event.token0.toLowerCase(),
                            token1: event.token1.toLowerCase(),
                            factory: SOLIDLY_FACTORY,
                        })
                    )

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
