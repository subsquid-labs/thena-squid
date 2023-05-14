import {DataHandlerContext} from '@subsquid/evm-processor'
import {ALGEBRA_FACTORY, SOLIDLY_FACTORY} from '../config'
import {Log} from '../processor'
import * as solidlyFactory from '../abi/solidlyFactory'
import * as bep20 from '../abi/bep20'
import {Action, CreatePoolAction, EnsureTokenAction} from '../action'
import {PoolManager} from '../utils/pairManager'
import {Pool, PoolType, Token} from '../model'
import {StoreWithCache} from '../utils/store'
import {CallManager} from '../utils/callManager'

export function isSolidlyFactoryItem(item: Log) {
    return item.address === SOLIDLY_FACTORY
}

export function getSolidlyFactoryActions(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    const actions: Action[] = []

    switch (item.topics[0]) {
        case solidlyFactory.events.PairCreated.topic: {
            ctx.log.debug(`processing Pair creation event...`)
            const event = solidlyFactory.events.PairCreated.decode(item)

            const id = event.pair.toLowerCase()
            const token0 = event.token0.toLowerCase()
            const token1 = event.token1.toLowerCase()

            const callManager = CallManager.get(ctx)
            actions.push(
                new EnsureTokenAction(item.block, item.transaction!, {
                    token: ctx.store.defer(Token, token0),
                    address: token0,
                    decimals: callManager.defer(item.block, bep20.functions.decimals, {
                        address: token0,
                        args: [],
                    }),
                    symbol: callManager.defer(item.block, bep20.functions.symbol, {
                        address: token0,
                        args: [],
                    }),
                }),
                new EnsureTokenAction(item.block, item.transaction!, {
                    token: ctx.store.defer(Token, token1),
                    address: token1,
                    decimals: callManager.defer(item.block, bep20.functions.decimals, {
                        address: token1,
                        args: [],
                    }),
                    symbol: callManager.defer(item.block, bep20.functions.symbol, {
                        address: token1,
                        args: [],
                    }),
                }),
                new CreatePoolAction(item.block, item.transaction!, {
                    pool: ctx.store.defer(Pool, id),
                    address: id,
                    token0: ctx.store.defer(Token, token0),
                    token1: ctx.store.defer(Token, token1),
                    stable: event.stable,
                    factory: SOLIDLY_FACTORY,
                    type: PoolType.Solidly,
                })
            )

            PoolManager.instance.addPool(item.address, id)

            break
        }
        default: {
            ctx.log.error(`unknown event ${item.topics[0]}`)
        }
    }

    return actions
}
