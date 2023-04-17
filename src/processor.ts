import assert from 'assert'
import {In} from 'typeorm'
import {lookupArchive} from '@subsquid/archive-registry'
import {BatchProcessorItem, EvmBatchProcessor, EvmBlock, EvmTransaction} from '@subsquid/evm-processor'
import {BatchHandlerContext} from '@subsquid/evm-processor'
import {Store, TypeormDatabase} from '@subsquid/typeorm-store'
import * as thena from './abi/thena'
import {Account} from './model'
import {getTimestamp, processItems, toEntityMap} from './utils/misc'

export const THENA_ADDRESS = '0xf4c8e32eadec4bfe97e0f595add0f4450a863a11'
export const SWAP_ROUTER_ADDRESS = '0x327dd3208f0bcf590a66110acb6e5e6941a4efa0'
export const LP_ROUTER_ADDRESS = '0xd4ae6eca985340dd434d38f470accce4dc78d109'
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const processor = new EvmBatchProcessor()
    .setBlockRange({from: 23881121})
    .setDataSource({
        archive: lookupArchive('binance'),
    })
    .addLog(THENA_ADDRESS, {
        filter: [[thena.events.Transfer.topic, thena.events.Approval.topic]],
        data: {
            evmLog: {
                topics: true,
                data: true,
            },
            transaction: {
                from: true,
                hash: true,
            },
        },
    })
    .addTransaction([SWAP_ROUTER_ADDRESS, LP_ROUTER_ADDRESS], {
        sighash: [],
        data: {
            transaction: {
                from: true,
                hash: true,
            },
        },
    })

export type ProcessorItem = BatchProcessorItem<typeof processor>

processor.run(new TypeormDatabase(), async (ctx) => {
    await processAccounts(ctx)
})

enum InteractionType {
    Transfer,
    Swap,
}

type Interaction = {
    id: string
    block: EvmBlock
    transaction: Pick<EvmTransaction, 'hash'>
    balance?: bigint
}

async function processAccounts(ctx: BatchHandlerContext<Store, ProcessorItem>) {
    const interactions: Interaction[] = []

    const addInteraction = (i: Interaction) => {
        if (i.id === ZERO_ADDRESS) return
        interactions.push(i)
    }

    processItems(ctx.blocks, (block, item) => {
        switch (item.kind) {
            case 'evmLog': {
                if (item.address != THENA_ADDRESS) return

                switch (item.evmLog.topics[0]) {
                    case thena.events.Transfer.topic: {
                        const e = thena.events.Transfer.decode(item.evmLog)

                        addInteraction({
                            id: e.from.toLowerCase(),
                            block,
                            transaction: item.transaction,
                            balance: -e.value.toBigInt(),
                        })
                        addInteraction({
                            id: e.to.toLowerCase(),
                            block,
                            transaction: item.transaction,
                            balance: e.value.toBigInt(),
                        })
                        break
                    }
                    case thena.events.Approval.topic: {
                        const e = thena.events.Approval.decode(item.evmLog)

                        addInteraction({
                            id: e.spender,
                            block,
                            transaction: item.transaction,
                        })
                        addInteraction({
                            id: e.owner,
                            block,
                            transaction: item.transaction,
                        })
                        break
                    }
                }
                break
            }
            case 'transaction': {
                if (item.transaction.from == null) return

                addInteraction({
                    id: item.transaction.from,
                    block,
                    transaction: item.transaction,
                })
            }
        }
    })

    const accountIds = [...new Set(interactions.map((i) => i.id))]
    const accounts = await ctx.store.findBy(Account, {id: In(accountIds)}).then(toEntityMap)

    for (const interaction of interactions) {
        let account = accounts.get(interaction.id)
        if (account == null) {
            account = new Account({
                id: interaction.id,
                firstInteractAt: getTimestamp(interaction.block),
                balance: 0n,
            })
            accounts.set(account.id, account)
        }

        if (interaction.balance != null) {
            account.balance += interaction.balance
            assert(account.balance >= 0)
        }
    }

    await ctx.store.save([...accounts.values()])
}
