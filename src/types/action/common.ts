import {BlockHeader, Transaction} from '@subsquid/evm-processor'

export enum ActionKind {
    User,
    Pool,
    LiquidityPosition,
    Token,
    Hypervisor,
}

export interface IAction<T = unknown> {
    readonly kind: ActionKind
    readonly block: Pick<BlockHeader, 'id' | 'hash' | 'height' | 'timestamp'>
    readonly transaction: Pick<Transaction, 'id' | 'hash'>
    readonly data: T
}

export abstract class BaseAction<T = unknown> {
    abstract readonly kind: ActionKind

    constructor(
        readonly block: Pick<BlockHeader, 'id' | 'hash' | 'height' | 'timestamp'>,
        readonly transaction: Pick<Transaction, 'id' | 'hash'>,
        readonly data: T
    ) {}
}
