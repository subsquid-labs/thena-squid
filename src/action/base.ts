import {BlockHeader, DataHandlerContext, Transaction} from '@subsquid/evm-processor'
import {StoreWithCache} from '@belopash/squid-tools'
import {withErrorContext} from '@subsquid/util-internal'
import assert from 'assert'

type Promised<T> = T extends Record<string, any>
    ? {
          [k in keyof T]: T[k] | Promise<T[k]>
      }
    : T | Promise<T>

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

            await action.perform(actionCtx).catch(
                withErrorContext({
                    block: action.block.height,
                    txHash: action.transaction.hash,
                })
            )
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
