import {MappingContext} from '../interfaces'
import * as algebraPool from '../abi/algebraPool'
import {Log} from '../processor'
import {Action} from '../action'
import {ROUTER_V3_ADDRESS} from '../config'

export function isRouterV3Item(item: Log) {
    return item.address === ROUTER_V3_ADDRESS
}

export function getRouterV3Actions(ctx: MappingContext<unknown>, item: Log) {
    // switch (item.kind) {
    //     case 'transaction': {
    //         if (item.transaction.from != null) {
    //             actions.push(new UnknownUserAction(item.block, item.transaction, {id: item.transaction.from}))
    //         }
    //         break
    //     }
    // }
}
