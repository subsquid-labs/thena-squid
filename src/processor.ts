import {lookupArchive} from '@subsquid/archive-registry'
import {BatchProcessorItem, EvmBatchProcessor} from '@subsquid/evm-processor'
import * as thena from './abi/bep20'
import * as solidlyPair from './abi/solidlyPair'
import * as solidlyFactory from './abi/solidlyFactory'
import * as algebraPool from './abi/algebraPool'
import * as algebraFactory from './abi/algebraFactory'
import * as hypervisor from './abi/hypervisor'
import {THENA_ADDRESS, ROUTER_V2_ADDRESS, ROUTER_V3_ADDRESS, SOLIDLY_FACTORY, ALGEBRA_FACTORY} from './config'
import fs from 'fs'

const transactionData = {
    transaction: {
        from: true,
        hash: true,
    },
} as const

const evmLogData = {
    ...transactionData,
    evmLog: {
        topics: true,
        data: true,
    },
} as const

const poolMetadata = getPreIndexedPools()
const hypervisors = getHypervisors()

export const processor = new EvmBatchProcessor()
    .setBlockRange({from: 24468802})
    .setDataSource({
        archive: lookupArchive('binance'),
        chain: 'https://rpc.ankr.com/bsc',
    })
    .addLog(THENA_ADDRESS, {
        filter: [[thena.events.Transfer.topic, thena.events.Approval.topic]],
        data: evmLogData,
    })
    .addLog(SOLIDLY_FACTORY, {
        filter: [[solidlyFactory.events.PairCreated.topic]],
        data: evmLogData,
    })
    .addLog(poolMetadata.pools[SOLIDLY_FACTORY], {
        filter: [
            [
                solidlyPair.events.Swap.topic,
                solidlyPair.events.Sync.topic,
                solidlyPair.events.Transfer.topic,
                solidlyPair.events.Mint.topic,
                solidlyPair.events.Burn.topic,
            ],
        ],
        data: evmLogData,
        range: {from: 0, to: poolMetadata.block},
    })
    .addLog([], {
        filter: [
            [
                solidlyPair.events.Swap.topic,
                solidlyPair.events.Sync.topic,
                solidlyPair.events.Transfer.topic,
                solidlyPair.events.Mint.topic,
                solidlyPair.events.Burn.topic,
            ],
        ],
        data: evmLogData,
        range: {from: poolMetadata.block + 1},
    })
    .addLog(ALGEBRA_FACTORY, {
        filter: [[algebraFactory.events.Pool.topic]],
        data: evmLogData,
    })
    .addLog(poolMetadata.pools[ALGEBRA_FACTORY], {
        filter: [[algebraPool.events.Swap.topic]],
        data: evmLogData,
        range: {from: 0, to: poolMetadata.block},
    })
    .addLog([], {
        filter: [[algebraPool.events.Swap.topic]],
        data: evmLogData,
        range: {from: poolMetadata.block + 1},
    })
    .addLog(hypervisors.addresses, {
        filter: [
            [
                hypervisor.events.Deposit.topic,
                hypervisor.events.Withdraw.topic,
                hypervisor.events.Transfer.topic,
                hypervisor.events.Rebalance.topic,
            ],
        ],
        data: evmLogData,
    })
    .addTransaction(hypervisors.addresses, {
        sighash: [hypervisor.functions.setWhitelist.sighash],
        data: transactionData,
    })
    .addTransaction([THENA_ADDRESS, ROUTER_V2_ADDRESS, ROUTER_V3_ADDRESS], {
        sighash: [],
        data: transactionData,
    })

export type ProcessorItem = BatchProcessorItem<typeof processor>

type PoolsMetadata = {
    block: number
    pools: Record<string, string[]>
}

function getPreIndexedPools(): PoolsMetadata {
    const file = fs.readFileSync('./assets/pools.json', 'utf-8')
    const metadata: PoolsMetadata = JSON.parse(file)
    return metadata
}

function getHypervisors(): {addresses: string[]} {
    const file = fs.readFileSync('./assets/hypervisors.json', 'utf-8')
    const metadata = JSON.parse(file)
    return metadata
}
