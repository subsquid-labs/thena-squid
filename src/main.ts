import {TypeormDatabase} from '@subsquid/typeorm-store'
import {getActions} from './mapping'
import {processActions} from './core'
import {processor} from './processor'
import {PoolManager} from './utils/pairManager'
import {HypervisorManager} from './utils/hypervisorManager'
import {StoreWithCache} from './utils/store'

processor.run(new TypeormDatabase(), async (ctx) => {
    const poolManager = PoolManager.instance
    if (!poolManager.initialized) {
        await poolManager.init(ctx.store)
    }

    const hypervisorManager = HypervisorManager.instance
    if (!hypervisorManager.initialized) {
        await hypervisorManager.init(ctx.store)
    }

    const newCtx = {
        ...ctx,
        store: new StoreWithCache(ctx.store),
    }

    const actions = await getActions(newCtx)
    await processActions(newCtx, actions)

    await newCtx.store.flush()
})
