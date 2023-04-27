import {ActionKind, BaseAction} from './common'

export enum LiquidityPositionActionType {
    Unknown,
    ValueUpdate,
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
}

export class ValueUpdateLiquidityPositionAction extends BaseLiquidityPositionAction<ValueUpdateLiquidityPositionActionData> {
    readonly type = LiquidityPositionActionType.ValueUpdate
}

export class UnknownLiquidityPositionAction extends BaseLiquidityPositionAction {
    readonly type = LiquidityPositionActionType.Unknown
}

export type LiquidityPositionAction = ValueUpdateLiquidityPositionAction | UnknownLiquidityPositionAction
