import {ActionKind, BaseAction} from './common'

export enum PoolActionType {
    Unknown,
    Creation,
    Sync,
    LiquidityUpdate,
}

export interface BasePoolActionData {
    id: string
}

export abstract class BasePoolAction<T extends BasePoolActionData = BasePoolActionData> extends BaseAction<T> {
    abstract readonly type: PoolActionType

    readonly kind = ActionKind.Pool
}

export interface CreatePoolActionData extends BasePoolActionData {
    token0: string
    token1: string
    stable?: boolean
    factory: string
}

export class CreatePoolAction extends BasePoolAction<CreatePoolActionData> {
    readonly type = PoolActionType.Creation
}

export interface SyncPoolActionData extends BasePoolActionData {
    amount0: bigint
    amount1: bigint
}

export class SyncPoolAction extends BasePoolAction<SyncPoolActionData> {
    readonly type = PoolActionType.Sync
}

export interface LiquidityUpdatePoolActionData extends BasePoolActionData {
    amount: bigint
}

export class LiquidityUpdatePoolAction extends BasePoolAction<LiquidityUpdatePoolActionData> {
    readonly type = PoolActionType.LiquidityUpdate
}

export class UnknownPoolAction extends BasePoolAction {
    readonly type = PoolActionType.Unknown
}

export type PoolAction = CreatePoolAction | SyncPoolAction | LiquidityUpdatePoolAction | UnknownPoolAction
