import {StoreWithCache} from '@belopash/typeorm-store'
import {Bribe} from '../../model'
import {DataHandlerContext} from '@subsquid/evm-processor'

export class BribeManager {
    private static managers: WeakMap<StoreWithCache, BribeManager> = new WeakMap()

    static get(ctx: {store: StoreWithCache}) {
        let manager = this.managers.get(ctx.store)
        if (manager == null) {
            manager = new BribeManager(ctx.store)
            this.managers.set(ctx.store, manager)
        }

        return manager
    }

    private bribes: Set<string> = new Set()
    private _initialized = false

    private constructor(private store: StoreWithCache) {}

    async init() {
        if (this._initialized) return

        const bribes = await this.store.find(Bribe, {})
        for (const bribe of bribes) {
            this.addBribe(bribe.id)
        }
        this._initialized = true
    }

    isBribe(address: string): boolean {
        return this.bribes.has(address)
    }

    addBribe(address: string) {
        this.bribes.add(address)
    }
}
