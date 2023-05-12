import {Store} from '@subsquid/typeorm-store'
import {Pool} from '../model'
import assert from 'assert'

export class PoolManager {
    private static _instance: PoolManager | undefined

    static get instance() {
        return PoolManager._instance || new PoolManager()
    }

    private pairs: Map<string, Set<string>> = new Map()
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
            this.addPool(pool.factory || 'null', pool.id)
        }
        this._initialized = true
    }

    isPool(factory: string, address: string): boolean {
        return this.pairs.get(factory)?.has(address) ?? false
    }

    addPool(factory: string, address: string) {
        let set = this.pairs.get(factory)
        if (set == null) {
            set = new Set()
            this.pairs.set(factory, set)
        }
        set.add(address)
    }
}
