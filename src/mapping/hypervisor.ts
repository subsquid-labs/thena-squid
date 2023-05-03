import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import * as hypervisor from '../abi/hypervisor'
import * as bep20 from '../abi/bep20'
import {ProcessorItem} from '../processor'
import {
    Action,
    AdjustValueUpdateLiquidityPositionAction,
    ChangeLiquidityPoolAction,
    CreatePoolAction,
    InitHypervisorAction,
    InitTokenAction,
    SetBalancesPoolAction,
    SetLiquidityPoolAction,
    UnknownPoolAction,
    UnknownUserAction,
    ValueUpdateLiquidityPositionAction,
} from '../types/action'
import {createLiquidityPositionId} from '../utils/ids'
import {ZERO_ADDRESS} from '../config'
import {HypervisorManager} from '../utils/hypervisorManager'
import {DeferredCall, DefferedFunction, WrappedValue} from '../utils/deferred'
import {PoolType} from '../model'
import {PoolManager} from '../utils/pairManager'

export function isHypervisorItem(item: ProcessorItem) {
    return HypervisorManager.instance.isHypervisor(item.address)
}

export async function getHypervisorActions(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem
) {
    const actions: Action[] = []

    if (!HypervisorManager.instance.isTracked(item.address)) {
        const token0 = new DeferredCall(block, {
            address: item.address,
            func: hypervisor.functions.token0,
            args: [],
            transform: (v) => v.toLowerCase(),
        })

        const token1 = new DeferredCall(block, {
            address: item.address,
            func: hypervisor.functions.token1,
            args: [],
            transform: (v) => v.toLowerCase(),
        })

        actions.push(
            new InitTokenAction(block, item.transaction, {
                id: await token0.get(ctx),
                decimals: new DefferedFunction(async (ctx) =>
                    new DeferredCall(block, {
                        address: await token0.get(ctx),
                        func: hypervisor.functions.decimals,
                        args: [],
                    }).get(ctx)
                ),
                symbol: new DefferedFunction(async (ctx) =>
                    new DeferredCall(block, {
                        address: await token0.get(ctx),
                        func: hypervisor.functions.symbol,
                        args: [],
                    }).get(ctx)
                ),
            })
        )

        actions.push(
            new InitTokenAction(block, item.transaction, {
                id: await token1.get(ctx),
                decimals: new DefferedFunction(async (ctx) =>
                    new DeferredCall(block, {
                        address: await token1.get(ctx),
                        func: hypervisor.functions.decimals,
                        args: [],
                    }).get(ctx)
                ),
                symbol: new DefferedFunction(async (ctx) =>
                    new DeferredCall(block, {
                        address: await token1.get(ctx),
                        func: hypervisor.functions.symbol,
                        args: [],
                    }).get(ctx)
                ),
            })
        )

        actions.push(
            new CreatePoolAction(block, item.transaction, {
                id: item.address,
                factory: item.address,
                token0,
                token1,
                type: PoolType.Hypervisor,
            })
        )

        actions.push(
            new InitHypervisorAction(block, item.transaction, {
                id: item.address,
                poolId: new DeferredCall(block, {
                    address: item.address,
                    func: hypervisor.functions.pool,
                    args: [],
                    transform: (v) => v.toLowerCase(),
                }),
            })
        )
        HypervisorManager.instance.add(item.address)
        PoolManager.instance.addPool(item.address, item.address, {
            token0: await token0.get(ctx),
            token1: await token1.get(ctx),
        })
    }

    switch (item.kind) {
        case 'evmLog': {
            switch (item.evmLog.topics[0]) {
                case hypervisor.events.Transfer.topic: {
                    const event = hypervisor.events.Transfer.decode(item.evmLog)

                    const amount = event.value.toBigInt()
                    const from = event.from.toLowerCase()
                    const to = event.to.toLowerCase()

                    const poolId = item.address

                    // to make sure it will be prefetched
                    actions.push(new UnknownPoolAction(block, item.transaction, {id: poolId}))

                    if (from === ZERO_ADDRESS) {
                        actions.push(
                            new ChangeLiquidityPoolAction(block, item.transaction, {
                                id: item.address,
                                amount,
                            })
                        )
                    } else {
                        actions.push(new UnknownUserAction(block, item.transaction, {id: from}))

                        actions.push(
                            new ValueUpdateLiquidityPositionAction(block, item.transaction, {
                                id: createLiquidityPositionId(item.address, from),
                                amount: -amount,
                                userId: from,
                                poolId,
                            })
                        )
                    }

                    if (to === ZERO_ADDRESS && from !== ZERO_ADDRESS) {
                        actions.push(
                            new ChangeLiquidityPoolAction(block, item.transaction, {
                                id: item.address,
                                amount: -amount,
                            })
                        )
                    } else {
                        actions.push(new UnknownUserAction(block, item.transaction, {id: to}))

                        actions.push(
                            new ValueUpdateLiquidityPositionAction(block, item.transaction, {
                                id: createLiquidityPositionId(item.address, to),
                                amount,
                                userId: to,
                                poolId,
                            })
                        )
                    }

                    break
                }
                case hypervisor.events.Deposit.topic: {
                    const event = hypervisor.events.Deposit.decode(item.evmLog)

                    const userId = event.to.toLowerCase()
                    const poolId = item.address

                    const amount0 = event.amount0.toBigInt()
                    const amount1 = event.amount1.toBigInt()

                    actions.push(
                        new AdjustValueUpdateLiquidityPositionAction(block, item.transaction, {
                            id: createLiquidityPositionId(poolId, userId),
                            poolId,
                            userId,
                            amount0,
                            amount1,
                        })
                    )

                    // actions.push(
                    //     new SetBalancesPoolAction(block, item.transaction, {
                    //         id: item.address,
                    //         value0: new DeferredCall(block, {
                    //             address: PoolManager.instance.getTokens(item.address).token0,
                    //             func: bep20.functions.balanceOf,
                    //             args: [item.address],
                    //             transform: (v) => v.toBigInt(),
                    //         }),
                    //         value1: new DeferredCall(block, {
                    //             address: PoolManager.instance.getTokens(item.address).token1,
                    //             func: bep20.functions.balanceOf,
                    //             args: [item.address],
                    //             transform: (v) => v.toBigInt(),
                    //         }),
                    //     })
                    // )

                    break
                }
                case hypervisor.events.Withdraw.topic: {
                    const event = hypervisor.events.Withdraw.decode(item.evmLog)

                    const userId = event.to.toLowerCase()
                    const poolId = item.address

                    const amount0 = -event.amount0.toBigInt()
                    const amount1 = -event.amount1.toBigInt()

                    actions.push(
                        new AdjustValueUpdateLiquidityPositionAction(block, item.transaction, {
                            id: createLiquidityPositionId(poolId, userId),
                            poolId,
                            userId,
                            amount0,
                            amount1,
                        })
                    )

                    // actions.push(
                    //     new SetBalancesPoolAction(block, item.transaction, {
                    //         id: item.address,
                    //         value0: new DeferredCall(block, {
                    //             address: PoolManager.instance.getTokens(item.address).token0,
                    //             func: bep20.functions.balanceOf,
                    //             args: [item.address],
                    //             transform: (v) => v.toBigInt(),
                    //         }),
                    //         value1: new DeferredCall(block, {
                    //             address: PoolManager.instance.getTokens(item.address).token1,
                    //             func: bep20.functions.balanceOf,
                    //             args: [item.address],
                    //             transform: (v) => v.toBigInt(),
                    //         }),
                    //     })
                    // )

                    break
                }
                case hypervisor.events.Rebalance.topic: {
                    const event = hypervisor.events.Rebalance.decode(item.evmLog)

                    const poolId = item.address

                    actions.push(
                        new SetBalancesPoolAction(block, item.transaction, {
                            id: poolId,
                            value0: new WrappedValue(event.totalAmount0.toBigInt()),
                            value1: new WrappedValue(event.totalAmount1.toBigInt()),
                        })
                    )

                    break
                }
                default: {
                    ctx.log.error(`unknown event ${item.evmLog.topics[0]}`)
                }
            }
            break
        }
    }

    return actions
}
