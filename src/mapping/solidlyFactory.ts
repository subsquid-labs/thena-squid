import {DataHandlerContext} from '@subsquid/evm-processor'
import {SOLIDLY_FACTORY} from '../config'
import {Log} from '../processor'
import * as solidlyFactory from '../abi/solidlyFactory'
import * as bep20 from '../abi/bep20'
import {Action, CreatePoolAction, InitTokenAction} from '../types/action'
import {PoolManager} from '../utils/pairManager'
import {DeferredCall, WrappedValue} from '../utils/deferred'
import {PoolType} from '../model'

export function isSolidlyFactoryItem(item: Log) {
    return item.address === SOLIDLY_FACTORY
}

export function getSolidlyFactoryActions(ctx: DataHandlerContext<unknown>, item: Log) {
    const actions: Action[] = []

    // switch (item.kind) {
    //     case 'evmLog': {
    //         ctx.log.debug(`processing evm log...`)
    switch (item.topics[0]) {
        case solidlyFactory.events.PairCreated.topic: {
            ctx.log.debug(`processing Pair creation event...`)
            const event = solidlyFactory.events.PairCreated.decode(item)

            const id = event.pair.toLowerCase()
            const token0 = event.token0.toLowerCase()
            const token1 = event.token1.toLowerCase()

            actions.push(
                new InitTokenAction(item.block, item.transaction!, {
                    id: token0,
                    decimals: new DeferredCall(item.block, {
                        address: token0,
                        func: bep20.functions.decimals,
                        args: [],
                    }),
                    symbol: new DeferredCall(item.block, {
                        address: token0,
                        func: bep20.functions.symbol,
                        args: [],
                    }),
                })
            )
            actions.push(
                new InitTokenAction(item.block, item.transaction!, {
                    id: token1,
                    decimals: new DeferredCall(item.block, {
                        address: token1,
                        func: bep20.functions.decimals,
                        args: [],
                    }),
                    symbol: new DeferredCall(item.block, {
                        address: token1,
                        func: bep20.functions.symbol,
                        args: [],
                    }),
                })
            )

            actions.push(
                new CreatePoolAction(item.block, item.transaction!, {
                    id,
                    token0: new WrappedValue(token0),
                    token1: new WrappedValue(token1),
                    stable: event.stable,
                    factory: SOLIDLY_FACTORY,
                    type: PoolType.Solidly,
                })
            )

            PoolManager.instance.addPool(item.address, id, {token0, token1})

            break
        }
        default: {
            ctx.log.error(`unknown event ${item.topics[0]}`)
        }
    }
    // break
    //     }
    // }

    return actions
}
