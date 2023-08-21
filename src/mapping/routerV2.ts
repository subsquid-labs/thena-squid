import {MappingContext} from '../interfaces'
import {Log} from '../processor'
import {Action} from '../action'
import {ROUTER_V2_ADDRESS} from '../config'

export function isRouterV2Item(item: Log) {
    return item.address === ROUTER_V2_ADDRESS
}

export function getRouterV2Actions(ctx: MappingContext<unknown>, item: Log) {
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
