import {Store} from '@subsquid/typeorm-store'
import {Pool} from '../../model'
import assert from 'assert'
import {DataHandlerContext} from '@subsquid/evm-processor'

export class PoolManager {
    private static managers: WeakMap<Store, PoolManager> = new WeakMap()

    static get(ctx: DataHandlerContext<Store>) {
        let manager = this.managers.get(ctx.store)
        if (manager == null) {
            manager = new PoolManager(ctx.store)
            this.managers.set(ctx.store, manager)
        }

        return manager
    }

    private pairs: Map<string, Set<string>> = new Map()
    private _initialized = false

    private constructor(private store: Store) {}

    async init() {
        if (this._initialized) return

        const pools = await this.store.find(Pool, {})
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
