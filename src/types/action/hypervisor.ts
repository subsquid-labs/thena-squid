import {DeferredValue} from '../../utils/deferred'
import {ActionKind, BaseAction} from './common'

export enum HypervisorActionType {
    Unknown,
    Init,
    SetPosition,
    RemovePosition,
}

export interface BaseHypervisorActionData {
    id: string
}

export abstract class BaseHypervisorAction<
    T extends BaseHypervisorActionData = BaseHypervisorActionData
> extends BaseAction<T> {
    abstract readonly type: HypervisorActionType

    readonly kind = ActionKind.Hypervisor
}

export interface InitHypervisorActionData extends BaseHypervisorActionData {
    poolId: DeferredValue<string>
}

export class InitHypervisorAction extends BaseHypervisorAction<InitHypervisorActionData> {
    readonly type = HypervisorActionType.Init
}

export interface SetPositionHypervisorActionData extends BaseHypervisorActionData {
    positionId: string
}

export class SetPositionHypervisorAction extends BaseHypervisorAction<SetPositionHypervisorActionData> {
    readonly type = HypervisorActionType.SetPosition
}

export interface RemovePositionHypervisorActionData extends BaseHypervisorActionData {
    positionId: string
}

export class RemovePositionHypervisorAction extends BaseHypervisorAction<RemovePositionHypervisorActionData> {
    readonly type = HypervisorActionType.RemovePosition
}

export type HypervisorAction = InitHypervisorAction | SetPositionHypervisorAction | RemovePositionHypervisorAction
