import {StoreWithCache} from '@belopash/typeorm-store'
import * as algebraPool from '../abi/algebraPool'
import {ALGEBRA_FACTORY, USD_ADDRESS} from '../config'
import {MappingContext} from '../interfaces'
import {Hypervisor, LiquidityPosition, Pool, Token, User} from '../model'
import {Log} from '../processor'
import {createLiquidityPositionId} from '../utils/ids'
import {HypervisorManager} from '../utils/manager/hypervisorManager'
import {PoolManager} from '../utils/manager/poolManager'
import {Item} from './common'

export function getAlgebraPoolActions(ctx: MappingContext<StoreWithCache>, item: Item) {
    if (item.address == null || !PoolManager.get(ctx).isPool(ALGEBRA_FACTORY, item.address)) return

    switch (item.kind) {
        case 'log': {
            const log = item.value
            switch (log.topics[0]) {
                case algebraPool.events.Swap.topic:
                    swapHandler(ctx, log)
                    break

                case algebraPool.events.Mint.topic:
                    mintHandler(ctx, log)
                    break

                case algebraPool.events.Burn.topic:
                    burnHandler(ctx, log)
                    break
            }
            break
        }
    }
}

function swapHandler(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = algebraPool.events.Swap.decode(log)

    const userId = event.recipient.toLowerCase()
    ctx.store.defer(User, userId)

    const poolId = log.address
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
}
function mintHandler(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = algebraPool.events.Mint.decode(log)

    const userId = event.owner.toLowerCase()
    const userDeffered = ctx.store.defer(User, userId)

    const poolId = log.address
    ctx.store.defer(Pool, poolId)

    const amount = event.liquidityAmount
    const amount0 = event.amount0
    const amount1 = event.amount1
    if (amount === 0n && amount0 === 0n && amount1 === 0n) return

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
            amount0,
            amount1,
        })

    if (HypervisorManager.get(ctx).isHypervisor(userId)) {
        ctx.store.defer(Hypervisor, userId)

        ctx.queue.add('hypervisor_setPosition', {
            hypervisorId: userId,
            positionId,
        })
    }
}
function burnHandler(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = algebraPool.events.Burn.decode(log)

    const userId = event.owner.toLowerCase()
    ctx.store.defer(User, userId)

    const poolId = log.address
    ctx.store.defer(Pool, poolId)

    const amount = -event.liquidityAmount
    const amount0 = -event.amount0
    const amount1 = -event.amount1
    if (amount === 0n && amount0 === 0n && amount1 === 0n) return

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
            amount0,
            amount1,
        })

    if (HypervisorManager.get(ctx).isHypervisor(userId)) {
        ctx.store.defer(Hypervisor, userId)

        ctx.queue.add('hypervisor_removePosition', {
            hypervisorId: userId,
            positionId,
        })
    }
}
