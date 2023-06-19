import assert from 'assert'
import {def} from '@subsquid/util-internal'
import {Chain, ChainContext} from '../abi/abi.support'
import {DeferredValue} from './deferred'
import {splitIntoBatches} from './misc'

export class ContractChecker {
    private static checkers: WeakMap<Chain, ContractChecker> = new WeakMap()

    static get(ctx: ChainContext): ContractChecker {
        let checker = this.checkers.get(ctx._chain)
        if (checker == null) {
            checker = new ContractChecker(ctx._chain)
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

        for (let batch of splitIntoBatches([...this.deferred], 100)) {
            await Promise.all(
                batch.map(async (address) => {
                    let res = await this.chain.client.call('eth_getCode', [address, 'latest'])
                    this.results.set(address, res !== '0x')
                })
            )
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
