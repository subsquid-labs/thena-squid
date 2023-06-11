import {TypeormDatabase} from '@subsquid/typeorm-store'
import {getActions} from './mapping'
import {processor} from './processor'
import {StoreWithCache} from './utils/store'
import {exit} from 'process'
import {DataHandlerContext} from '@subsquid/evm-processor'
import {Action} from './action'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    const newCtx = {
        ...ctx,
        store: new StoreWithCache(ctx.store),
    }

    const actions = await getActions(newCtx)
    await Action.process(newCtx, actions)

    await newCtx.store.flush()
})
