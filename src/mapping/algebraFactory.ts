import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import {ALGEBRA_FACTORY} from '../config'
import {ProcessorItem} from '../processor'
import * as algebraFactory from '../abi/algebraFactory'
import {Action, CreatePoolAction} from '../types/action'
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

                    const id = event.pool.toLowerCase()
                    const token0 = event.token0.toLowerCase()
                    const token1 = event.token1.toLowerCase()

                    actions.push(
                        new CreatePoolAction(block, item.transaction, {
                            id,
                            token0,
                            token1,
                            factory: ALGEBRA_FACTORY,
                        })
                    )

                    PoolManager.instance.addPool(item.address, id, {token0, token1})

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
