import {BatchHandlerContext} from '@subsquid/evm-processor'

export type CommonContext<Store> = Omit<BatchHandlerContext<Store, unknown>, 'blocks'>

export type Storage<T extends Record<string, any>> = {
    [k in keyof T]: Map<string, T[k]>
}
