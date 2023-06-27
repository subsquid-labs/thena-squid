import {DataHandlerContext} from '@subsquid/evm-processor'
import {ALGEBRA_FACTORY, SOLIDLY_FACTORY} from '../config'
import {Log} from '../processor'
import * as solidlyFactory from '../abi/solidlyFactory'
import * as bep20 from '../abi/bep20'
import {Action, CreatePoolAction, EnsureTokenAction} from '../action'
import {PoolManager} from '../utils/manager/poolManager'
import {Pool, PoolType, Token} from '../model'
import {StoreWithCache} from '@belopash/squid-tools'
import {CallCache} from '../utils/callCache'

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

            const callCache = CallCache.get(ctx)

            const token0 = event.token0.toLowerCase()
            const token0Decimals = callCache.defer(item.block, [bep20.functions.decimals, token0, []])
            const token0Symbol = callCache.defer(item.block, [bep20.functions.symbol, token0, []])

            const token1 = event.token1.toLowerCase()
            const token1Decimals = callCache.defer(item.block, [bep20.functions.decimals, token1, []])
            const token1Symbol = callCache.defer(item.block, [bep20.functions.symbol, token1, []])

            actions.push(
                new EnsureTokenAction(item.block, item.transaction!, {
                    token: ctx.store.defer(Token, token0),
                    address: token0,
                    get decimals() {
                        return token0Decimals.get()
                    },
                    get symbol() {
                        return token0Symbol.get()
                    },
                }),
                new EnsureTokenAction(item.block, item.transaction!, {
                    token: ctx.store.defer(Token, token1),
                    address: token1,
                    get decimals() {
                        return token1Decimals.get()
                    },
                    get symbol() {
                        return token1Symbol.get()
                    },
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

            PoolManager.get(ctx).addPool(item.address, id)

            break
        }
    }

    return actions
}
