import assert from 'assert'
import {Pool, Token, TokenPriceMetadata, User} from '../model'
import {EnsureTokenAction, PriceUpdateTokenAction, TokenAction, TokenActionType} from '../types/action'
import * as bep20 from '../abi/bep20'
import {BNB_DECIMALS, WBNB_ADDRESS, WHITELIST_TOKENS} from '../config'
import {DataHandlerContext} from '@subsquid/evm-processor'
import {StoreWithCache} from '../utils/store'

export async function processTokenAction(ctx: DataHandlerContext<StoreWithCache>, action: TokenAction) {
    switch (action.type) {
        case TokenActionType.Ensure: {
            await processEnsureAction(ctx, action)
            break
        }
        case TokenActionType.PriceUpdate: {
            processPriceUpdateAction(ctx, action)
            break
        }
    }
}

async function processEnsureAction(ctx: DataHandlerContext<StoreWithCache>, action: EnsureTokenAction) {
    let token = await action.data.token.get(ctx)
    if (token != null) return

    const decimals = await action.data.decimals.get(ctx)
    const symbol = await action.data.symbol.get(ctx)
    token = new Token({
        id: action.data.address,
        decimals,
        symbol,
        bnbPrice: 0n,
        priceMetadata: new TokenPriceMetadata({
            largestBnbReserve: 0n,
            recalculatedAt: new Date(0),
        }),
    })

    await ctx.store.upsert(token)
    ctx.log.debug(`Token ${token.id} created`)
}

async function processPriceUpdateAction(ctx: DataHandlerContext<StoreWithCache>, action: PriceUpdateTokenAction) {
    const token = await action.data.token.get(ctx)
    assert(token != null, `Missing token`)

    const pool = await action.data.pool.get(ctx)
    assert(pool != null, `Missing pool`)

    const [pairedTokenId, tokenPrice, pairedTokenReserve] =
        pool.token0.id === token.id
            ? [pool.token1.id, pool.price0, pool.reserve1]
            : [pool.token0.id, pool.price1, pool.reserve0]
    const pairedToken = token.id == pool.token0.id ? pool.token1 : pool.token0
    assert(pairedToken != null, `Missing token ${pairedTokenId}`)
    if (WHITELIST_TOKENS.indexOf(pairedToken.id) == -1) return

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

    await ctx.store.upsert(token)
}
