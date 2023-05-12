import {LiquidityPosition, Pool, User} from '../../model'
import {DeferredValue} from '../../utils/deferred'
import {ActionKind, BaseAction} from './common'

export enum LiquidityPositionActionType {
    Unknown,
    ValueUpdate,
    AdjustValueUpdate,
    Ensure,
}

export interface BaseLiquidityPositionActionData {
    position: DeferredValue<LiquidityPosition, true>
}

export abstract class BaseLiquidityPositionAction<
    T extends BaseLiquidityPositionActionData = BaseLiquidityPositionActionData
> extends BaseAction<T> {
    abstract readonly type: LiquidityPositionActionType

    readonly kind = ActionKind.LiquidityPosition
}

export interface EnsureLiquidityPositionActionData extends BaseLiquidityPositionActionData {
    id: string
    user: DeferredValue<User, true>
    pool: DeferredValue<Pool, true>
}

export class EnsureLiquidityPositionAction extends BaseLiquidityPositionAction<EnsureLiquidityPositionActionData> {
    readonly type = LiquidityPositionActionType.Ensure
}

export interface ValueUpdateLiquidityPositionActionData extends BaseLiquidityPositionActionData {
    amount: bigint
    amount0?: bigint
    amount1?: bigint
}

export class ValueUpdateLiquidityPositionAction extends BaseLiquidityPositionAction<ValueUpdateLiquidityPositionActionData> {
    readonly type = LiquidityPositionActionType.ValueUpdate
}

export interface AdjustValueUpdateLiquidityPositionActionData extends BaseLiquidityPositionActionData {
    amount0: bigint
    amount1: bigint
}

export class AdjustValueUpdateLiquidityPositionAction extends BaseLiquidityPositionAction<AdjustValueUpdateLiquidityPositionActionData> {
    readonly type = LiquidityPositionActionType.AdjustValueUpdate
}

export class UnknownLiquidityPositionAction extends BaseLiquidityPositionAction {
    readonly type = LiquidityPositionActionType.Unknown
}

export type LiquidityPositionAction =
    | ValueUpdateLiquidityPositionAction
    | AdjustValueUpdateLiquidityPositionAction
    | UnknownLiquidityPositionAction
    | EnsureLiquidityPositionAction
