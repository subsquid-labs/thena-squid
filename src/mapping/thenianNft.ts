import {StoreWithCache} from '@belopash/typeorm-store'
import path from 'path'
import * as thenianNftAbi from '../abi/thenianNft'
import {THENIAN_NFT_ADDRESS, ZERO_ADDRESS} from '../config'
import {MappingContext} from '../interfaces'
import {User} from '../model'
import {Log} from '../processor'
import {Item} from './common'
import {HttpClient} from '@subsquid/http-client'

const NFT_BASE_URI = 'ipfs://QmYG7JJcLxxewgCD9Az2zcnS7CCCZKa6s2738ZC2547eTn'
const IPFS_GATEWAY = 'https://ipfs.io/ipfs/'
const ipfsRegExp = /^ipfs:\/\/(.+)$/

const client = new HttpClient({
    headers: {'Content-Type': 'application/json'},
    retryAttempts: 5,
    // transformResponse(res: string): TokenMetadata {
    //     let data: {image: string; attributes: {trait_type: string; value: string}[]} = JSON.parse(res)
    //     return {
    //         image: data.image,
    //         attributes: data.attributes.map((a) => new Attribute({traitType: a.trait_type, value: a.value})),
    //     }
    // },
})

interface TokenMetadata {
    image: string
    attributes: {traitType: string; value: string}[]
}

async function fetchTokenMetadata(
    ctx: MappingContext<StoreWithCache>,
    uri: string
): Promise<TokenMetadata | undefined> {
    try {
        if (uri.startsWith('ipfs://')) {
            const gatewayURL = path.posix.join(IPFS_GATEWAY, ipfsRegExp.exec(uri)![1])
            let res = await client.get(gatewayURL)
            ctx.log.info(`Successfully fetched metadata from ${gatewayURL}`)
            return res.data
        } else if (uri.startsWith('http://') || uri.startsWith('https://')) {
            let res = await client.get(uri)
            ctx.log.info(`Successfully fetched metadata from ${uri}`)
            return res.data
        } else {
            ctx.log.warn(`Unexpected metadata URL protocol: ${uri}`)
            return undefined
        }
    } catch (e) {
        throw new Error(`Failed to fetch metadata at ${uri}. Error: ${e}`)
    }
}

export function isThenianNftItem(ctx: MappingContext<StoreWithCache>, item: Item) {
    return item.address === THENIAN_NFT_ADDRESS
}

export function getThenianNftActions(ctx: MappingContext<StoreWithCache>, item: Item) {
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
    }
}

function transferHandler(ctx: MappingContext<StoreWithCache>, log: Log) {
    const event = thenianNftAbi.events.Transfer.decode(log)

    const tokenId = event.tokenId.toString()

    const fromId = event.from.toLowerCase()
    const fromUserDeferred = ctx.store.defer(User, fromId)

    const toId = event.to.toLowerCase()
    const toUserDeferred = ctx.store.defer(User, toId)

    if (fromId === ZERO_ADDRESS) {
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
            .lazy(async () => {
                const uri = `${NFT_BASE_URI}/${tokenId}`
                let metadata: TokenMetadata | undefined = await fetchTokenMetadata(ctx, uri)
                ctx.queue.add('thenianNft_create', {
                    tokenId,
                    ownerId: toId,
                    image: metadata?.image || '',
                    attributes: metadata?.attributes || [],
                    timestamp: BigInt(log.block.timestamp),
                })
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
