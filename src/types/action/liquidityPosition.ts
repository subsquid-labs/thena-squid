import {ActionKind, BaseAction} from './common'

export enum LiquidityPositionActionType {
    Unknown,
    ValueUpdate,
    AdjustValueUpdate,
}

export interface BaseLiquidityPositionActionData {
    id: string
    userId: string
    poolId: string
}

export abstract class BaseLiquidityPositionAction<
    T extends BaseLiquidityPositionActionData = BaseLiquidityPositionActionData
> extends BaseAction<T> {
    abstract readonly type: LiquidityPositionActionType

    readonly kind = ActionKind.LiquidityPosition
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
