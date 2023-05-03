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

export class DeferredCall<F extends AnyFunction, T = GetReturnValue<F>> implements DeferredValue<T> {
    private static cache = new WeakMap<Block, DeferredCall<AnyFunction, any>[]>()
    private static results = new WeakMap<DeferredCall<AnyFunction, any>, MulticallResult<any>>()

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
        if (blockCache.length == 0) return

        const contract = new Multicall(ctx, block, MULTICALL_ADDRESS)
        const data = blockCache.map((c) => c.data)
        const results = await contract.tryAggregate(data)
        const blockResults = DeferredCall.results
        for (let i = 0; i < blockCache.length; i++) {
            const call = blockCache[i]
            const result = results[i]
            blockResults.set(call, result)
        }
        this.cache.set(block, [])
        console.log(`Executed on block ${block.height} for ${data.length} calls`)
    }

    protected data: [func: F, address: string, args: any[]]
    private transform: (value: any) => T

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
        this.transform = options.transform || ((v) => v)
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

export class DefferedFunction<T> implements DeferredValue<T> {
    constructor(private f: (ctx: ChainContext) => Promise<T>) {}

    async get(ctx: ChainContext): Promise<T> {
        return await this.f(ctx)
    }
}

export class WrappedValue<T> implements DeferredValue<T> {
    constructor(private value: T) {}

    async get(): Promise<T> {
        return this.value
    }
}

export interface DeferredValue<T> {
    get(ctx: ChainContext): Promise<T>
}
