import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import * as pair from '../abi/solidlyPair'
import * as solidlyPair from '../abi/solidlyPair'
import {ProcessorItem} from '../processor'
import {Action, ActionKind, PoolActionDataType, UserActionDataType} from './types'
import {ROUTER_V2_ADDRESS} from '../config'

export function isRouterV2Item(item: ProcessorItem) {
    return item.address === ROUTER_V2_ADDRESS
}

export async function getRouterV2Actions(
    ctx: BatchHandlerContext<unknown, unknown>,
    block: EvmBlock,
    item: ProcessorItem
) {
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
