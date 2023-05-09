import {DataHandlerContext} from '@subsquid/evm-processor'
import * as solidlyPair from '../abi/solidlyPair'
import {SOLIDLY_FACTORY, WHITELIST_TOKENS, ZERO_ADDRESS} from '../config'
import {Log} from '../processor'
import {PoolManager} from '../utils/pairManager'
import {
    Action,
    ActionKind,
    ChangeLiquidityPoolAction,
    PriceUpdateTokenAction,
    SetBalancesPoolAction,
    SwapUserAction,
    UnknownPoolAction,
    UnknownTokenAction,
    UnknownUserAction,
} from '../types/action'
import {
    AdjustValueUpdateLiquidityPositionAction,
    ValueUpdateLiquidityPositionAction,
} from '../types/action/liquidityPosition'
import {createLiquidityPositionId, createLiquidityPositionUpdateId} from '../utils/ids'
import {WrappedValue} from '../utils/deferred'

export function isSolidlyPairItem(item: Log) {
    return PoolManager.instance.isPool(SOLIDLY_FACTORY, item.address)
}

export function getSolidlyPairActions(ctx: DataHandlerContext<unknown>, item: Log) {
    const actions: Action[] = []

    // switch (item.kind) {
    //     case 'evmLog': {
    switch (item.topics[0]) {
        case solidlyPair.events.Swap.topic: {
            const event = solidlyPair.events.Swap.decode(item)

            const poolId = item.address
            const id = event.to.toLowerCase()

            const [amount0, amount1] =
                event.amount0In === 0n ? [-event.amount0Out, event.amount1In] : [event.amount0In, -event.amount1Out]
            if (amount0 === 0n || amount1 === 0n) break

            // to make sure it will be prefetched
            actions.push(new UnknownPoolAction(item.block, item.transaction!, {id: poolId}))
            actions.push(
                new UnknownTokenAction(item.block, item.transaction!, {
                    id: PoolManager.instance.getTokens(poolId).token0,
                })
            )
            actions.push(
                new UnknownTokenAction(item.block, item.transaction!, {
                    id: PoolManager.instance.getTokens(poolId).token1,
                })
            )

            actions.push(
                new SwapUserAction(item.block, item.transaction!, {
                    id,
                    amount0,
                    amount1,
                    poolId,
                })
            )

            break
        }
        case solidlyPair.events.Sync.topic: {
            const event = solidlyPair.events.Sync.decode(item)

            const poolTokens = PoolManager.instance.getTokens(item.address)

            actions.push(
                new UnknownTokenAction(item.block, item.transaction!, {id: poolTokens.token0}),
                new UnknownTokenAction(item.block, item.transaction!, {id: poolTokens.token1})
            )

            actions.push(
                new SetBalancesPoolAction(item.block, item.transaction!, {
                    id: item.address,
                    value0: new WrappedValue(event.reserve0),
                    value1: new WrappedValue(event.reserve1),
                })
            )

            if (WHITELIST_TOKENS.indexOf(poolTokens.token1) > -1) {
                actions.push(
                    new PriceUpdateTokenAction(item.block, item.transaction!, {
                        id: poolTokens.token0,
                        poolId: item.address,
                    })
                )
            }

            if (WHITELIST_TOKENS.indexOf(poolTokens.token0) > -1) {
                actions.push(
                    new PriceUpdateTokenAction(item.block, item.transaction!, {
                        id: poolTokens.token1,
                        poolId: item.address,
                    })
                )
            }

            break
        }
        case solidlyPair.events.Transfer.topic: {
            const event = solidlyPair.events.Transfer.decode(item)

            const amount = event.amount
            const from = event.from.toLowerCase()
            const to = event.to.toLowerCase()

            const poolId = item.address

            // to make sure it will be prefetched
            actions.push(new UnknownPoolAction(item.block, item.transaction!, {id: poolId}))

            if (from === ZERO_ADDRESS) {
                actions.push(
                    new ChangeLiquidityPoolAction(item.block, item.transaction!, {
                        id: item.address,
                        amount,
                    })
                )
            } else {
                actions.push(new UnknownUserAction(item.block, item.transaction!, {id: from}))

                actions.push(
                    new ValueUpdateLiquidityPositionAction(item.block, item.transaction!, {
                        id: createLiquidityPositionId(item.address, from),
                        amount: -amount,
                        userId: from,
                        poolId,
                    })
                )
            }

            if (to === ZERO_ADDRESS && from !== ZERO_ADDRESS) {
                actions.push(
                    new ChangeLiquidityPoolAction(item.block, item.transaction!, {
                        id: item.address,
                        amount: -amount,
                    })
                )
            } else {
                actions.push(new UnknownUserAction(item.block, item.transaction!, {id: to}))

                actions.push(
                    new ValueUpdateLiquidityPositionAction(item.block, item.transaction!, {
                        id: createLiquidityPositionId(item.address, to),
                        amount,
                        userId: to,
                        poolId,
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
                    id: createLiquidityPositionId(poolId, userId),
                    poolId,
                    userId,
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
                    id: createLiquidityPositionId(poolId, userId),
                    poolId,
                    userId,
                    amount0,
                    amount1,
                })
            )

            break
        }
        // case solidlyPair.events.Fees.topic: {
        //     const event = pair.events.Burn.decode(item)

        //     actions.push({
        //         block,
        //         kind: ActionKind.Pool,
        //         transaction: item.transaction!,
        //         data: {
        //             id: item.address,
        //             type: PoolActionType.Balances,
        //             amount0: -event.amount0,
        //             amount1: -event.amount1,
        //         },
        //     })

        //     break
        // }
        default: {
            ctx.log.error(`unknown event ${item.topics[0]}`)
        }
    }
    //         break
    //     }
    // }

    return actions
}
