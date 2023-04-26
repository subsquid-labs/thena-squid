import {ActionKind, BaseAction} from './common'

export enum UserActionDataType {
    Unknown,
    Balance,
    Swap,
    Liquidity,
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

export interface LiquidityUserActionData extends BaseUserActionData {
    type: UserActionDataType.Liquidity
    amount: bigint
    pool: string
}

export interface UnknownUserActionData extends BaseUserActionData {
    type: UserActionDataType.Unknown
}

export type UserActionData =
    | SwapUserActionData
    | BalanceUserActionData
    | LiquidityUserActionData
    | UnknownUserActionData

export interface UserAction<T extends UserActionData = UserActionData> extends BaseAction<T> {
    kind: ActionKind.User
    data: T
}

export type BalanceUserAction = UserAction<BalanceUserActionData>
export type SwapUserAction = UserAction<SwapUserActionData>
export type UnknownUserAction = UserAction<UnknownUserActionData>
