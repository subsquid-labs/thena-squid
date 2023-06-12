import assert from 'assert'
import {lookupArchive} from '@subsquid/archive-registry'
import {EvmBatchProcessor} from '@subsquid/evm-processor'
import {Database, LocalDest} from '@subsquid/file-store'
import * as voterAbi from '../src/abi/voterV3'
import {ALGEBRA_FACTORY, SOLIDLY_FACTORY, VOTER} from '../src/config'

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
        address: [VOTER],
        topic0: [voterAbi.events.GaugeCreated.topic],
    })

let gauges: string[] = []
let bribes: string[] = []

type Metadata = {
    height: number
    hash: string
    addresses: Record<'gauges' | 'bribes', string[]>
}

let isReady = false

let db = new Database({
    tables: {},
    dest: new LocalDest('./assets'),
    chunkSizeMb: Infinity,
    syncIntervalBlocks: 1,
    hooks: {
        async onStateRead(dest) {
            if (await dest.exists('gaugesAndBribes.json')) {
                let {height, hash, addresses}: Metadata = await dest.readFile('gaugesAndBribes.json').then(JSON.parse)

                gauges = addresses.gauges
                bribes = addresses.bribes

                return {height, hash}
            } else {
                return undefined
            }
        },
        async onStateUpdate(dest, info) {
            let metadata: Metadata = {
                ...info,
                addresses: {
                    gauges,
                    bribes,
                },
            }
            await dest.writeFile('gaugesAndBribes.json', JSON.stringify(metadata))

            isReady = true
        },
    },
})

processor.run(db, async (ctx) => {
    if (isReady) process.exit()

    for (let c of ctx.blocks) {
        for (let i of c.logs) {
            let {gauge, external_bribe, internal_bribe} = voterAbi.events.GaugeCreated.decode(i)
            gauges.push(gauge.toLowerCase())
            bribes.push(external_bribe.toLowerCase(), internal_bribe.toLowerCase())
        }
    }
})
