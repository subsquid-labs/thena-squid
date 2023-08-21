import {StoreWithCache} from '@belopash/squid-tools'
import * as algebraPool from '../abi/algebraPool'
import {ALGEBRA_FACTORY, USD_ADDRESS} from '../config'
import {MappingContext} from '../interfaces'
import {Hypervisor, LiquidityPosition, Pool, Token, User} from '../model'
import {Log} from '../processor'
import {WrappedValue} from '../utils/deferred'
import {createLiquidityPositionId} from '../utils/ids'
import {HypervisorManager} from '../utils/manager/hypervisorManager'
import {PoolManager} from '../utils/manager/poolManager'

export function isAlgebraPoolItem(ctx: MappingContext<StoreWithCache>, item: Log) {
    return PoolManager.get(ctx).isPool(ALGEBRA_FACTORY, item.address)
}

export function getAlgebraPoolActions(ctx: MappingContext<StoreWithCache>, item: Log) {
    switch (item.topics[0]) {
        case algebraPool.events.Swap.topic: {
            const event = algebraPool.events.Swap.decode(item)

            const userId = event.recipient.toLowerCase()
            ctx.store.defer(User, userId)

            const poolId = item.address
            const poolDefered = ctx.store.defer(Pool, poolId, {token0: true, token1: true})

            const amount0 = event.amount0
            const amount1 = event.amount1

            const liquidity = event.liquidity

            ctx.store.defer(Token, USD_ADDRESS)

            ctx.queue
                .lazy(async () => {
                    const user = await ctx.store.get(User, userId)
                    if (user == null) {
                        ctx.queue.add('user_create', {
                            userId,
                            address: userId,
                        })
                    }
                })
                .add('swap', {
                    userId,
                    poolId,
                    usdTokenId: USD_ADDRESS,
                    amount0,
                    amount1,
                })
                .add('pool_setLiquidity', {
                    poolId,
                    value: liquidity,
                })
                .add('pool_setSqrtPrice', {
                    poolId,
                    value: event.price,
                })
                .add('pool_recalcPrices', {
                    poolId,
                })
                .lazy(async () => {
                    const pool = await poolDefered.getOrFail()

                    ctx.queue
                        .add('token_recalcPrice', {
                            tokenId: pool.token0.id,
                            poolId,
                        })
                        .add('token_recalcPrice', {
                            tokenId: pool.token1.id,
                            poolId,
                        })
                })

            break
        }
        case algebraPool.events.Mint.topic: {
            const event = algebraPool.events.Mint.decode(item)

            const userId = event.owner.toLowerCase()
            const userDeffered = ctx.store.defer(User, userId)

            const poolId = item.address
            ctx.store.defer(Pool, poolId)

            const amount = event.liquidityAmount
            if (amount === 0n) break

            const positionId = createLiquidityPositionId(poolId, userId, event.bottomTick, event.topTick)
            const positionDeferred = ctx.store.defer(LiquidityPosition, positionId, {pool: true})

            ctx.queue
                .add('pool_updateLiquidity', {
                    poolId,
                    amount,
                })
                .lazy(async () => {
                    const position = await positionDeferred.get()
                    if (position == null) {
                        const user = await userDeffered.get()
                        if (user == null) {
                            ctx.queue.add('user_create', {
                                userId,
                                address: userId,
                            })
                        }

                        ctx.queue.add('lp_create', {
                            userId,
                            poolId,
                            positionId,
                        })
                    }
                })
                .add('lp_updateValue', {
                    positionId,
                    amount,
                    amount0: event.amount0,
                    amount1: event.amount1,
                })

            if (HypervisorManager.get(ctx).isTracked(userId)) {
                ctx.store.defer(Hypervisor, userId)

                ctx.queue.add('hypervisor_setPosition', {
                    hypervisorId: userId,
                    positionId,
                })
            }

            break
        }
        case algebraPool.events.Burn.topic: {
            const event = algebraPool.events.Burn.decode(item)

            const userId = event.owner.toLowerCase()
            ctx.store.defer(User, userId)

            const poolId = item.address
            ctx.store.defer(Pool, poolId)

            const amount = -event.liquidityAmount
            if (amount === 0n) break

            const positionId = createLiquidityPositionId(poolId, userId, event.bottomTick, event.topTick)
            ctx.store.defer(LiquidityPosition, positionId, {pool: true})

            ctx.queue
                .add('pool_updateLiquidity', {
                    poolId,
                    amount,
                })
                .add('lp_updateValue', {
                    positionId,
                    amount,
                    amount0: -event.amount0,
                    amount1: -event.amount1,
                })

            if (HypervisorManager.get(ctx).isTracked(userId)) {
                ctx.store.defer(Hypervisor, userId)

                ctx.queue.add('hypervisor_removePosition', {
                    hypervisorId: userId,
                    positionId,
                })
            }

            break
        }
    }
}
