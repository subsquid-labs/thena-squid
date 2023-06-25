import {TypeormDatabase} from '@subsquid/typeorm-store'
import {getActions} from './mapping'
import {processor} from './processor'
import {Action} from './action'
import {StoreWithCache} from '@belopash/squid-tools'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    const newCtx = {
        ...ctx,
        store: StoreWithCache.create(ctx.store),
    }

    const actions = await getActions(newCtx)
    await Action.process(newCtx, actions)

    await newCtx.store.flush()
})
