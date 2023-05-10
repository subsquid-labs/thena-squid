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
import {Store} from '@subsquid/typeorm-store'

export async function processHypervisorAction(ctx: CommonContext<Store>, action: HypervisorAction) {
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

async function processInitAction(ctx: CommonContext<Store>, action: InitHypervisorAction) {
    const hypervisor = new Hypervisor({
        id: action.data.id,
        poolId: await action.data.poolId.get(ctx),
    })

    await ctx.store.insert(hypervisor)
    ctx.log.debug(`Hypervisor ${hypervisor.id} created`)
}

async function processSetPositionAction(ctx: CommonContext<Store>, action: SetPositionHypervisorAction) {
    const hypervisor = await ctx.store.get(Hypervisor, action.data.id)
    assert(hypervisor != null)

    if (hypervisor.basePositionId == null) {
        hypervisor.basePositionId = action.data.positionId
    } else if (hypervisor.limitPositionId == null) {
        hypervisor.limitPositionId = action.data.positionId
    } else {
        throw new Error()
    }

    await ctx.store.upsert(hypervisor)
}

async function processRemovePositionAction(ctx: CommonContext<Store>, action: RemovePositionHypervisorAction) {
    const hypervisor = await ctx.store.get(Hypervisor, action.data.id)
    assert(hypervisor != null)

    if (hypervisor.basePositionId === action.data.positionId) {
        hypervisor.basePositionId = null
    } else if (hypervisor.limitPositionId == action.data.positionId) {
        hypervisor.limitPositionId = null
    } else {
        throw new Error()
    }

    await ctx.store.upsert(hypervisor)
}
