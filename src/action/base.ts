import {DataHandlerContext, BlockHeader, Transaction} from '@subsquid/evm-processor'
import {StoreWithCache} from '@belopash/squid-tools'

export type ActionContext = DataHandlerContext<StoreWithCache, {}>
export type ActionBlock = Pick<BlockHeader, 'hash' | 'height' | 'timestamp'>
export type ActionTransaction = Pick<Transaction, 'id' | 'hash'>

export type ActionData<A> = A extends Action<infer D> ? D : never

export interface ActionConstructor<A extends Action> {
    new (block: ActionBlock, transaction: ActionTransaction, data: A extends Action<infer R> ? R : never): A
}

export abstract class Action<T = any> {
    constructor(readonly block: ActionBlock, readonly transaction: ActionTransaction, readonly data: T) {}

    prepare(ctx: ActionContext): void {}

    abstract perform(ctx: ActionContext): Promise<void>
}
