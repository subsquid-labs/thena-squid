import {Bribe} from '../../model'
import {StoreWithCache} from '../store'
import {DataHandlerContext} from '@subsquid/evm-processor'

export class BribeManager {
    private static managers: WeakMap<StoreWithCache, BribeManager> = new WeakMap()

    static get(ctx: DataHandlerContext<StoreWithCache>) {
        let manager = this.managers.get(ctx.store)
        if (manager == null) {
            manager = new BribeManager(ctx.store)
            this.managers.set(ctx.store, manager)
        }

        return manager
    }

    private gauges: Set<string> = new Set()
    private _initialized = false

    private constructor(private store: StoreWithCache) {}

    async init() {
        if (this._initialized) return

        const gauges = await this.store.find(Bribe, {})
        for (const gauge of gauges) {
            this.addBribe(gauge.id)
        }
        this._initialized = true
    }

    isBribe(address: string): boolean {
        return this.gauges.has(address) ?? false
    }

    addBribe(address: string) {
        this.gauges.add(address)
    }
}
