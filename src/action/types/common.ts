import {EvmBlock, EvmTransaction} from '@subsquid/evm-processor'

export enum ActionKind {
    User,
    Pool,
    LiquidityPosition,
}

export interface BaseAction<T = unknown> {
    kind: ActionKind
    block: Pick<EvmBlock, 'id' | 'hash' | 'height' | 'timestamp'>
    transaction: Pick<EvmTransaction, 'id' | 'hash'>
    data: T
}
