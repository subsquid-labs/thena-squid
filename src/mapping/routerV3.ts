import {DataHandlerContext} from '@subsquid/evm-processor'
import * as algebraPool from '../abi/algebraPool'
import {Log} from '../processor'
import {Action} from '../types/action'
import {ROUTER_V3_ADDRESS} from '../config'

export function isRouterV3Item(item: Log) {
    return item.address === ROUTER_V3_ADDRESS
}

export function getRouterV3Actions(ctx: DataHandlerContext<unknown>, item: Log) {
    const actions: Action[] = []

    // switch (item.kind) {
    //     case 'transaction': {
    //         if (item.transaction.from != null) {
    //             actions.push(new UnknownUserAction(item.block, item.transaction, {id: item.transaction.from}))
    //         }
    //         break
    //     }
    // }

    return actions
}
