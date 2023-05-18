import {BlockHeader, DataHandlerContext, Transaction} from '@subsquid/evm-processor'
import {StoreWithCache} from '../utils/store'
import assert from 'assert'

export abstract class Action<T = unknown> {
    protected performed = false

    constructor(
        readonly block: Pick<BlockHeader, 'id' | 'hash' | 'height' | 'timestamp'>,
        readonly transaction: Pick<Transaction, 'id' | 'hash'>,
        readonly data: T
    ) {}

    async perform(ctx: DataHandlerContext<StoreWithCache>): Promise<void> {
        assert(!this.performed)
        await this._perform(ctx)
        this.performed = true
    }

    protected abstract _perform(ctx: DataHandlerContext<StoreWithCache>): Promise<void>
}
