// import {Hypervisor, LiquidityPosition} from '../../model'
// import {DeferredValue} from '../../utils/deferred'
// import {ActionKind, Action} from './base'

// export enum HypervisorActionType {
//     Unknown,
//     Ensure,
//     SetPosition,
//     RemovePosition,
// }

// export interface BaseHypervisorActionData {
//     hypervisor: DeferredValue<Hypervisor, true>
// }

// export abstract class BaseHypervisorAction<
//     T extends BaseHypervisorActionData = BaseHypervisorActionData
// > extends Action<T> {
//     abstract readonly type: HypervisorActionType

//     readonly kind = ActionKind.Hypervisor
// }

// export interface EnsureHypervisorActionData extends BaseHypervisorActionData {
//     address: string
//     poolId: DeferredValue<string>
// }

// export class EnsureHypervisorAction extends BaseHypervisorAction<EnsureHypervisorActionData> {
//     readonly type = HypervisorActionType.Ensure
// }

// export interface SetPositionHypervisorActionData extends BaseHypervisorActionData {
//     position: DeferredValue<LiquidityPosition, true>
// }

// export class SetPositionHypervisorAction extends BaseHypervisorAction<SetPositionHypervisorActionData> {
//     readonly type = HypervisorActionType.SetPosition
// }

// export interface RemovePositionHypervisorActionData extends BaseHypervisorActionData {
//     position: DeferredValue<LiquidityPosition, true>
// }

// export class RemovePositionHypervisorAction extends BaseHypervisorAction<RemovePositionHypervisorActionData> {
//     readonly type = HypervisorActionType.RemovePosition
// }

// export type HypervisorAction = EnsureHypervisorAction | SetPositionHypervisorAction | RemovePositionHypervisorAction

// import assert from 'assert'
// import {
//     HypervisorAction,
//     HypervisorActionType,
//     EnsureHypervisorAction,
//     RemovePositionHypervisorAction,
//     SetPositionHypervisorAction,
// } from '../types/action'
// import {Hypervisor} from '../model'
// import {DataHandlerContext} from '@subsquid/evm-processor'
// import {StoreWithCache} from '../utils/store'

// export async function processHypervisorAction(ctx: DataHandlerContext<StoreWithCache>, action: HypervisorAction) {
//     switch (action.type) {
//         case HypervisorActionType.Ensure: {
//             await processEnsureAction(ctx, action)
//             break
//         }
//         case HypervisorActionType.SetPosition: {
//             await processSetPositionAction(ctx, action)
//             break
//         }
//         case HypervisorActionType.RemovePosition: {
//             await processRemovePositionAction(ctx, action)
//             break
//         }
//     }
// }

// async function processEnsureAction(ctx: DataHandlerContext<StoreWithCache>, action: EnsureHypervisorAction) {
//     const hypervisor = new Hypervisor({
//         id: action.data.address,
//         poolId: await action.data.poolId.get(),
//     })

//     await ctx.store.insert(hypervisor)
//     ctx.log.debug(`Hypervisor ${hypervisor.id} created`)
// }

// async function processSetPositionAction(ctx: DataHandlerContext<StoreWithCache>, action: SetPositionHypervisorAction) {
//     const hypervisor = await action.data.hypervisor.get()
//     assert(hypervisor != null)

//     if (hypervisor.basePosition == null) {
//         hypervisor.basePosition = await action.data.position.get()
//     } else if (hypervisor.limitPositionId == null) {
//         hypervisor.limitPosition = await action.data.position.get()
//     } else {
//         throw new Error()
//     }

//     await ctx.store.upsert(hypervisor)
// }

// async function processRemovePositionAction(
//     ctx: DataHandlerContext<StoreWithCache>,
//     action: RemovePositionHypervisorAction
// ) {
//     const hypervisor = await action.data.hypervisor.get()
//     assert(hypervisor != null)

//     // if (hypervisor.basePositionId === action.data.positionId) {
//     //     hypervisor.basePositionId = null
//     // } else if (hypervisor.limitPositionId == action.data.positionId) {
//     //     hypervisor.limitPositionId = null
//     // } else {
//     //     throw new Error()
//     // }

//     await ctx.store.upsert(hypervisor)
// }
