import {TypeormDatabase} from '@subsquid/typeorm-store'
import {getActions} from './mapping'
import {processActions} from './core'
import {processor} from './processor'
import {PoolManager} from './utils/pairManager'
import {HypervisorManager} from './utils/hypervisorManager'

processor.run(new TypeormDatabase(), async (ctx) => {
    const poolManager = PoolManager.instance
    if (!poolManager.initialized) {
        await poolManager.init(ctx.store)
    }

    const hypervisorManager = HypervisorManager.instance
    if (!hypervisorManager.initialized) {
        await hypervisorManager.init(ctx.store)
    }

    const actions = await getActions(ctx)
    await processActions(ctx, actions)
})
