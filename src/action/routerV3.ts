import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import * as algebraPool from '../abi/algebraPool'
import {ProcessorItem} from '../processor'
import {Action, ActionKind, PoolActionDataType, UserActionDataType} from './types'
import {ROUTER_V3_ADDRESS} from '../config'

export function isRouterV3Item(item: ProcessorItem) {
    return (
        item.address === ROUTER_V3_ADDRESS ||
        (item.kind === 'evmLog' && item.evmLog.topics[0] === algebraPool.events.Swap.topic)
    )
}

export function getRouterV3Actions(ctx: BatchHandlerContext<unknown, unknown>, block: EvmBlock, item: ProcessorItem) {
    const actions: Action[] = []

    switch (item.kind) {
        case 'transaction': {
            if (item.transaction.from != null) {
                actions.push({
                    kind: ActionKind.User,
                    block,
                    transaction: item.transaction,
                    data: {
                        id: item.transaction.from,
                        type: UserActionDataType.Unknown,
                    },
                })
            }
            break
        }
    }

    return actions
}
