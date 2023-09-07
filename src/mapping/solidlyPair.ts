import {StoreWithCache} from '@belopash/typeorm-store'
import * as solidlyPair from '../abi/solidlyPair'
import {SOLIDLY_FACTORY, USD_ADDRESS, ZERO_ADDRESS} from '../config'
import {MappingContext} from '../interfaces'
import {LiquidityPosition, Pool, Token, User} from '../model'
import {Log} from '../processor'
import {createLiquidityPositionId} from '../utils/ids'
import {PoolManager} from '../utils/manager/poolManager'
import {Item} from './common'

export function getSolidlyPairActions(ctx: MappingContext<StoreWithCache>, item: Item) {
    if (item.address == null || !PoolManager.get(ctx).isPool(SOLIDLY_FACTORY, item.address)) return

    switch (item.kind) {
        case 'log': {
            const log = item.value
            switch (log.topics[0]) {
                case solidlyPair.events.Swap.topic:
                    handleSwap(ctx, log)
                    break

                case solidlyPair.events.Sync.topic:
                    handleSync(ctx, log)
                    break

                case solidlyPair.events.Transfer.topic:
                    handleTransfer(ctx, log)
                    break

                case solidlyPair.events.Mint.topic:
                    handleMint(ctx, log)
                    break

                case solidlyPair.events.Burn.topic: {
                    handleBurn(ctx, log)

                    break
                }
            }
            break
        }
    }
}

function handleSwap(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = solidlyPair.events.Swap.decode(log)

    const userId = event.to.toLowerCase()
    const userDeferred = ctx.store.defer(User, userId)

    const poolId = log.address
    ctx.store.defer(Pool, poolId, {token0: true, token1: true})

    const [amount0, amount1] =
        event.amount0In === 0n ? [-event.amount0Out, event.amount1In] : [event.amount0In, -event.amount1Out]
    if (amount0 === 0n || amount1 === 0n) return

    ctx.store.defer(Token, USD_ADDRESS)

    ctx.queue
        .lazy(async () => {
            const user = await userDeferred.get()
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
        .lazy(async () => {
            const pool = await ctx.store.getOrFail(Pool, poolId, {token0: true, token1: true})

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
}

function handleSync(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = solidlyPair.events.Sync.decode(log)

    const poolId = log.address
    ctx.store.defer(Pool, poolId, {token0: true, token1: true})

    ctx.queue
        .add('pool_setReserves', {
            poolId,
            value0: event.reserve0,
            value1: event.reserve1,
        })
        .add('pool_recalcPrices', {
            poolId,
        })
}

function handleTransfer(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = solidlyPair.events.Transfer.decode(log)

    const amount = event.amount
    if (amount === 0n) return

    const fromId = event.from.toLowerCase()
    ctx.store.defer(User, fromId)

    const toId = event.to.toLowerCase()
    ctx.store.defer(User, toId)

    const poolId = log.address

    if (fromId === ZERO_ADDRESS) {
        ctx.queue.add('pool_updateLiquidity', {
            poolId,
            amount,
        })
    } else {
        const positionId = createLiquidityPositionId(poolId, fromId)
        ctx.store.defer(LiquidityPosition, positionId, {pool: true})

        ctx.queue.add('lp_updateValue', {
            positionId,
            amount: -amount,
        })
    }

    if (toId === ZERO_ADDRESS && fromId !== ZERO_ADDRESS) {
        ctx.queue.add('pool_updateLiquidity', {
            poolId,
            amount: -amount,
        })
    } else {
        const positionId = createLiquidityPositionId(poolId, toId)
        ctx.store.defer(LiquidityPosition, positionId, {pool: true})

        ctx.queue
            .lazy(async () => {
                const position = await ctx.store.get(LiquidityPosition, positionId)
                if (position == null) {
                    const user = await ctx.store.get(User, toId)
                    if (user == null) {
                        ctx.queue.add('user_create', {
                            userId: toId,
                            address: toId,
                        })
                    }
                    ctx.queue.add('lp_create', {
                        positionId,
                        poolId,
                        userId: toId,
                    })
                }
            })
            .add('lp_updateValue', {
                positionId,
                amount,
            })
    }
}

function handleMint(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = solidlyPair.events.Mint.decode(log)

    const userId = event.sender.toLowerCase()
    const poolId = log.address
    const positionId = createLiquidityPositionId(poolId, userId)
    ctx.store.defer(LiquidityPosition, positionId)

    const amount0 = event.amount0
    const amount1 = event.amount1

    ctx.queue.add('lp_adjustLastUpdate', {
        positionId,
        amount0,
        amount1,
    })
}

function handleBurn(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = solidlyPair.events.Burn.decode(log)

    const userId = event.sender.toLowerCase()
    const poolId = log.address
    const positionId = createLiquidityPositionId(poolId, userId)
    ctx.store.defer(LiquidityPosition, positionId)

    const amount0 = -event.amount0
    const amount1 = -event.amount1

    ctx.queue.add('lp_adjustLastUpdate', {
        positionId,
        amount0,
        amount1,
    })
}
