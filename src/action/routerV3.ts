import {BatchHandlerContext, EvmBlock} from '@subsquid/evm-processor'
import * as algebraPool from '../abi/algebraPool'
import {ProcessorItem} from '../processor'
import {Action, UnknownUserAction} from './types'
import {ROUTER_V3_ADDRESS} from '../config'

export function isRouterV3Item(item: ProcessorItem) {
    return item.address === ROUTER_V3_ADDRESS
}

export function getRouterV3Actions(ctx: BatchHandlerContext<unknown, unknown>, block: EvmBlock, item: ProcessorItem) {
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
