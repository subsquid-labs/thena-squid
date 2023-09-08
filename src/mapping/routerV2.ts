import {MappingContext} from '../interfaces'
import {ROUTER_V2_ADDRESS} from '../config'
import {Item} from './common'

export function getRouterV2Actions(ctx: MappingContext<unknown>, item: Item) {
    if (item.address !== ROUTER_V2_ADDRESS) return
    // switch (item.kind) {
    //     case 'transaction': {
    //         if (item.transaction.from != null) {
    //             actions.push(new UnknownUserAction(item.block, item.transaction, {id: item.transaction.from}))
    //         }
    //         break
    //     }
    // }
}
