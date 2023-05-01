import {DeferredValue} from '../../utils/deferred'
import {ActionKind, BaseAction} from './common'

export enum TokenActionType {
    Unknown,
    Init,
    PriceUpdate,
}

export interface BaseTokenActionData {
    id: string
}

export abstract class BaseTokenAction<T extends BaseTokenActionData = BaseTokenActionData> extends BaseAction<T> {
    abstract readonly type: TokenActionType

    readonly kind = ActionKind.Token
}

export interface InitTokenActionData extends BaseTokenActionData {
    decimals: DeferredValue<number>
    symbol: DeferredValue<string>
}

export class InitTokenAction extends BaseTokenAction<InitTokenActionData> {
    readonly type = TokenActionType.Init
}

export interface PriceUpdateTokenActionData extends BaseTokenActionData {
    poolId: string
}

export class PriceUpdateTokenAction extends BaseTokenAction<PriceUpdateTokenActionData> {
    readonly type = TokenActionType.PriceUpdate
}

export class UnknownTokenAction extends BaseTokenAction {
    readonly type = TokenActionType.Unknown
}

export type TokenAction = PriceUpdateTokenAction | InitTokenAction | UnknownTokenAction
