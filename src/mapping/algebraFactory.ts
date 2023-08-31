import {StoreWithCache} from '@belopash/typeorm-store'
import * as algebraFactory from '../abi/algebraFactory'
import * as bep20 from '../abi/bep20'
import {ALGEBRA_FACTORY} from '../config'
import {MappingContext} from '../interfaces'
import {PoolType, Token} from '../model'
import {Log} from '../processor'
import {CallCache} from '../utils/callCache'
import {PoolManager} from '../utils/manager/poolManager'

export function isAlgebraFactoryItem(item: Log) {
    return item.address === ALGEBRA_FACTORY
}

export function getAlgebraFactoryActions(ctx: MappingContext<StoreWithCache>, item: Log) {
    const callCache = CallCache.get(ctx)

    switch (item.topics[0]) {
        case algebraFactory.events.Pool.topic: {
            ctx.log.debug(`processing Pool creation event...`)
            const event = algebraFactory.events.Pool.decode(item)

            const poolAddress = event.pool.toLowerCase()
            const poolId = poolAddress

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
                            address: token1Address,
                            decimals: await token1DecimalsDeferred.get(),
                            symbol: await token1SymbolDeferred.get(),
                        })
                    }
                })
                .add('pool_create', {
                    poolId,
                    address: poolAddress,
                    type: PoolType.Algebra,
                    factory: item.address,
                    token0Id,
                    token1Id,
                })

            PoolManager.get(ctx).addPool(item.address, poolId)

            break
        }
    }
}
