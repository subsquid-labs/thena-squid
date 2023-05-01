import {DeferredCall} from '../../utils/deferred'
import {ActionKind, BaseAction} from './common'
import {functions} from '../../abi/bep20'

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
    decimals: DeferredCall<typeof functions.decimals>
    symbol: DeferredCall<typeof functions.symbol>
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
