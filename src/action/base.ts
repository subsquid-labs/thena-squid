import {BlockHeader, DataHandlerContext, Transaction} from '@subsquid/evm-processor'
import {StoreWithCache} from '../utils/store'
import assert from 'assert'

export abstract class Action<T = unknown> {
    static async process(ctx: DataHandlerContext<StoreWithCache>, actions: Action[]) {
        for (const action of actions) {
            const actionCtx = {
                ...ctx,
                log: ctx.log.child('actions', {
                    block: action.block.height,
                    transaction: action.transaction.hash,
                }),
            }

            try {
                await action.perform(actionCtx)
            } catch (err) {
                ctx.log.fatal({err, block: action.block.height, txHash: action.transaction.hash})
                throw err
            }
        }
    }

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

export class LazyAction extends Action {
    constructor(
        block: Pick<BlockHeader, 'id' | 'hash' | 'height' | 'timestamp'>,
        transaction: Pick<Transaction, 'id' | 'hash'>,
        readonly cb: (ctx: DataHandlerContext<StoreWithCache>) => Promise<Action[]>
    ) {
        super(block, transaction, {})
    }

    protected async _perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
        const actions = await this.cb(ctx)
        await Action.process(ctx, actions)
    }
}
