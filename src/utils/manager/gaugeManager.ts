import {Gauge} from '../../model'
import {StoreWithCache} from '../store'
import {DataHandlerContext} from '@subsquid/evm-processor'

export class GaugeManager {
    private static managers: WeakMap<StoreWithCache, GaugeManager> = new WeakMap()

    static get(ctx: DataHandlerContext<StoreWithCache>) {
        let manager = this.managers.get(ctx.store)
        if (manager == null) {
            manager = new GaugeManager(ctx.store)
            this.managers.set(ctx.store, manager)
        }

        return manager
    }

    private gauges: Set<string> = new Set()
    private _initialized = false

    private constructor(private store: StoreWithCache) {}

    async init() {
        if (this._initialized) return

        const gauges = await this.store.find(Gauge, {})
        for (const gauge of gauges) {
            this.addGauge(gauge.id)
        }
        this._initialized = true
    }

    isGauge(address: string): boolean {
        return this.gauges.has(address)
    }

    addGauge(address: string) {
        this.gauges.add(address)
    }
}
