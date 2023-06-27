import assert from 'assert'
import {Block, Func, ChainContext} from '../abi/abi.support'
import {Multicall, MulticallResult} from '../abi/multicall'
import {MULTICALL_ADDRESS} from '../config'





export class DeferredFunction<T> implements DeferredValue<T> {
    constructor(private f: () => Promise<T>) {}

    async get(): Promise<T> {
        return await this.f()
    }
}

export class WrappedValue<T> implements DeferredValue<T> {
    constructor(private value: T) {}

    async get(): Promise<T> {
        return this.value
    }
}

export interface DeferredValue<T, Nullable extends boolean = false> {

    get(): Promise<Nullable extends true ? T | undefined : T>
}
