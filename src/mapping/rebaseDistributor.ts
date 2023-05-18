import {DataHandlerContext} from '@subsquid/evm-processor'
import * as rebaseDistributor from '../abi/rebaseDistributor'
import {Action} from '../action'
import {RewardVeTokenAction} from '../action/veToken'
import {REBASE_DISTRIBUTOR} from '../config'
import {VeToken} from '../model'
import {Log} from '../processor'
import {StoreWithCache} from '../utils/store'
import {createVeTokenId} from '../utils/ids'

export function isRebaseDistributorItem(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    return item.address === REBASE_DISTRIBUTOR
}

export async function getRebaseDistributorActions(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    const actions: Action[] = []

    switch (item.topics[0]) {
        case rebaseDistributor.events.Claimed.topic: {
            const event = rebaseDistributor.events.Claimed.decode(item)

            const tokenId = createVeTokenId(event.tokenId)
            const amount = event.amount

            actions.push(
                new RewardVeTokenAction(item.block, item.transaction!, {
                    token: ctx.store.defer(VeToken, tokenId),
                    amount,
                })
            )

            break
        }
    }

    return actions
}
