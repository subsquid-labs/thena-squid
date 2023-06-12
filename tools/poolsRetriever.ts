import assert from 'assert'
import {lookupArchive} from '@subsquid/archive-registry'
import {EvmBatchProcessor} from '@subsquid/evm-processor'
import {Database, LocalDest} from '@subsquid/file-store'
import * as algebraPoolFactoryAbi from '../src/abi/algebraFactory'
import * as solidlyPoolFactoryAbi from '../src/abi/solidlyFactory'
import {ALGEBRA_FACTORY, SOLIDLY_FACTORY} from '../src/config'

const earliestPairFactoryDeploymentBlock = 24468802

const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: 'https://v2.archive.subsquid.io/network/binance-mainnet',
    })
    .setBlockRange({
        from: earliestPairFactoryDeploymentBlock,
    })
    .setFields({
        log: {
            topics: true,
            data: true,
        },
        transaction: {
            from: true,
            hash: true,
        },
    })
    .addLog({
        address: [SOLIDLY_FACTORY],
        topic0: [solidlyPoolFactoryAbi.events.PairCreated.topic],
    })
    .addLog({
        address: [ALGEBRA_FACTORY],
        topic0: [algebraPoolFactoryAbi.events.Pool.topic],
    })

let solidlyPools: string[] = []
let algebraPools: string[] = []

type Metadata = {
    height: number
    hash: string
    addresses: Record<string, string[]>
}

let isReady = false

let db = new Database({
    tables: {},
    dest: new LocalDest('./assets'),
    chunkSizeMb: Infinity,
    syncIntervalBlocks: 1,
    hooks: {
        async onStateRead(dest) {
            if (await dest.exists('pools.json')) {
                let {height, hash, addresses}: Metadata = await dest.readFile('pools.json').then(JSON.parse)

                solidlyPools.push(...addresses[SOLIDLY_FACTORY])
                algebraPools.push(...addresses[ALGEBRA_FACTORY])

                return {height, hash}
            } else {
                return undefined
            }
        },
        async onStateUpdate(dest, info) {
            let metadata: Metadata = {
                ...info,
                addresses: {
                    [ALGEBRA_FACTORY]: algebraPools,
                    [SOLIDLY_FACTORY]: solidlyPools,
                },
            }
            await dest.writeFile('pools.json', JSON.stringify(metadata))

            isReady = true
        },
    },
})

processor.run(db, async (ctx) => {
    if (isReady) process.exit()

    for (let c of ctx.blocks) {
        for (let i of c.logs) {
            if (i.address === SOLIDLY_FACTORY) {
                let {pair} = solidlyPoolFactoryAbi.events.PairCreated.decode(i)
                solidlyPools.push(pair.toLowerCase())
            }

            if (i.address === ALGEBRA_FACTORY) {
                let {pool} = algebraPoolFactoryAbi.events.Pool.decode(i)
                algebraPools.push(pool.toLowerCase())
            }
        }
    }
})
