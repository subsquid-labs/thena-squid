import {TypeormDatabase} from '@subsquid/typeorm-store'
import {getActions} from './action'
import {processActions} from './core'
import {processor} from './processor'

processor.run(new TypeormDatabase(), async (ctx) => {
    const actions = await getActions(ctx)
    await processActions(ctx, actions)
})
