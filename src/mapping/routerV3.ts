import * as algebraPool from '../abi/algebraPool'
import {Action} from '../action'
import {ROUTER_V3_ADDRESS} from '../config'
import {MappingContext} from '../interfaces'
import {Log} from '../processor'
import {Item} from './common'

export function getRouterV3Actions(ctx: MappingContext<unknown>, item: Item) {
    if (item.address !== ROUTER_V3_ADDRESS) return
    // switch (item.kind) {
    //     case 'transaction': {
    //         if (item.transaction.from != null) {
    //             actions.push(new UnknownUserAction(item.block, item.transaction, {id: item.transaction.from}))
    //         }
    //         break
    //     }
    // }
}
