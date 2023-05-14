import {TypeormDatabase} from '@subsquid/typeorm-store'
import {getActions} from './mapping'
import {processor} from './processor'
import {StoreWithCache} from './utils/store'
import {exit} from 'process'
import {DataHandlerContext} from '@subsquid/evm-processor'
import {Action} from './types/action'

processor.run(new TypeormDatabase(), async (ctx) => {
    const newCtx = {
        ...ctx,
        store: new StoreWithCache(ctx.store),
    }

    const actions = await getActions(newCtx)
    await processActions(newCtx, actions)

    await newCtx.store.flush()
})

async function processActions(ctx: DataHandlerContext<StoreWithCache>, actions: Action[]) {
    for (const action of actions) {
        const actionCtx = {
            ...ctx,
            log: ctx.log.child('actions', {
                block: action.block.height,
                transaction: action.transaction.hash,
            }),
        }

        try {
            await action.perform(actionCtx)
        } catch (err) {
            ctx.log.fatal({err, block: action.block.height, txHash: action.transaction.hash})
            exit(-1)
        }
    }
}
