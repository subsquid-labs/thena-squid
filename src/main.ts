import {In} from 'typeorm'
import {BatchHandlerContext} from '@subsquid/evm-processor'
import {Store, TypeormDatabase} from '@subsquid/typeorm-store'
import {Interaction, InteractionType, SwapInteraction, getInteractions} from './interaction'
import {Trade, User} from './model'
import {processor} from './processor'
import {getTimestamp, last, toEntityMap} from './utils/misc'

processor.run(new TypeormDatabase(), async (ctx) => {
    const interactions = await getInteractions(ctx)
    await processInteractions(ctx, interactions)
})

async function processInteractions(ctx: BatchHandlerContext<Store, unknown>, interactions: Interaction[]) {
    const accountIds = [...new Set(interactions.map((i) => i.id))]
    const accounts = await ctx.store.findBy(User, {id: In(accountIds)}).then(toEntityMap)

    const trades = new Map<string, Trade[]>()

    for (const interaction of interactions) {
        let user = accounts.get(interaction.id)
        if (user == null) {
            user = new User({
                id: interaction.id,
                firstInteractAt: getTimestamp(interaction.block),
                balance: 0n,
            })
            accounts.set(user.id, user)
        }

        switch (interaction.type) {
            case InteractionType.Balance: {
                // user.balance += interaction.amount
                // assert(user.balance >= 0)
                break
            }
            case InteractionType.Swap: {
                let txTrades = trades.get(interaction.transaction.id)
                if (txTrades == null) {
                    txTrades = []
                    trades.set(interaction.transaction.id, txTrades)
                }

                let swap = txTrades.length > 0 ? last(txTrades) : undefined
                if (swap == null || !isSameTrade(swap, interaction)) {
                    swap = new Trade({
                        id: `${interaction.transaction.id}-${txTrades.length}`,
                        blockNumber: interaction.block.height,
                        timestamp: new Date(interaction.block.timestamp),
                        txHash: interaction.transaction.hash,
                        user,
                        tokenIn: interaction.tokenIn,
                        amountIn: interaction.amountIn,
                        tokenOut: interaction.tokenOut,
                        amountOut: interaction.amountOut,
                        routes: [interaction.route],
                    })
                    txTrades.push(swap)
                } else {
                    swap.amountOut = interaction.amountOut
                    swap.tokenOut = interaction.tokenOut
                    swap.routes.push(interaction.route)
                }
            }
        }
    }

    await ctx.store.upsert([...accounts.values()])
    await ctx.store.insert([...trades.values()].flat())
}

function isSameTrade(trade: Trade, interaction: SwapInteraction) {
    return trade.user.id === interaction.id && trade.tokenOut === interaction.tokenIn
}
