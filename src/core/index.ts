import {Store} from '@subsquid/typeorm-store'
import {exit} from 'process'
import {In} from 'typeorm'
import {User, Pool, Trade} from '../model'
import {toEntityMap} from '../utils/misc'
import {Action, ActionKind, UserAction, PoolAction} from '../action/types'
import {CommonContext} from './types'
import {processPoolAction} from './pool'
import {processUserAction} from './user'

export async function processActions(ctx: CommonContext<Store>, actions: Action[]) {
    const userIds = getUserIds(actions)
    const users = await ctx.store.findBy(User, {id: In(userIds)}).then(toEntityMap)

    const poolIds = getPoolIds(actions)
    const pools = await ctx.store.findBy(Pool, {id: In(poolIds)}).then(toEntityMap)

    const trades = new Map<string, Trade[]>()

    for (const action of actions) {
        const newCtx = {
            ...ctx,
            log: ctx.log.child('actions', {
                block: action.block.height,
                transaction: action.transaction.hash,
            }),
            store: {
                users,
                pools,
                trades,
            },
        }

        try {
            switch (action.kind) {
                case ActionKind.Pool:
                    processPoolAction(newCtx, action)
                    break
                case ActionKind.User:
                    processUserAction(newCtx, action)
                    break
            }
        } catch (err) {
            ctx.log.fatal({err, block: action.block.height, txHash: action.transaction.hash})
            exit()
        }
    }

    await ctx.store.upsert([...users.values()])
    await ctx.store.upsert([...pools.values()])
    await ctx.store.insert([...trades.values()].flat())
}

function getUserIds(actions: Action[]) {
    return [...new Set(actions.filter((i): i is UserAction => i.kind === ActionKind.User).map((i) => i.data.id))]
}

function getPoolIds(actions: Action[]) {
    return [...new Set(actions.filter((i): i is PoolAction => i.kind === ActionKind.Pool).map((i) => i.data.id))]
}
