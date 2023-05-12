import {Pool, Token, User} from '../../model'
import {DeferredValue} from '../../utils/deferred'
import {ActionKind, BaseAction} from './common'

export enum UserActionType {
    Unknown,
    Balance,
    Swap,
    Liquidity,
    Ensure,
}

export interface BaseUserActionData {
    user: DeferredValue<User, true>
}

export abstract class BaseUserAction<T extends BaseUserActionData = BaseUserActionData> extends BaseAction<T> {
    abstract readonly type: UserActionType

    readonly kind: ActionKind.User = ActionKind.User
}

export interface EnsureUserActionData extends BaseUserActionData {
    address: string
}

export class EnsureUserAction extends BaseUserAction<EnsureUserActionData> {
    readonly type = UserActionType.Ensure
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
    pool: DeferredValue<Pool, true>
    usdToken: DeferredValue<Token, true>
}

export class SwapUserAction extends BaseUserAction<SwapUserActionData> {
    readonly type = UserActionType.Swap
}

export class UnknownUserAction extends BaseUserAction {
    readonly type = UserActionType.Unknown
}

export type UserAction = BalanceUserAction | SwapUserAction | UnknownUserAction | EnsureUserAction
