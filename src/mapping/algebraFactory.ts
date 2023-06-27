import {DataHandlerContext} from '@subsquid/evm-processor'
import {ALGEBRA_FACTORY} from '../config'
import {Log} from '../processor'
import * as algebraFactory from '../abi/algebraFactory'
import * as bep20 from '../abi/bep20'
import {Action, CreatePoolAction, EnsureTokenAction} from '../action'
import {PoolManager} from '../utils/manager/poolManager'
import {Pool, PoolType, Token} from '../model'
import {StoreWithCache} from '@belopash/squid-tools'
import {CallCache} from '../utils/callCache'

export function isAlgebraFactoryItem(item: Log) {
    return item.address === ALGEBRA_FACTORY
}

export function getAlgebraFactoryActions(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    const actions: Action[] = []

    switch (item.topics[0]) {
        case algebraFactory.events.Pool.topic: {
            ctx.log.debug(`processing Pool creation event...`)
            const event = algebraFactory.events.Pool.decode(item)

            const callCache = CallCache.get(ctx)

            const id = event.pool.toLowerCase()

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
                    factory: ALGEBRA_FACTORY,
                    type: PoolType.Algebra,
                })
            )

            PoolManager.get(ctx).addPool(item.address, id)

            break
        }
    }

    return actions
}
