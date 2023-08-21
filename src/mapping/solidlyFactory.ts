import {StoreWithCache} from '@belopash/squid-tools'
import * as bep20 from '../abi/bep20'
import * as solidlyFactory from '../abi/solidlyFactory'
import {Action} from '../action'
import {SOLIDLY_FACTORY} from '../config'
import {MappingContext} from '../interfaces'
import {PoolType, Token} from '../model'
import {Log} from '../processor'
import {CallCache} from '../utils/callCache'
import {PoolManager} from '../utils/manager/poolManager'

export function isSolidlyFactoryItem(item: Log) {
    return item.address === SOLIDLY_FACTORY
}

export function getSolidlyFactoryActions(ctx: MappingContext<StoreWithCache>, item: Log) {
    const actions: Action[] = []

    switch (item.topics[0]) {
        case solidlyFactory.events.PairCreated.topic: {
            ctx.log.debug(`processing Pair creation event...`)
            const event = solidlyFactory.events.PairCreated.decode(item)

            const poolId = event.pair.toLowerCase()

            const callCache = CallCache.get(ctx)

            const token0Address = event.token0.toLowerCase()
            const token0Id = token0Address
            const token0Deferred = ctx.store.defer(Token, token0Id)

            const token0DecimalsDeferred = callCache.defer(item.block, [bep20.functions.decimals, token0Address, []])
            const token0SymbolDeferred = callCache.defer(item.block, [bep20.functions.symbol, token0Address, []])

            const token1Address = event.token1.toLowerCase()
            const token1Id = event.token1.toLowerCase()
            const token1Deferred = ctx.store.defer(Token, token1Id)

            const token1DecimalsDeferred = callCache.defer(item.block, [bep20.functions.decimals, token1Address, []])
            const token1SymbolDeferred = callCache.defer(item.block, [bep20.functions.symbol, token1Address, []])

            ctx.queue
                .lazy(async () => {
                    const token0 = await token0Deferred.get()
                    if (token0 == null) {
                        ctx.queue.add('token_create', {
                            tokenId: token0Id,
                            address: token0Address,
                            decimals: await token0DecimalsDeferred.get(),
                            symbol: await token0SymbolDeferred.get(),
                        })
                    }
                })
                .lazy(async () => {
                    const token1 = await token1Deferred.get()
                    if (token1 == null) {
                        ctx.queue.add('token_create', {
                            tokenId: token1Id,
                            address: token0Address,
                            decimals: await token1DecimalsDeferred.get(),
                            symbol: await token1SymbolDeferred.get(),
                        })
                    }
                })
                .add('pool_create', {
                    poolId,
                    address: poolId,
                    type: PoolType.Solidly,
                    factory: item.address,
                    token0Id,
                    token1Id,
                })

            PoolManager.get(ctx).addPool(item.address, poolId)

            break
        }
    }

    return actions
}
