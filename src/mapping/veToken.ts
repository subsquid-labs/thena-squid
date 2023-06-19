import {DataHandlerContext} from '@subsquid/evm-processor'
import {VE_TOKEN, ZERO_ADDRESS} from '../config'
import {StoreWithCache} from '../utils/store'
import {Action, EnsureUserAction} from '../action'
import * as veTokenAbi from '../abi/votingEscrow'
import {Log} from '../processor'
import {
    CreateVeTokenAction,
    TransferVeTokenAction,
    UpdateLockTimeVeTokenAction,
    UpdateValueVeTokenAction,
} from '../action/veToken'
import {User, VeToken} from '../model'
import {createVeTokenId} from '../utils/ids'
import {ContractChecker} from '../utils/contractChecker'
import {WrappedValue} from '../utils/deferred'

export function isVeTokenItem(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    return item.address === VE_TOKEN
}

export async function getVeTokenActions(ctx: DataHandlerContext<StoreWithCache>, item: Log) {
    const actions: Action[] = []

    switch (item.topics[0]) {
        case veTokenAbi.events.Transfer.topic: {
            const event = veTokenAbi.events.Transfer.decode(item)

            const tokenId = createVeTokenId(event.tokenId)
            const from = event.from.toLowerCase()
            const to = event.to.toLowerCase()

            if (from === ZERO_ADDRESS) {
                actions.push(
                    new EnsureUserAction(item.block, item.transaction!, {
                        user: ctx.store.defer(User, ZERO_ADDRESS),
                        address: ZERO_ADDRESS,
                        isContract: new WrappedValue(true),
                    }),
                    new CreateVeTokenAction(item.block, item.transaction!, {
                        id: tokenId,
                        index: Number(event.tokenId),
                        zero: ctx.store.defer(User, ZERO_ADDRESS),
                    })
                )
            }

            actions.push(
                new EnsureUserAction(item.block, item.transaction!, {
                    user: ctx.store.defer(User, from),
                    address: from,
                    isContract: ContractChecker.get(ctx).defer(from),
                }),
                new EnsureUserAction(item.block, item.transaction!, {
                    user: ctx.store.defer(User, to),
                    address: to,
                    isContract: ContractChecker.get(ctx).defer(to),
                }),
                new TransferVeTokenAction(item.block, item.transaction!, {
                    token: ctx.store.defer(VeToken, tokenId, {owner: true}),
                    from: ctx.store.defer(User, from),
                    to: ctx.store.defer(User, to),
                })
            )

            break
        }
        case veTokenAbi.events.Deposit.topic: {
            const event = veTokenAbi.events.Deposit.decode(item)

            const tokenId = createVeTokenId(event.tokenId)
            const amount = event.value
            const lockTime = new Date(Number(event.locktime) * 1000)

            actions.push(
                new UpdateValueVeTokenAction(item.block, item.transaction!, {
                    token: ctx.store.defer(VeToken, tokenId, {owner: true}),
                    amount,
                }),
                new UpdateLockTimeVeTokenAction(item.block, item.transaction!, {
                    token: ctx.store.defer(VeToken, tokenId, {owner: true}),
                    lockTime,
                })
            )

            break
        }
        case veTokenAbi.events.Withdraw.topic: {
            const event = veTokenAbi.events.Withdraw.decode(item)

            const tokenId = createVeTokenId(event.tokenId)
            const amount = -event.value

            actions.push(
                new UpdateValueVeTokenAction(item.block, item.transaction!, {
                    token: ctx.store.defer(VeToken, tokenId, {owner: true}),
                    amount,
                })
            )

            break
        }
    }

    return actions
}
