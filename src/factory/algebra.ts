import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import {get} from 'http'
import {ALGEBRA_FACTORY} from '../config'
import {ProcessorItem} from '../processor'
import * as algebraFactory from '../abi/algebraFactory'
import {PoolCreation} from './types'

export function isAlgebraItem(item: ProcessorItem) {
    return item.address === ALGEBRA_FACTORY
}

export async function getAlgebraPoolCreations(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem
) {
    const creations: PoolCreation[] = []

    switch (item.kind) {
        case 'evmLog': {
            ctx.log.debug(`processing evm log...`)
            switch (item.evmLog.topics[0]) {
                case algebraFactory.events.Pool.topic: {
                    ctx.log.debug(`processing Pool creation event...`)
                    const event = algebraFactory.events.Pool.decode(item.evmLog)

                    creations.push({
                        id: event.pool.toLowerCase(),
                        block,
                        transaction: item.transaction,
                        token0: event.token0.toLowerCase(),
                        token1: event.token1.toLowerCase(),
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

    return creations
}
