import {Pool, Token} from '../../model'
import {DeferredValue} from '../../utils/deferred'
import {ActionKind, BaseAction} from './common'

export enum TokenActionType {
    Unknown,
    Ensure,
    PriceUpdate,
}

export interface BaseTokenActionData {
    token: DeferredValue<Token, true>
}

export abstract class BaseTokenAction<T extends BaseTokenActionData = BaseTokenActionData> extends BaseAction<T> {
    abstract readonly type: TokenActionType

    readonly kind = ActionKind.Token
}

export interface EnsureTokenActionData extends BaseTokenActionData {
    address: string
    decimals: DeferredValue<number>
    symbol: DeferredValue<string>
}

export class EnsureTokenAction extends BaseTokenAction<EnsureTokenActionData> {
    readonly type = TokenActionType.Ensure
}

export interface PriceUpdateTokenActionData extends BaseTokenActionData {
    pool: DeferredValue<Pool, true>
}

export class PriceUpdateTokenAction extends BaseTokenAction<PriceUpdateTokenActionData> {
    readonly type = TokenActionType.PriceUpdate
}

export class UnknownTokenAction extends BaseTokenAction {
    readonly type = TokenActionType.Unknown
}

export type TokenAction = PriceUpdateTokenAction | EnsureTokenAction | UnknownTokenAction
