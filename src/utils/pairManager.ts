import {Store} from '@subsquid/typeorm-store'
import {Pool} from '../model'
import assert from 'assert'

export class PoolManager {
    private static _instance: PoolManager | undefined

    static get instance() {
        return PoolManager._instance || new PoolManager()
    }

    private pairs: Map<string, Set<string>> = new Map()
    private tokens: Map<string, {token0: string; token1: string}> = new Map()
    private _initialized = false

    get initialized() {
        return this._initialized
    }

    private constructor() {
        PoolManager._instance = this
    }

    async init(store: Store) {
        const pools = await store.find(Pool, {})
        for (const pool of pools) {
            this.addPool(pool.factory, pool.id, {token0: pool.token0Id, token1: pool.token1Id})
        }
        this._initialized = true
    }

    isPool(factory: string, address: string): boolean {
        return this.pairs.get(factory)?.has(address) ?? false
    }

    addPool(factory: string, address: string, tokens: {token0: string; token1: string}) {
        let set = this.pairs.get(factory)
        if (set == null) {
            set = new Set()
            this.pairs.set(factory, set)
        }
        set.add(address)
        this.tokens.set(address, tokens)
    }

    getTokens(address: string) {
        const tokens = this.tokens.get(address)
        assert(tokens != null)
        return tokens
    }
}
