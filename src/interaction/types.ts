import {EvmBlock, EvmTransaction} from '@subsquid/evm-processor'

export enum InteractionType {
    Unknown,
    Balance,
    Swap,
}

export interface BaseInteraction {
    id: string
    type: InteractionType
    block: Pick<EvmBlock, 'id' | 'hash' | 'height' | 'timestamp'>
    transaction: Pick<EvmTransaction, 'id' | 'hash'>
}

export interface UnknownInteraction extends BaseInteraction {
    type: InteractionType.Unknown
}

export interface BalanceInteraction extends BaseInteraction {
    type: InteractionType.Balance
    amount: bigint
}

export interface SwapInteraction extends BaseInteraction {
    type: InteractionType.Swap
    tokenIn: string
    amountIn: bigint
    tokenOut: string
    amountOut: bigint
    route: string
}

export type Interaction = UnknownInteraction | BalanceInteraction | SwapInteraction
