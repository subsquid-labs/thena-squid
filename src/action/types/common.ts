import {EvmBlock, EvmTransaction} from '@subsquid/evm-processor'

export enum ActionKind {
    User,
    Pool,
    LiquidityPosition,
}

export interface IAction<T = unknown> {
    readonly kind: ActionKind
    readonly block: Pick<EvmBlock, 'id' | 'hash' | 'height' | 'timestamp'>
    readonly transaction: Pick<EvmTransaction, 'id' | 'hash'>
    readonly data: T
}

export abstract class BaseAction<T = unknown> {
    abstract readonly kind: ActionKind

    constructor(
        readonly block: Pick<EvmBlock, 'id' | 'hash' | 'height' | 'timestamp'>,
        readonly transaction: Pick<EvmTransaction, 'id' | 'hash'>,
        readonly data: T
    ) {}
}
