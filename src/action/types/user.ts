import {ActionKind, BaseAction} from './common'

export enum UserActionType {
    Unknown,
    Balance,
    Swap,
    Liquidity,
}

export interface BaseUserActionData {
    id: string
}

export abstract class BaseUserAction<T extends BaseUserActionData = BaseUserActionData> extends BaseAction<T> {
    abstract readonly type: UserActionType

    readonly kind: ActionKind.User = ActionKind.User
}
export interface BalanceUserActionData extends BaseUserActionData {
    amount: bigint
}

export class BalanceUserAction extends BaseUserAction<BalanceUserActionData> {
    readonly type = UserActionType.Balance
}

export interface SwapUserActionData extends BaseUserActionData {
    amount0: bigint
    amount1: bigint
    poolId: string
}

export class SwapUserAction extends BaseUserAction<SwapUserActionData> {
    readonly type = UserActionType.Swap
}

export class UnknownUserAction extends BaseUserAction {
    readonly type = UserActionType.Unknown
}

export type UserAction = BalanceUserAction | SwapUserAction | UnknownUserAction
