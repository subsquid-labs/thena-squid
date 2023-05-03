import assert from 'assert'
import {
    HypervisorAction,
    HypervisorActionType,
    InitHypervisorAction,
    RemovePositionHypervisorAction,
    SetPositionHypervisorAction,
} from '../mapping'
import {Hypervisor} from '../model'
import {CommonContext, Storage} from '../types/util'

export async function processHypervisorAction(
    ctx: CommonContext<Storage<{hypervisors: Hypervisor}>>,
    action: HypervisorAction
) {
    switch (action.type) {
        case HypervisorActionType.Init: {
            await processInitAction(ctx, action)
            break
        }
        case HypervisorActionType.SetPosition: {
            await processSetPositionAction(ctx, action)
            break
        }
        case HypervisorActionType.RemovePosition: {
            await processRemovePositionAction(ctx, action)
            break
        }
    }
}

async function processInitAction(ctx: CommonContext<Storage<{hypervisors: Hypervisor}>>, action: InitHypervisorAction) {
    const hypervisor = new Hypervisor({
        id: action.data.id,
        poolId: await action.data.poolId.get(ctx),
    })

    ctx.store.hypervisors.set(hypervisor.id, hypervisor)
    ctx.log.debug(`Hypervisor ${hypervisor.id} created`)
}

function processSetPositionAction(
    ctx: CommonContext<Storage<{hypervisors: Hypervisor}>>,
    action: SetPositionHypervisorAction
) {
    const hypervisor = ctx.store.hypervisors.get(action.data.id)
    assert(hypervisor != null)

    if (hypervisor.basePositionId == null) {
        hypervisor.basePositionId = action.data.positionId
    } else if (hypervisor.limitPositionId == null) {
        hypervisor.limitPositionId = action.data.positionId
    } else {
        throw new Error()
    }
}

function processRemovePositionAction(
    ctx: CommonContext<Storage<{hypervisors: Hypervisor}>>,
    action: RemovePositionHypervisorAction
) {
    const hypervisor = ctx.store.hypervisors.get(action.data.id)
    assert(hypervisor != null)

    if (hypervisor.basePositionId === action.data.positionId) {
        hypervisor.basePositionId = null
    } else if (hypervisor.limitPositionId == action.data.positionId) {
        hypervisor.limitPositionId = null
    } else {
        throw new Error()
    }
}
