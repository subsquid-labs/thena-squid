import {ActionKind, BaseAction} from './common'

export enum LiquidityPositionActionDataType {
    Unknown,
    Update,
}

export interface BaseLiquidityPositionActionData {
    type: LiquidityPositionActionDataType
    id: string
    user: string
    pool: string
}

export interface UpdateLiquidityPositionActionData extends BaseLiquidityPositionActionData {
    type: LiquidityPositionActionDataType.Update
    amount: bigint
}

export interface UnknownLiquidityPositionActionData extends BaseLiquidityPositionActionData {
    type: LiquidityPositionActionDataType.Unknown
}

export type LiquidityPositionActionData = UpdateLiquidityPositionActionData | UnknownLiquidityPositionActionData

export interface LiquidityPositionAction<T extends LiquidityPositionActionData = LiquidityPositionActionData>
    extends BaseAction<T> {
    kind: ActionKind.LiquidityPosition
}

export type UpdateLiquidityPositionAction = LiquidityPositionAction<UpdateLiquidityPositionActionData>
