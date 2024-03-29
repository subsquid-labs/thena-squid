import { StoreWithCache } from '@belopash/typeorm-store'
import { HttpAgent, HttpClient } from '@subsquid/http-client'
import * as thenianNftAbi from '../abi/thenianNft'
import { IPFS_CID, IPFS_GATEWAY, THENIAN_NFT_ADDRESS, ZERO_ADDRESS } from '../config'
import { MappingContext } from '../interfaces'
import { Attribute, ThenianNft, ThenianNftMetadata, User } from '../model'
import { Log, Transaction } from '../processor'
import { CallCache } from '../utils/callCache'
import { createThenianNftId } from '../utils/ids'
import { Item } from './common'
import { splitIntoBatches } from '../utils/misc'

const client = new HttpClient({
    headers: { 'Content-Type': 'application/json' },
    retryAttempts: 5,
    agent: new HttpAgent({
        keepAlive: true,
    }),
})

interface TokenMetadata {
    image: string
    attributes: { trait_type: string; value: string }[]
}

class MetadataFetchError extends Error {
    constructor(url: string, e: Error) {
        super(`Failed to fetch metadata from ${url}. Error: ${e}`)
    }
}

async function fetchTokenMetadata(
    ctx: MappingContext<StoreWithCache>,
    uri: string
): Promise<TokenMetadata | undefined> {
    try {
        if (uri) {
            const gatewayURL = new URL(uri, IPFS_GATEWAY).toString()
            let res = await client.get(gatewayURL)
            ctx.log.info(`Successfully fetched metadata from ${gatewayURL}`)
            return res
        } else {
            ctx.log.warn(`Unexpected metadata URL protocol: ${uri}`)
            return undefined
        }
    } catch (e: any) {
        throw new MetadataFetchError(uri, e)
    }
}

export function getThenianNftActions(ctx: MappingContext<StoreWithCache>, item: Item) {
    if (item.address !== THENIAN_NFT_ADDRESS) return

    switch (item.kind) {
        case 'log': {
            const log = item.value
            switch (log.topics[0]) {
                case thenianNftAbi.events.Transfer.topic:
                    transferHandler(ctx, log)
                    break
            }
            break
        }
        // case 'transaction': {
        //     const tx = item.value
        //     switch (tx.sighash) {
        //         case thenianNftAbi.functions.setBaseURI.sighash:
        //             setBaseURIHandler(ctx, tx)
        //     }
        // }
    }
}

function transferHandler(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = thenianNftAbi.events.Transfer.decode(log)

    const index = event.tokenId
    const tokenId = createThenianNftId(index)

    const fromId = event.from.toLowerCase()
    const fromUserDeferred = ctx.store.defer(User, fromId)

    const toId = event.to.toLowerCase()
    const toUserDeferred = ctx.store.defer(User, toId)

    if (fromId === ZERO_ADDRESS) {
        // const callCache = CallCache.get(ctx)
        // const baseUriDeferred = callCache.defer(log.block, [thenianNftAbi.functions.baseURI, THENIAN_NFT_ADDRESS, []])

        ctx.queue
            .lazy(async () => {
                const from = await fromUserDeferred.get()
                if (from == null) {
                    ctx.queue.add('user_create', {
                        userId: fromId,
                        address: ZERO_ADDRESS,
                    })
                }
            })
            .lazy(async () => {
                const owner = await toUserDeferred.get()
                if (owner == null) {
                    ctx.queue.add('user_create', {
                        userId: toId,
                        address: toId,
                    })
                }
            })
            .add('thenianNft_create', {
                tokenId,
                index,
                ownerId: toId,
                timestamp: BigInt(log.block.timestamp),
            })
            .lazy(async () => {
                let metadata: TokenMetadata | undefined = await fetchTokenMetadata(ctx, `ipfs/${IPFS_CID}/${index}`)
                if (metadata != null) {
                    ctx.queue.add('thenianNft_setMetadata', {
                        tokenId,
                        metadata: new ThenianNftMetadata({
                            image: metadata.image,
                            attributes: metadata.attributes.map(
                                (a) => new Attribute({ traitType: a.trait_type, value: a.value })
                            ),
                        }),
                    })
                }
            })
    } else {
        ctx.queue
            .lazy(async () => {
                const owner = await toUserDeferred.get()
                if (owner == null) {
                    ctx.queue.add('user_create', {
                        userId: toId,
                        address: toId,
                    })
                }
            })
            .add('thenianNft_updateOwner', {
                tokenId,
                fromId,
                toId,
            })
    }
}

function setBaseURIHandler(ctx: MappingContext<StoreWithCache>, tx: Transaction) {
    if (!tx.status) return

    const func = thenianNftAbi.functions.setBaseURI.decode(tx.input)
    const baseUri = func.baseURI_

    ctx.queue.lazy(async () => {
        const nfts = await ctx.store.find(ThenianNft, {})

        for (const batch of splitIntoBatches(nfts, 50)) {
            await Promise.all(
                batch.map(async (nft) => {
                    let metadata: TokenMetadata | undefined = await fetchTokenMetadata(ctx, `ipfs/${IPFS_CID}/${nft.index}`)
                    if (metadata != null) {
                        ctx.queue.add('thenianNft_setMetadata', {
                            tokenId: nft.id,
                            metadata: new ThenianNftMetadata({
                                image: metadata.image,
                                attributes: metadata.attributes.map(
                                    (a) => new Attribute({ traitType: a.trait_type, value: a.value })
                                ),
                            }),
                        })
                    }
                })
            )
        }
    })
}
