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
    })
    .setBlockRange({
        from: earliestPairFactoryDeploymentBlock,
    })
    .addLog(SOLIDLY_FACTORY, {
        filter: [[solidlyPoolFactoryAbi.events.PairCreated.topic]],
        data: {
            evmLog: {
                topics: true,
                data: true,
            },
        },
    })
    .addLog(ALGEBRA_FACTORY, {
        filter: [[algebraPoolFactoryAbi.events.Pool.topic]],
        data: {
            evmLog: {
                address: true,
                topics: true,
                data: true,
            },
        },
    })

let solidlyPools: string[] = []
let algebraPools: string[] = []

type Metadata = {
    block: number
    pools: Record<string, string[]>
}

let isReady = false

let db = new Database({
    tables: {},
    dest: new LocalDest('./assets'),
    chunkSizeMb: Infinity,
    syncIntervalBlocks: 1,
    hooks: {
        async onConnect(dest) {
            if (await dest.exists('pools.json')) {
                let {block, pools}: Metadata = await dest.readFile('pools.json').then(JSON.parse)
                assert(Number.isSafeInteger(block))

                solidlyPools.push(...pools[SOLIDLY_FACTORY])
                algebraPools.push(...pools[ALGEBRA_FACTORY])

                return block
            } else {
                return -1
            }
        },
        async onFlush(dest, range) {
            let metadata: Metadata = {
                block: range.to,
                pools: {
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
        for (let i of c.items) {
            if (i.kind !== 'evmLog') continue

            if (i.address === SOLIDLY_FACTORY) {
                let {pair} = solidlyPoolFactoryAbi.events.PairCreated.decode(i.evmLog)
                solidlyPools.push(pair.toLowerCase())
            }

            if (i.address === ALGEBRA_FACTORY) {
                let {pool} = algebraPoolFactoryAbi.events.Pool.decode(i.evmLog)
                algebraPools.push(pool.toLowerCase())
            }
        }
    }
})
