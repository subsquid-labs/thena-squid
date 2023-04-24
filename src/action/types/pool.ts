import {ActionKind, BaseAction} from './common'

export enum PoolActionDataType {
    Unknown,
    Creation,
    Sync,
    Liquidity,
}

export interface BasePoolActionData {
    type: PoolActionDataType
    id: string
}

export interface CreationPoolActionData extends BasePoolActionData {
    type: PoolActionDataType.Creation
    token0: string
    token1: string
    factory: string
}

export interface SyncPoolActionData extends BasePoolActionData {
    type: PoolActionDataType.Sync
    amount0: bigint
    amount1: bigint
}

export interface LiquidityPoolActionData extends BasePoolActionData {
    type: PoolActionDataType.Liquidity
    amount: bigint
}

export interface UnknownPoolActionData extends BasePoolActionData {
    type: PoolActionDataType.Unknown
}

export type PoolActionData =
    | CreationPoolActionData
    | SyncPoolActionData
    | LiquidityPoolActionData
    | UnknownPoolActionData

export interface PoolAction<T extends PoolActionData = PoolActionData> extends BaseAction<T> {
    kind: ActionKind.Pool
}

export type CreationPoolAction = PoolAction<CreationPoolActionData>
export type SyncPoolAction = PoolAction<SyncPoolActionData>
export type LiquidityPoolAction = PoolAction<LiquidityPoolActionData>
