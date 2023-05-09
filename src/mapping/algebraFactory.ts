import {DataHandlerContext} from '@subsquid/evm-processor'
import {ALGEBRA_FACTORY} from '../config'
import {Log} from '../processor'
import * as algebraFactory from '../abi/algebraFactory'
import * as bep20 from '../abi/bep20'
import {Action, CreatePoolAction, InitTokenAction, PoolActionType} from '../types/action'
import {PoolManager} from '../utils/pairManager'
import {DeferredCall, WrappedValue} from '../utils/deferred'
import {PoolType} from '../model'

export function isAlgebraFactoryItem(item: Log) {
    return item.address === ALGEBRA_FACTORY
}

export function getAlgebraFactoryActions(ctx: DataHandlerContext<unknown>, item: Log) {
    const actions: Action[] = []

    // switch (item.kind) {
    //     case 'evmLog': {
    //         ctx.log.debug(`processing evm log...`)
    switch (item.topics[0]) {
        case algebraFactory.events.Pool.topic: {
            ctx.log.debug(`processing Pool creation event...`)
            const event = algebraFactory.events.Pool.decode(item)

            const id = event.pool.toLowerCase()
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
                    factory: ALGEBRA_FACTORY,
                    type: PoolType.Algebra,
                })
            )

            PoolManager.instance.addPool(item.address, id, {token0, token1})

            break
        }
        default: {
            ctx.log.error(`unknown event ${item.topics[0]}`)
        }
    }
    //         break
    //     }
    // }

    return actions
}
