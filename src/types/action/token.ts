import {ActionKind, BaseAction} from './common'

export enum TokenActionType {
    Unknown,
    PriceUpdate,
}

export interface BaseTokenActionData {
    id: string
}

export abstract class BaseTokenAction<T extends BaseTokenActionData = BaseTokenActionData> extends BaseAction<T> {
    abstract readonly type: TokenActionType

    readonly kind = ActionKind.Token
}

export interface PriceUpdateTokenActionData extends BaseTokenActionData {
    poolId: string
}

export class PriceUpdateTokenActionData extends BaseTokenAction<PriceUpdateTokenActionData> {
    readonly type = TokenActionType.PriceUpdate
}

export class UnknownUserAction extends BaseTokenAction {
    readonly type = TokenActionType.Unknown
}

export type TokenAction = PriceUpdateTokenActionData | UnknownUserAction
