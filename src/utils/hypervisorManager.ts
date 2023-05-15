import {Hypervisor} from '../model'
import assert from 'assert'
import {loadHypervisors} from './loaders'
import {StoreWithCache} from './store'

export class HypervisorManager {
    private static _instance: HypervisorManager | undefined

    static get instance() {
        return HypervisorManager._instance || new HypervisorManager()
    }

    private tracked = new Set<string>()
    private known = new Set<string>()
    private _initialized = false

    get initialized() {
        return this._initialized
    }

    private constructor() {
        HypervisorManager._instance = this
    }

    async init(store: StoreWithCache) {
        const hps = await store.find(Hypervisor, {})
        hps.push()
        for (const hp of hps) {
            this.add(hp.id)
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

    add(address: string) {
        this.tracked.add(address)
    }
}
