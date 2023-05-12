import {exit} from 'process'
import {In} from 'typeorm'
import {User, Pool, Trade, LiquidityPosition, LiquidityPositionUpdate, Token, Hypervisor} from '../model'
import {toEntityMap} from '../utils/misc'
import {Action, ActionKind, UserAction, PoolAction, TokenAction, HypervisorAction} from '../types/action'
import {processPoolAction} from './pool'
import {processUserAction} from './user'
import {LiquidityPositionAction} from '../types/action/liquidityPosition'
import {processLiquidityPositionAction} from './liquidityPosition'
import {processTokenAction} from './token'
import {USD_ADDRESS} from '../config'
import {processHypervisorAction} from './hypervisor'
import {DataHandlerContext} from '@subsquid/evm-processor'
import {StoreWithCache} from '../utils/store'

export async function processActions(ctx: DataHandlerContext<StoreWithCache>, actions: Action[]) {
    for (const action of actions) {
        const actionCtx = {
            ...ctx,
            log: ctx.log.child('actions', {
                block: action.block.height,
                transaction: action.transaction.hash,
            }),
        }

        try {
            switch (action.kind) {
                case ActionKind.Pool:
                    await processPoolAction(actionCtx, action)
                    break
                case ActionKind.User:
                    await processUserAction(actionCtx, action)
                    break
                case ActionKind.LiquidityPosition:
                    await processLiquidityPositionAction(actionCtx, action)
                    break
                case ActionKind.Token:
                    await processTokenAction(actionCtx, action)
                    break
                case ActionKind.Hypervisor:
                    await processHypervisorAction(actionCtx, action)
                    break
            }
        } catch (err) {
            ctx.log.fatal({err, block: action.block.height, txHash: action.transaction.hash})
            exit(-1)
        }
    }
}

// function getUserIds(actions: Action[]) {
//     return [...new Set(actions.filter((i): i is UserAction => i.kind === ActionKind.User).map((i) => i.data.id))]
// }

// function getPoolIds(actions: Action[]) {
//     return [...new Set(actions.filter((i): i is PoolAction => i.kind === ActionKind.Pool).map((i) => i.data.id))]
// }

// function getLiquidityPositionsIds(actions: Action[]) {
//     return [
//         ...new Set(
//             actions
//                 .filter((i): i is LiquidityPositionAction => i.kind === ActionKind.LiquidityPosition)
//                 .map((i) => i.data.id)
//         ),
//     ]
// }

// function getTokensIds(actions: Action[]) {
//     return [...new Set(actions.filter((i): i is TokenAction => i.kind === ActionKind.Token).map((i) => i.data.id))]
// }

// function getHypervisorIds(actions: Action[]) {
//     return [
//         ...new Set(
//             actions.filter((i): i is HypervisorAction => i.kind === ActionKind.Hypervisor).map((i) => i.data.id)
//         ),
//     ]
// }
