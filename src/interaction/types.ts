import {EvmBlock, EvmTransaction} from '@subsquid/evm-processor'

export enum InteractionType {
    Unknown,
    Balance,
    Swap,
}

interface BaseInteraction {
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

export enum ProviderType {
    Solidly,
    Algebra,
}

export interface BaseSwapInteraction extends BaseInteraction {
    type: InteractionType.Swap
    provider: ProviderType
    amount0: bigint
    amount1: bigint
    pool: string
}

export interface SolidlySwapInteraction extends BaseSwapInteraction {
    provider: ProviderType.Solidly
    // tokenIn: string
}

export interface AlgebraSwapInteraction extends BaseSwapInteraction {
    provider: ProviderType.Algebra
}

export type SwapInteraction = SolidlySwapInteraction | AlgebraSwapInteraction

export type Interaction = UnknownInteraction | BalanceInteraction | SwapInteraction
