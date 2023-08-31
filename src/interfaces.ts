import {DataHandlerContext} from '@subsquid/evm-processor'
import {ActionQueue} from './action/actionQueue'

export type MappingContext<Store> = Omit<DataHandlerContext<Store, {}>, 'blocks'> & {queue: ActionQueue}
