import assert from 'assert'
import {def} from '@subsquid/util-internal'
import {DeferredValue} from './deferred'
import {Chain} from '@subsquid/evm-processor/lib/interfaces/chain'

export interface ChainContext {
    _chain: Chain
}

export class ContractChecker {
    private static checkers: WeakMap<Chain, ContractChecker> = new WeakMap()

    static get(ctx: ChainContext): ContractChecker {
        let checker = this.checkers.get(ctx._chain)
        if (checker == null) {
            checker = new ContractChecker(ctx._chain)
            this.checkers.set(ctx._chain, checker)
        }

        return checker
    }

    private deferred: Set<string> = new Set()
    private results: Map<string, boolean> = new Map()

    private constructor(private chain: Chain) {}

    defer(address: string): CheckerDeferredValue {
        if (!this.results.has(address)) {
            this.deferred.add(address)
        }

        return new CheckerDeferredValue(this, address)
    }

    async check(address: string): Promise<boolean> {
        await this.execute()

        const res = this.results.get(address)
        assert(res != null)
        return res
    }

    private async execute() {
        if (this.deferred.size == 0) return

        const addresses = [...this.deferred]
        const batch = addresses.map((address) => ({
            method: 'eth_getCode',
            params: [address, 'latest'],
        }))
        const results = await this.chain.client.batchCall(batch)

        for (let i = 0; i < addresses.length; i++) {
            this.results.set(addresses[i], results[i] !== '0x')
        }

        this.deferred.clear()
    }
}

export class CheckerDeferredValue implements DeferredValue<boolean> {
    constructor(private checker: ContractChecker, private address: string) {}

    @def
    async get(): Promise<boolean> {
        return await this.checker.check(this.address)
    }
}
