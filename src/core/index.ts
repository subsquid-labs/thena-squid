import {Store} from '@subsquid/typeorm-store'
import {exit} from 'process'
import {In} from 'typeorm'
import {User, Pool, Trade, LiquidityPosition, LiquidityPositionUpdate, Token, Hypervisor} from '../model'
import {toEntityMap} from '../utils/misc'
import {Action, ActionKind, UserAction, PoolAction, TokenAction, HypervisorAction} from '../types/action'
import {CommonContext} from '../types/util'
import {processPoolAction} from './pool'
import {processUserAction} from './user'
import {LiquidityPositionAction} from '../types/action/liquidityPosition'
import {processLiquidityPositionAction} from './liquidityPosition'
import {processTokenAction} from './token'
import {USD_ADDRESS} from '../config'
import {processHypervisorAction} from './hypervisor'

export async function processActions(ctx: CommonContext<Store>, actions: Action[]) {
    const userIds = getUserIds(actions)
    const users = await ctx.store.findBy(User, {id: In(userIds)}).then(toEntityMap)

    const poolIds = getPoolIds(actions)
    const pools = await ctx.store.findBy(Pool, {id: In(poolIds)}).then(toEntityMap)

    const positionIds = getLiquidityPositionsIds(actions)
    const positions = await ctx.store.findBy(LiquidityPosition, {id: In(positionIds)}).then(toEntityMap)

    const hypervisorIds = getHypervisorIds(actions)
    const hypervisors = await ctx.store.findBy(Hypervisor, {id: In(hypervisorIds)}).then(toEntityMap)

    const tokenIds = getTokensIds(actions)
    tokenIds.push(USD_ADDRESS)
    const tokens = await ctx.store.findBy(Token, {id: In(tokenIds)}).then(toEntityMap)

    const trades = new Map<string, Trade[]>()
    const positionUpdates = new Map<string, LiquidityPositionUpdate[]>()

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
                positions,
                positionUpdates,
                tokens,
                hypervisors,
            },
        }

        try {
            switch (action.kind) {
                case ActionKind.Pool:
                    await processPoolAction(newCtx, action)
                    break
                case ActionKind.User:
                    processUserAction(newCtx, action)
                    break
                case ActionKind.LiquidityPosition:
                    processLiquidityPositionAction(newCtx, action)
                    break
                case ActionKind.Token:
                    await processTokenAction(newCtx, action)
                    break
                case ActionKind.Hypervisor:
                    await processHypervisorAction(newCtx, action)
                    break
            }
        } catch (err) {
            ctx.log.fatal({err, block: action.block.height, txHash: action.transaction.hash})
            exit(-1)
        }
    }

    await ctx.store.upsert([...users.values()])
    await ctx.store.upsert([...tokens.values()])
    await ctx.store.upsert([...pools.values()])
    await ctx.store.upsert([...positions.values()])
    await ctx.store.upsert([...hypervisors.values()])
    await ctx.store.insert([...trades.values()].flat())
    await ctx.store.insert([...positionUpdates.values()].flat())
}

function getUserIds(actions: Action[]) {
    return [...new Set(actions.filter((i): i is UserAction => i.kind === ActionKind.User).map((i) => i.data.id))]
}

function getPoolIds(actions: Action[]) {
    return [...new Set(actions.filter((i): i is PoolAction => i.kind === ActionKind.Pool).map((i) => i.data.id))]
}

function getLiquidityPositionsIds(actions: Action[]) {
    return [
        ...new Set(
            actions
                .filter((i): i is LiquidityPositionAction => i.kind === ActionKind.LiquidityPosition)
                .map((i) => i.data.id)
        ),
    ]
}

function getTokensIds(actions: Action[]) {
    return [...new Set(actions.filter((i): i is TokenAction => i.kind === ActionKind.Token).map((i) => i.data.id))]
}

function getHypervisorIds(actions: Action[]) {
    return [
        ...new Set(
            actions.filter((i): i is HypervisorAction => i.kind === ActionKind.Hypervisor).map((i) => i.data.id)
        ),
    ]
}
