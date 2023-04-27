import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import {ProcessorItem} from '../processor'
import {Action, UnknownUserAction} from './types'
import {ROUTER_V2_ADDRESS} from '../config'

export function isRouterV2Item(item: ProcessorItem) {
    return item.address === ROUTER_V2_ADDRESS
}

export function getRouterV2Actions(ctx: BatchHandlerContext<unknown, unknown>, block: EvmBlock, item: ProcessorItem) {
    const actions: Action[] = []

    switch (item.kind) {
        case 'transaction': {
            if (item.transaction.from != null) {
                actions.push(new UnknownUserAction(block, item.transaction, {id: item.transaction.from}))
            }
            break
        }
    }

    return actions
}
