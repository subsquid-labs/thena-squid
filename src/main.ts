import {TypeormDatabase} from '@subsquid/typeorm-store'
import {getActions} from './action'
import {processActions} from './core'
import {processor} from './processor'
import {PoolManager} from './utils/pairManager'

processor.run(new TypeormDatabase(), async (ctx) => {
    const poolManager = PoolManager.instance
    if (!poolManager.initialized) {
        await poolManager.init(ctx.store)
    }

    const actions = await getActions(ctx)
    await processActions(ctx, actions)
})
