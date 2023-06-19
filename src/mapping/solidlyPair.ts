import {DataHandlerContext} from '@subsquid/evm-processor'
import * as solidlyPair from '../abi/solidlyPair'
import {SOLIDLY_FACTORY, USD_ADDRESS, WHITELIST_TOKENS, ZERO_ADDRESS} from '../config'
import {Log} from '../processor'
import {PoolManager} from '../utils/manager/poolManager'
import {
    Action,
    ChangeLiquidityPoolAction,
    EnsureUserAction,
    PriceUpdateTokenAction,
    RecalculatePricesPoolAction,
    SetBalancesPoolAction,
    SetLiquidityPoolAction,
    SetSqrtPricePoolAction,
    SwapUserAction,
} from '../action'
import {
    AdjustValueUpdateLiquidityPositionAction,
    EnsureLiquidityPositionAction,
    ValueUpdateLiquidityPositionAction,
} from '../action/liquidityPosition'
import {createLiquidityPositionId, createLiquidityPositionUpdateId} from '../utils/ids'
import {DeferredFunction, WrappedValue} from '../utils/deferred'
import {User, Pool, Token, LiquidityPosition} from '../model'
import {StoreWithCache} from '../utils/store'
import {ContractChecker} from '../utils/contractChecker'

export function isSolidlyPairItem(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    return PoolManager.get(ctx).isPool(SOLIDLY_FACTORY, item.address)
}

export function getSolidlyPairActions(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    const actions: Action[] = []

    switch (item.topics[0]) {
        case solidlyPair.events.Swap.topic: {
            const event = solidlyPair.events.Swap.decode(item)

            const id = event.to.toLowerCase()

            const [amount0, amount1] =
                event.amount0In === 0n ? [-event.amount0Out, event.amount1In] : [event.amount0In, -event.amount1Out]
            if (amount0 === 0n || amount1 === 0n) break

            actions.push(
                new EnsureUserAction(item.block, item.transaction!, {
                    user: ctx.store.defer(User, id),
                    address: id,
                    isContract: ContractChecker.get(ctx).defer(id),
                }),
                new SwapUserAction(item.block, item.transaction!, {
                    user: ctx.store.defer(User, id),
                    amount0,
                    amount1,
                    pool: ctx.store.defer(Pool, item.address, {token0: true, token1: true}),
                    usdToken: ctx.store.defer(Token, USD_ADDRESS),
                })
            )

            break
        }
        case solidlyPair.events.Sync.topic: {
            const event = solidlyPair.events.Sync.decode(item)

            actions.push(
                new SetBalancesPoolAction(item.block, item.transaction!, {
                    pool: ctx.store.defer(Pool, item.address),
                    value0: new WrappedValue(event.reserve0),
                    value1: new WrappedValue(event.reserve1),
                }),
                new RecalculatePricesPoolAction(item.block, item.transaction!, {
                    pool: ctx.store.defer(Pool, item.address, {token0: true, token1: true}),
                })
            )

            const deferredPool = ctx.store.defer(Pool, item.address, {token0: true, token1: true})
            actions.push(
                new PriceUpdateTokenAction(item.block, item.transaction!, {
                    token: new DeferredFunction(async () => await deferredPool.get().then((p) => p?.token0)),
                    pool: deferredPool,
                })
            )

            actions.push(
                new PriceUpdateTokenAction(item.block, item.transaction!, {
                    token: new DeferredFunction(async () => await deferredPool.get().then((p) => p?.token1)),
                    pool: deferredPool,
                })
            )

            break
        }
        case solidlyPair.events.Transfer.topic: {
            const event = solidlyPair.events.Transfer.decode(item)

            const amount = event.amount
            const from = event.from.toLowerCase()
            const to = event.to.toLowerCase()

            const poolId = item.address

            if (from === ZERO_ADDRESS) {
                actions.push(
                    new ChangeLiquidityPoolAction(item.block, item.transaction!, {
                        pool: ctx.store.defer(Pool, item.address),
                        amount,
                    })
                )
            } else {
                const positionId = createLiquidityPositionId(item.address, from)
                actions.push(
                    new EnsureUserAction(item.block, item.transaction!, {
                        user: ctx.store.defer(User, from),
                        address: from,
                        isContract: ContractChecker.get(ctx).defer(from),
                    }),
                    new EnsureLiquidityPositionAction(item.block, item.transaction!, {
                        position: ctx.store.defer(LiquidityPosition, positionId),
                        id: positionId,
                        user: ctx.store.defer(User, from),
                        pool: ctx.store.defer(Pool, item.address),
                    }),
                    new ValueUpdateLiquidityPositionAction(item.block, item.transaction!, {
                        position: ctx.store.defer(LiquidityPosition, positionId, {pool: true}),
                        amount: -amount,
                    })
                )
            }

            if (to === ZERO_ADDRESS && from !== ZERO_ADDRESS) {
                actions.push(
                    new ChangeLiquidityPoolAction(item.block, item.transaction!, {
                        pool: ctx.store.defer(Pool, item.address),
                        amount: -amount,
                    })
                )
            } else {
                const positionId = createLiquidityPositionId(item.address, to)
                actions.push(
                    new EnsureUserAction(item.block, item.transaction!, {
                        user: ctx.store.defer(User, to),
                        address: to,
                        isContract: ContractChecker.get(ctx).defer(to),
                    }),
                    new EnsureLiquidityPositionAction(item.block, item.transaction!, {
                        position: ctx.store.defer(LiquidityPosition, positionId),
                        id: positionId,
                        user: ctx.store.defer(User, to),
                        pool: ctx.store.defer(Pool, item.address),
                    }),
                    new ValueUpdateLiquidityPositionAction(item.block, item.transaction!, {
                        position: ctx.store.defer(LiquidityPosition, positionId, {pool: true}),
                        amount,
                    })
                )
            }

            break
        }
        case solidlyPair.events.Mint.topic: {
            const event = solidlyPair.events.Mint.decode(item)

            const poolId = item.address
            const userId = event.sender.toLowerCase()

            const amount0 = event.amount0
            const amount1 = event.amount1

            actions.push(
                new AdjustValueUpdateLiquidityPositionAction(item.block, item.transaction!, {
                    position: ctx.store.defer(LiquidityPosition, createLiquidityPositionId(poolId, userId)),
                    amount0,
                    amount1,
                })
            )

            break
        }
        case solidlyPair.events.Burn.topic: {
            const event = solidlyPair.events.Burn.decode(item)

            const poolId = item.address
            const userId = event.sender.toLowerCase()

            const amount0 = -event.amount0
            const amount1 = -event.amount1

            actions.push(
                new AdjustValueUpdateLiquidityPositionAction(item.block, item.transaction!, {
                    position: ctx.store.defer(LiquidityPosition, createLiquidityPositionId(poolId, userId)),
                    amount0,
                    amount1,
                })
            )

            break
        }
    }

    return actions
}
