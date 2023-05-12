import {Hypervisor, LiquidityPosition} from '../../model'
import {DeferredValue} from '../../utils/deferred'
import {ActionKind, BaseAction} from './common'

export enum HypervisorActionType {
    Unknown,
    Ensure,
    SetPosition,
    RemovePosition,
}

export interface BaseHypervisorActionData {
    hypervisor: DeferredValue<Hypervisor, true>
}

export abstract class BaseHypervisorAction<
    T extends BaseHypervisorActionData = BaseHypervisorActionData
> extends BaseAction<T> {
    abstract readonly type: HypervisorActionType

    readonly kind = ActionKind.Hypervisor
}

export interface EnsureHypervisorActionData extends BaseHypervisorActionData {
    address: string
    poolId: DeferredValue<string>
}

export class EnsureHypervisorAction extends BaseHypervisorAction<EnsureHypervisorActionData> {
    readonly type = HypervisorActionType.Ensure
}

export interface SetPositionHypervisorActionData extends BaseHypervisorActionData {
    position: DeferredValue<LiquidityPosition, true>
}

export class SetPositionHypervisorAction extends BaseHypervisorAction<SetPositionHypervisorActionData> {
    readonly type = HypervisorActionType.SetPosition
}

export interface RemovePositionHypervisorActionData extends BaseHypervisorActionData {
    position: DeferredValue<LiquidityPosition, true>
}

export class RemovePositionHypervisorAction extends BaseHypervisorAction<RemovePositionHypervisorActionData> {
    readonly type = HypervisorActionType.RemovePosition
}

export type HypervisorAction = EnsureHypervisorAction | SetPositionHypervisorAction | RemovePositionHypervisorAction
