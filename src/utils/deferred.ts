import assert from 'assert'
import {Block, Func, ChainContext} from '../abi/abi.support'
import {Multicall, MulticallResult} from '../abi/multicall'
import {MULTICALL_ADDRESS} from '../config'
import {functions} from '../abi/algebraPool'

type AnyFunction = Func<any, {}, any>
type GetReturnValue<T> = T extends Func<any, {}, infer R>
    ? {
          [K in keyof R]: R[K]
      } & {}
    : never

export class DeferredCall<T, F extends AnyFunction> implements DeferredValue<T> {
    private static cache = new WeakMap<Block, DeferredCall<any, AnyFunction>[]>()
    private static results = new WeakMap<DeferredCall<any, AnyFunction>, MulticallResult<any>>()

    private static getCache(block: Block) {
        let blockCache = this.cache.get(block)
        if (blockCache == null) {
            blockCache = []
            this.cache.set(block, blockCache)
        }

        return blockCache
    }

    private static async execute(ctx: ChainContext, block: Block) {
        const blockCache = DeferredCall.getCache(block)
        const data = blockCache.map((c) => c.data)

        const contract = new Multicall(ctx, block, MULTICALL_ADDRESS)
        const results = await contract.tryAggregate(data)
        const blockResults = DeferredCall.results
        for (let i = 0; i < blockCache.length; i++) {
            const call = blockCache[i]
            const result = results[i]
            blockResults.set(call, result)
        }
        this.cache.set(block, [])
    }

    protected data: [func: F, address: string, args: any[]]
    private transform: (value: GetReturnValue<F>) => T

    constructor(
        private block: Block,
        options: {
            address: string
            func: F
            args: F extends Func<infer R, {}, any> ? R : never
            transform?: (value: GetReturnValue<F>) => T
        }
    ) {
        this.data = [options.func, options.address, options.args]
        this.transform = options.transform || ((value) => value)

        const blockCache = DeferredCall.getCache(block)
        blockCache.push(this)
    }

    async get(ctx: ChainContext): Promise<T> {
        await DeferredCall.execute(ctx, this.block)
        const result = DeferredCall.results.get(this)
        assert(result != null)

        if (result.success) {
            return this.transform(result.value)
        } else {
            throw new Error(result.returnData)
        }
    }
}

export interface DeferredValue<T> {
    get(ctx: ChainContext): Promise<T>
}
