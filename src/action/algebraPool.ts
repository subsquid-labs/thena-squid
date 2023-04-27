import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import * as algebraPool from '../abi/algebraPool'
import {ALGEBRA_FACTORY} from '../config'
import {ProcessorItem} from '../processor'
import {PoolManager} from '../utils/pairManager'
import {Action, ActionKind, PoolActionType, SwapUserAction, UnknownPoolAction, UserActionType} from './types'

export function isAlgebraPoolItem(item: ProcessorItem) {
    return PoolManager.instance.isPool(ALGEBRA_FACTORY, item.address)
}

export function getAlgebraPoolActions(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem
) {
    const actions: Action[] = []

    switch (item.kind) {
        case 'evmLog': {
            switch (item.evmLog.topics[0]) {
                case algebraPool.events.Swap.topic: {
                    const event = algebraPool.events.Swap.decode(item.evmLog)

                    const id = event.recipient
                    const poolId = item.address

                    const amount0 = event.amount0.toBigInt()
                    const amount1 = event.amount1.toBigInt()

                    // to make sure it will be prefetched
                    actions.push(new UnknownPoolAction(block, item.transaction, {id: poolId}))

                    actions.push(
                        new SwapUserAction(block, item.transaction, {
                            id,
                            amount0,
                            amount1,
                            poolId,
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
