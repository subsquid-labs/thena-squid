import assert from 'assert'
import {Pool, Token, TokenPriceMetadata} from '../model'
import {InitTokenAction, PriceUpdateTokenAction, TokenAction, TokenActionType} from '../types/action'
import {CommonContext, Storage} from '../types/util'
import * as bep20 from '../abi/bep20'
import {BNB_DECIMALS, WBNB_ADDRESS} from '../config'

export async function processTokenAction(
    ctx: CommonContext<Storage<{tokens: Token; pools: Pool}>>,
    action: TokenAction
) {
    switch (action.type) {
        case TokenActionType.Init: {
            await processInitAction(ctx, action)
            break
        }
        case TokenActionType.PriceUpdate: {
            processPriceUpdateAction(ctx, action)
            break
        }
    }
}

async function processInitAction(ctx: CommonContext<Storage<{tokens: Token}>>, action: InitTokenAction) {
    if (ctx.store.tokens.has(action.data.id)) return

    const decimals = await action.data.decimals.get(ctx)
    const symbol = await action.data.symbol.get(ctx)
    const token = new Token({
        id: action.data.id,
        decimals,
        symbol,
        bnbPrice: 0n,
        priceMetadata: new TokenPriceMetadata({
            largestBnbReserve: 0n,
            recalculatedAt: new Date(0),
        }),
    })

    ctx.store.tokens.set(token.id, token)
    ctx.log.debug(`Token ${token.id} created`)
}

function processPriceUpdateAction(
    ctx: CommonContext<Storage<{tokens: Token; pools: Pool}>>,
    action: PriceUpdateTokenAction
) {
    const token = ctx.store.tokens.get(action.data.id)
    assert(token != null, `Missing token ${action.data.id}`)

    const pool = ctx.store.pools.get(action.data.poolId)
    assert(pool != null, `Missing pool ${action.data.poolId}`)

    const [pairedTokenId, tokenPrice, pairedTokenReserve] =
        pool.token0Id === token.id
            ? [pool.token1Id, pool.price0, pool.reserve1]
            : [pool.token0Id, pool.price1, pool.reserve0]
    const pairedToken = ctx.store.tokens.get(pairedTokenId)
    assert(pairedToken != null, `Missing token ${pairedTokenId}`)

    const timestamp = new Date(action.block.timestamp)
    const bnbReserve = pairedToken.bnbPrice * pairedTokenReserve

    const priceMetadata = token.priceMetadata

    if (priceMetadata.recalculatedAt === timestamp && bnbReserve <= priceMetadata.largestBnbReserve) return

    priceMetadata.largestBnbReserve = bnbReserve
    priceMetadata.recalculatedAt = timestamp

    if (token.id === WBNB_ADDRESS) {
        token.bnbPrice = 10n ** BNB_DECIMALS
    } else {
        token.bnbPrice =
            tokenPrice != null ? (pairedToken.bnbPrice * tokenPrice) / 10n ** BigInt(pairedToken.decimals) : 0n
    }
}
