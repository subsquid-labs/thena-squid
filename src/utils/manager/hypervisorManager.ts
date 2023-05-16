import {Hypervisor} from '../../model'
import assert from 'assert'
import {loadHypervisors} from '../loaders'
import {StoreWithCache} from '../store'
import {DataHandlerContext} from '@subsquid/evm-processor'

export class HypervisorManager {
    private static managers: WeakMap<StoreWithCache, HypervisorManager> = new WeakMap()

    static get(ctx: DataHandlerContext<StoreWithCache>) {
        let manager = this.managers.get(ctx.store)
        if (manager == null) {
            manager = new HypervisorManager(ctx.store)
            this.managers.set(ctx.store, manager)
        }

        return manager
    }

    private tracked = new Set<string>()
    private known = new Set<string>()
    private _initialized = false

    private constructor(private store: StoreWithCache) {}

    async init() {
        if (this._initialized) return

        const hps = await this.store.find(Hypervisor, {})
        hps.push()
        for (const hp of hps) {
            this.addHypervisor(hp.id)
        }
        for (const address of loadHypervisors().addresses) {
            this.known.add(address)
        }
        this._initialized = true
    }

    isHypervisor(address: string): boolean {
        return this.known.has(address)
    }

    isTracked(address: string): boolean {
        assert(this.isHypervisor(address))
        return this.tracked.has(address)
    }

    addHypervisor(address: string) {
        this.tracked.add(address)
    }
}
