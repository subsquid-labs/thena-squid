import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import {SOLIDLY_FACTORY} from '../config'
import {ProcessorItem} from '../processor'
import * as solidlyFactory from '../abi/solidlyFactory'
import * as bep20 from '../abi/bep20'
import {Action, CreatePoolAction, InitTokenAction} from '../types/action'
import {PoolManager} from '../utils/pairManager'
import {DeferredCall} from '../utils/deferred'

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

                    const id = event.pair.toLowerCase()
                    const token0 = event.token0.toLowerCase()
                    const token1 = event.token1.toLowerCase()

                    actions.push(
                        new InitTokenAction(block, item.transaction, {
                            id: token0,
                            decimals: new DeferredCall(block, token0, bep20.functions.decimals),
                            symbol: new DeferredCall(block, token0, bep20.functions.symbol),
                        })
                    )
                    actions.push(
                        new InitTokenAction(block, item.transaction, {
                            id: token1,
                            decimals: new DeferredCall(block, token1, bep20.functions.decimals),
                            symbol: new DeferredCall(block, token1, bep20.functions.symbol),
                        })
                    )

                    actions.push(
                        new CreatePoolAction(block, item.transaction, {
                            id,
                            token0,
                            token1,
                            stable: event.stable,
                            factory: SOLIDLY_FACTORY,
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
