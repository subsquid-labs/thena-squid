import {StoreWithCache} from '@belopash/typeorm-store'
import * as hypervisor from '../abi/hypervisor'
import {ZERO_ADDRESS} from '../config'
import {MappingContext} from '../interfaces'
import {Hypervisor, LiquidityPosition, Pool, User} from '../model'
import {Log} from '../processor'
import {CallCache} from '../utils/callCache'
import {createLiquidityPositionId} from '../utils/ids'
import {HypervisorManager} from '../utils/manager/hypervisorManager'
import {Item} from './common'

export function getHypervisorActions(ctx: MappingContext<StoreWithCache>, item: Item) {
    if (item.address == null || !HypervisorManager.get(ctx).isHypervisor(item.address)) return

    const hypervisorId = item.address
    const hypervisorDeferred = ctx.store.defer(Hypervisor, hypervisorId)

    const callCache = CallCache.get(ctx)

    const token0Deferred = callCache.defer(item.value.block, [hypervisor.functions.token0, hypervisorId, []])
    const token1Deferred = callCache.defer(item.value.block, [hypervisor.functions.token1, hypervisorId, []])
    const hypervisorPoolDeferred = callCache.defer(item.value.block, [hypervisor.functions.pool, hypervisorId, []])

    ctx.queue.lazy(async () => {
        const hypervisor = await hypervisorDeferred.get()
        if (hypervisor == null) {
            const token0 = await token0Deferred.get()
            const token1 = await token1Deferred.get()
            const hypervisorPool = await hypervisorPoolDeferred.get()

            ctx.queue.add('hypervisor_create', {
                hypervisorId,
                poolId: hypervisorId,
                address: hypervisorId,
                hypervisorPoolId: hypervisorPool.toLowerCase(),
                token0Id: token0.toLowerCase(),
                token1Id: token1.toLowerCase(),
            })
        }
    })

    switch (item.kind) {
        case 'log': {
            const log = item.value
            switch (log.topics[0]) {
                case hypervisor.events.Transfer.topic:
                    handleTransfer(ctx, log)
                    break

                case hypervisor.events.Deposit.topic:
                    handleDeposit(ctx, log)
                    break

                case hypervisor.events.Withdraw.topic:
                    handleWithdraw(ctx, log)
                    break

                case hypervisor.events.Rebalance.topic:
                    handleRebalance(ctx, log)
                    break
            }
            break
        }
    }
}

function handleTransfer(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = hypervisor.events.Transfer.decode(log)

    const amount = event.value
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
        ctx.store.defer(LiquidityPosition, {id: positionId, relations: {pool: true}})

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
        ctx.store.defer(LiquidityPosition, {id: positionId, relations: {pool: true}})

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

function handleDeposit(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = hypervisor.events.Deposit.decode(log)

    const userId = event.to.toLowerCase()
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

function handleWithdraw(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = hypervisor.events.Withdraw.decode(log)

    const userId = event.to.toLowerCase()
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

function handleRebalance(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = hypervisor.events.Rebalance.decode(log)

    const poolId = log.address
    ctx.store.defer(Pool, poolId)

    ctx.queue.add('pool_setReserves', {
        poolId,
        value0: event.totalAmount0,
        value1: event.totalAmount1,
    })
}
