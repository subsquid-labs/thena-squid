import assert from 'assert'
import {Block, Func, ChainContext} from '../abi/abi.support'
import {Multicall, MulticallResult} from '../abi/multicall'
import {MULTICALL_ADDRESS} from '../config'

export class DeferredCall<F extends Func<any, {}, any>> {
    private static cache = new WeakMap<Block, DeferredCall<any>[]>()
    private static results = new WeakMap<DeferredCall<any>, MulticallResult<any>>()

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

    private data: [func: F, address: string, args: any[]]

    constructor(private block: Block, address: string, func: F, ...args: F extends Func<infer R, {}, any> ? R : never) {
        this.data = [func, address, args]

        const blockCache = DeferredCall.getCache(block)
        blockCache.push(this)
    }

    async result(ctx: ChainContext): Promise<F extends Func<any, {}, infer R> ? R : never> {
        await DeferredCall.execute(ctx, this.block)
        const result = DeferredCall.results.get(this)
        assert(result != null)

        if (result.success) {
            return result.value
        } else {
            throw new Error(result.returnData)
        }
    }
}
