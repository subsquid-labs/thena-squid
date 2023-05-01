import {ActionKind, BaseAction} from './common'

export enum PoolActionType {
    Unknown,
    Creation,
    SetBalances,
    ChangeBalances,
    SetLiquidity,
    ChangeLiquidity,
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

export interface SetBalancesPoolActionData extends BasePoolActionData {
    value0: bigint
    value1: bigint
}

export class SetBalancesPoolAction extends BasePoolAction<SetBalancesPoolActionData> {
    readonly type = PoolActionType.SetBalances
}

export interface ChangeBalancesPoolActionData extends BasePoolActionData {
    value0: bigint
    value1: bigint
}

export class ChangeBalancesPoolAction extends BasePoolAction<ChangeBalancesPoolActionData> {
    readonly type = PoolActionType.ChangeBalances
}

export interface ChangeLiquidityPoolActionData extends BasePoolActionData {
    amount: bigint
}

export class ChangeLiquidityPoolAction extends BasePoolAction<ChangeLiquidityPoolActionData> {
    readonly type = PoolActionType.ChangeLiquidity
}

export interface SetLiquidityPoolActionData extends BasePoolActionData {
    value: bigint
}

export class SetLiquidityPoolAction extends BasePoolAction<SetLiquidityPoolActionData> {
    readonly type = PoolActionType.SetLiquidity
}

export class UnknownPoolAction extends BasePoolAction {
    readonly type = PoolActionType.Unknown
}

export type PoolAction =
    | CreatePoolAction
    | SetBalancesPoolAction
    | ChangeBalancesPoolAction
    | SetLiquidityPoolAction
    | ChangeLiquidityPoolAction
    | UnknownPoolAction
