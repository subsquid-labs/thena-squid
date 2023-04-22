import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import {get} from 'http'
import {ALGEBRA_FACTORY, SOLIDLY_FACTORY} from '../config'
import {ProcessorItem} from '../processor'
import * as solidlyFactory from '../abi/solidlyFactory'
import {PoolCreation} from './types'

export function isSolidlyItem(item: ProcessorItem) {
    return item.address === SOLIDLY_FACTORY
}

export async function getSolidlyPairCreations(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem
) {
    const creations: PoolCreation[] = []

    switch (item.kind) {
        case 'evmLog': {
            ctx.log.debug(`processing evm log...`)
            switch (item.evmLog.topics[0]) {
                case solidlyFactory.events.PairCreated.topic: {
                    ctx.log.debug(`processing Pair creation event...`)
                    const event = solidlyFactory.events.PairCreated.decode(item.evmLog)

                    creations.push({
                        id: event.pair.toLowerCase(),
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
