import {BlockHeader, DataHandlerContext, Transaction} from '@subsquid/evm-processor'
import {StoreWithCache} from '../utils/store'

export abstract class Action<T = unknown> {
    constructor(
        readonly block: Pick<BlockHeader, 'id' | 'hash' | 'height' | 'timestamp'>,
        readonly transaction: Pick<Transaction, 'id' | 'hash'>,
        readonly data: T
    ) {}

    abstract perform(ctx: DataHandlerContext<StoreWithCache>): Promise<void>
}
