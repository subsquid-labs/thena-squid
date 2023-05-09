import {DataHandlerContext} from '@subsquid/evm-processor'

export * from './action'

export type CommonContext<Store> = Omit<DataHandlerContext<Store>, 'blocks'>

export type Storage<T extends Record<string, any>> = {
    [k in keyof T]: Map<string, T[k]>
}
