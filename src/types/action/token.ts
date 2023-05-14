import assert from 'assert'
import {DataHandlerContext} from '@subsquid/evm-processor'
import {BNB_DECIMALS, WBNB_ADDRESS, WHITELIST_TOKENS} from '../../config'
import {Pool, Token, TokenPriceMetadata} from '../../model'
import {DeferredValue} from '../../utils/deferred'
import {StoreWithCache} from '../../utils/store'
import {Action} from './base'

export interface BaseTokenActionData {
    token: DeferredValue<Token, true>
}

export abstract class BaseTokenAction<T extends BaseTokenActionData = BaseTokenActionData> extends Action<T> {}

export interface EnsureTokenActionData extends BaseTokenActionData {
    address: string
    decimals: DeferredValue<number>
    symbol: DeferredValue<string>
}

export class EnsureTokenAction extends BaseTokenAction<EnsureTokenActionData> {
    async perform(ctx: DataHandlerContext<StoreWithCache>) {
        let token = await this.data.token.get()
        if (token != null) return

        const decimals = await this.data.decimals.get()
        const symbol = await this.data.symbol.get()
        token = new Token({
            id: this.data.address,
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
}

export interface PriceUpdateTokenActionData extends BaseTokenActionData {
    pool: DeferredValue<Pool, true>
}

export class PriceUpdateTokenAction extends BaseTokenAction<PriceUpdateTokenActionData> {
    async perform(ctx: DataHandlerContext<StoreWithCache>) {
        const token = await this.data.token.get()
        assert(token != null, `Missing token`)

        const pool = await this.data.pool.get()
        assert(pool != null, `Missing pool`)

        const [pairedTokenId, tokenPrice, pairedTokenReserve] =
            pool.token0.id === token.id
                ? [pool.token1.id, pool.price0, pool.reserve1]
                : [pool.token0.id, pool.price1, pool.reserve0]
        const pairedToken = token.id == pool.token0.id ? pool.token1 : pool.token0
        assert(pairedToken != null, `Missing token ${pairedTokenId}`)
        if (WHITELIST_TOKENS.indexOf(pairedToken.id) == -1) return

        const timestamp = new Date(this.block.timestamp)
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
}

export type TokenAction = PriceUpdateTokenAction | EnsureTokenAction
