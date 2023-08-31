import assert from 'assert'
import {DataHandlerContext} from '@subsquid/evm-processor'
import {BNB_DECIMALS, WBNB_ADDRESS, WHITELIST_TOKENS} from '../config'
import {Pool, Token, TokenPriceMetadata} from '../model'
import {DeferredValue} from '../utils/deferred'
import {StoreWithCache} from '@belopash/typeorm-store'
import {Action} from './base'

export interface BaseTokenActionData {
    tokenId: string
}

export abstract class BaseTokenAction<T extends BaseTokenActionData = BaseTokenActionData> extends Action<T> {}

export interface EnsureTokenActionData extends BaseTokenActionData {
    address: string
    decimals: number
    symbol: string
}

export class EnsureTokenAction extends BaseTokenAction<EnsureTokenActionData> {
    async perform() {
        const decimals = this.data.decimals
        const symbol = this.data.symbol
        const token = new Token({
            id: this.data.tokenId,
            decimals,
            symbol,
            bnbPrice: 0n,
            priceMetadata: new TokenPriceMetadata({
                largestBnbReserve: 0n,
                recalculatedAt: new Date(0),
            }),
        })

        await this.store.upsert(token)
        this.log.debug(`Token ${token.id} created`)
    }
}

export interface PriceUpdateTokenActionData extends BaseTokenActionData {
    poolId: string
}

export class PriceUpdateTokenAction extends BaseTokenAction<PriceUpdateTokenActionData> {
    async perform() {
        const token = await this.store.getOrFail(Token, this.data.tokenId)
        const pool = await this.store.getOrFail(Pool, this.data.poolId, {token0: true, token1: true})

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

        await this.store.upsert(token)
    }
}

export type TokenAction = PriceUpdateTokenAction | EnsureTokenAction
