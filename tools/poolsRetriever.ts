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
        archive: lookupArchive('binance'),
        chain: {url: 'https://rpc.ankr.com/bsc', maxBatchCallSize: 10},
    })
    .setBlockRange({
        from: earliestPairFactoryDeploymentBlock,
    })
    .setFields({
        log: {
            topics: true,
            data: true,
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
    .setFinalityConfirmation(100)

let solidlyPools: string[] = []
let algebraPools: string[] = []

type Metadata = {
    height: number
    hash: string
    addresses: Record<string, string[]>
}

let isInit = false
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

                if (!isInit) {
                    solidlyPools = addresses[SOLIDLY_FACTORY]
                    algebraPools = addresses[ALGEBRA_FACTORY]
                    isInit = true
                }

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
        },
    },
})

processor.run(db, async (ctx) => {
    if (isReady) process.exit()
    if (ctx.isHead) isReady = true

    for (let c of ctx.blocks) {
        for (let i of c.logs) {
            if (i.address === SOLIDLY_FACTORY) {
                let {pair} = solidlyPoolFactoryAbi.events.PairCreated.decode(i)
                solidlyPools.push(pair.toLowerCase())
                ctx.log.info(`solidlyPools: ${solidlyPools.length}`)
            }

            if (i.address === ALGEBRA_FACTORY) {
                let {pool} = algebraPoolFactoryAbi.events.Pool.decode(i)
                algebraPools.push(pool.toLowerCase())
                ctx.log.info(`algebraPools: ${algebraPools.length}`)
            }
        }
    }
})
