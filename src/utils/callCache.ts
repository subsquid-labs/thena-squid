import {Block, Chain, ChainContext, Func} from '../abi/abi.support'
import {Multicall, MulticallResult} from '../abi/multicall'
import {MULTICALL_ADDRESS} from '../config'
import crypto from 'crypto'
import {toJSON} from '@subsquid/util-internal-json'
import assert from 'assert'

type AnyFunc = Func<any[], {}, any>
type FuncReturnType<F> = F extends Func<any, {}, infer R> ? R : never
type FuncArgs<F> = F extends Func<infer R, {}, any> ? R : never

type MulticallRequest<Args extends any[], R> = [func: Func<Args, {}, R>, address: string, args: Args]
type BatchMulticallRequest = [MulticallRequest<any[], any>, ...MulticallRequest<any[], any>[]]
type BatchMulticallResult<T> = T extends [infer I, ...infer K]
    ? [I extends MulticallRequest<any, infer R> ? MulticallResult<R> : never, ...BatchMulticallResult<K>]
    : []

export class CallCache {
    private static managers: WeakMap<Chain, CallCache> = new WeakMap()

    static get(ctx: ChainContext): CallCache {
        let manager = this.managers.get(ctx._chain)
        if (manager == null) {
            manager = new CallCache(ctx._chain)
            this.managers.set(ctx._chain, manager)
        }

        return manager
    }

    private deferred: Map<Block, BatchMulticallRequest> = new Map()
    private cache: WeakMap<Block, Map<string, MulticallResult<any>>> = new WeakMap()

    private isExecuting = false

    private constructor(private chain: Chain) {}

    async call<Args extends any[], R>(block: Block, req: MulticallRequest<Args, R>): Promise<R> {
        await this.load(block)

        const hash = createRequestHash(req)

        const _cache = this.cache.get(block)
        let res = _cache?.get(hash)

        if (res == null) {
            const batch = await this.batchCall(block, [req])
            res = batch[0]
        }

        if (res.success) {
            return res.value
        } else {
            throw new Error(res.returnData)
        }
    }

    async batchCall<Batch extends BatchMulticallRequest>(
        block: Block,
        batch: Batch
    ): Promise<BatchMulticallResult<Batch>> {
        const contract = new Multicall({_chain: this.chain}, block, MULTICALL_ADDRESS)

        const rawHashes = batch.map(createRequestHash)
        const calls = new Map<string, MulticallRequest<any, any>>()
        for (let i = 0; i < batch.length; i++) {
            calls.set(rawHashes[i], batch[i])
        }

        const hashes = [...calls.keys()]
        const request = [...calls.values()]

        const response = await contract
            .tryAggregate(request, 1000)
            .then((results) => new Map(results.map((r, i) => [hashes[i], r])))

        const results: any[] = []
        for (let i = 0; i < batch.length; i++) {
            const hash = rawHashes[i]
            const result = response.get(hash)
            assert(result != null)

            let _cache = this.cache.get(block)
            if (_cache == null) {
                _cache = new Map()
                this.cache.set(block, _cache)
            }
            _cache.set(hash, result)
        }

        return results as any
    }

    defer<Args extends any[], R>(block: Block, req: MulticallRequest<Args, R>) {
        let _deferred = this.deferred.get(block)
        if (_deferred == null) {
            _deferred = [req]
            this.deferred.set(block, _deferred)
        } else {
            _deferred.push(req)
        }

        return new CallDeferredValue(this, block, req)
    }

    private async load(block: Block) {
        const _deferred = this.deferred.get(block)
        if (_deferred == null || _deferred.length == 0) return

        await this.batchCall(block, _deferred)
    }
}

function createRequestHash(req: MulticallRequest<any, any>) {
    const hash = crypto.createHash('sha256')
    hash.update(
        JSON.stringify(
            toJSON({
                sighash: req[0].sighash,
                address: req[1],
                args: req[2],
            })
        )
    )
    return hash.digest().toString('hex')
}

export class CallDeferredValue<T> {
    constructor(private manager: CallCache, private block: Block, private opts: MulticallRequest<any, T>) {}

    async get(): Promise<T> {
        return this.manager.call(this.block, this.opts)
    }
}
