import {EvmBlock, EvmTransaction} from '@subsquid/evm-processor'

export enum ActionKind {
    User,
    Pool,
}

export interface BaseAction<T = unknown> {
    kind: ActionKind
    block: Pick<EvmBlock, 'id' | 'hash' | 'height' | 'timestamp'>
    transaction: Pick<EvmTransaction, 'id' | 'hash'>
    data: T
}

export enum UserActionDataType {
    Unknown,
    Balance,
    Swap,
}

export interface BaseUserActionData {
    type: UserActionDataType
    id: string
}

export interface SwapUserActionData extends BaseUserActionData {
    type: UserActionDataType.Swap
    amount0: bigint
    amount1: bigint
    pool: string
}

export interface BalanceUserActionData extends BaseUserActionData {
    type: UserActionDataType.Balance
    amount: bigint
}

export interface UnknownUserActionData extends BaseUserActionData {
    type: UserActionDataType.Unknown
}

export type UserActionData = SwapUserActionData | BalanceUserActionData | UnknownUserActionData

export interface UserAction<T extends UserActionData = UserActionData> extends BaseAction<T> {
    kind: ActionKind.User
    data: T
}

export type BalanceUserAction = UserAction<BalanceUserActionData>
export type SwapUserAction = UserAction<SwapUserActionData>
export type UnknownUserAction = UserAction<UnknownUserActionData>

export enum PoolActionDataType {
    Unknown,
    Creation,
    Sync,
}

export interface BasePoolActionData {
    type: PoolActionDataType
    id: string
}

export interface CreationPoolActionData extends BasePoolActionData {
    type: PoolActionDataType.Creation
    token0: string
    token1: string
}

export interface SyncPoolActionData extends BasePoolActionData {
    type: PoolActionDataType.Sync
}

export interface UnknownPoolActionData extends BasePoolActionData {
    type: PoolActionDataType.Unknown
}

export type PoolActionData = CreationPoolActionData | SyncPoolActionData | UnknownPoolActionData

export interface PoolAction<T extends PoolActionData = PoolActionData> extends BaseAction<T> {
    kind: ActionKind.Pool
}

export type CreationPoolAction = PoolAction<CreationPoolActionData>

export type Action = UserAction | PoolAction
