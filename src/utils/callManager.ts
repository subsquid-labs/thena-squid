import assert from 'assert'
import {def} from '@subsquid/util-internal'
import {Block, Chain, ChainContext, Func} from '../abi/abi.support'
import {Multicall, MulticallResult} from '../abi/multicall'
import {MULTICALL_ADDRESS} from '../config'
import {DeferredValue} from './deferred'
import crypto from 'crypto'

type AnyFunction = Func<any, {}, any>
type FuncReturnType<F> = F extends Func<any, {}, infer R> ? R : never
type FuncArgs<F> = F extends Func<infer R, {}, any> ? R : never

export class CallManager {
    private static managers: WeakMap<Chain, CallManager> = new WeakMap()

    static get(ctx: ChainContext): CallManager {
        let manager = this.managers.get(ctx._chain)
        if (manager == null) {
            manager = new CallManager(ctx._chain)
        }

        return manager
    }

    private cache: WeakMap<Block, Map<string, [AnyFunction, string, any[]]>> = new WeakMap()
    private results: WeakMap<Block, Map<string, MulticallResult<any>>> = new WeakMap()

    private constructor(private chain: Chain) {}

    defer<F extends AnyFunction, R = FuncReturnType<F>>(
        block: Block,
        func: F,
        opts: {
            address: string
            args: FuncArgs<F>
            transform?: (v: FuncReturnType<F>) => R
        }
    ): CallDeferredValue<F, R> {
        const hash = crypto.createHash('sha256')
        hash.update(opts.address.toLowerCase() + func.encode(opts.args))
        const hexHash = hash.digest().toString('hex')

        const _results = this.getResults(block)
        if (!_results.has(hexHash)) {
            const _cache = this.getCache(block)
            _cache.set(hexHash, [func, opts.address, opts.args])
        }

        return new CallDeferredValue(this, block, hexHash, opts.transform)
    }

    async getResult<T>(block: Block, hash: string): Promise<MulticallResult<T>> {
        await this.execute(block)
        const _results = this.getResults(block)
        const res = _results.get(hash)
        assert(res != null)
        return res
    }

    private async execute(block: Block) {
        const _cache = this.getCache(block)
        if (_cache.size == 0) return

        const contract = new Multicall({_chain: this.chain}, block, MULTICALL_ADDRESS)
        const hashes = [..._cache.keys()]
        const data = [..._cache.values()]
        const results = await contract.tryAggregate(data, 1000)

        const _results = this.getResults(block)
        for (let i = 0; i < hashes.length; i++) {
            const hash = hashes[i]
            const result = results[i]
            _results.set(hash, result)
        }
        _cache.clear()
    }

    private getCache(block: Block) {
        let blockCache = this.cache.get(block)
        if (blockCache == null) {
            blockCache = new Map()
            this.cache.set(block, blockCache)
        }

        return blockCache
    }

    private getResults(block: Block) {
        let blockResults = this.results.get(block)
        if (blockResults == null) {
            blockResults = new Map()
            this.results.set(block, blockResults)
        }

        return blockResults
    }
}

export class CallDeferredValue<F extends AnyFunction = AnyFunction, T = FuncReturnType<F>> implements DeferredValue<T> {
    constructor(
        private manager: CallManager,
        private block: Block,
        private hash: string,
        private transform?: (v: FuncReturnType<F>) => T
    ) {}

    @def
    async get(): Promise<T> {
        const res = await this.manager.getResult<FuncReturnType<F>>(this.block, this.hash)
        if (res.success) {
            return this.transform == null ? res.value : this.transform(res.value)
        } else {
            throw new Error(res.returnData)
        }
    }
}
