import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import * as thena from './abi/bep20'
import * as solidlyPair from './abi/solidlyPair'
import * as solidlyFactory from './abi/solidlyFactory'
import * as algebraPool from './abi/algebraPool'
import * as algebraFactory from './abi/algebraFactory'
import * as hypervisor from './abi/hypervisor'
import {THENA_ADDRESS, ROUTER_V2_ADDRESS, ROUTER_V3_ADDRESS, SOLIDLY_FACTORY, ALGEBRA_FACTORY} from './config'
import fs from 'fs'
import {Store} from '@subsquid/typeorm-store'

const poolMetadata = getPreIndexedPools()
const hypervisors = getHypervisors()

export const processor = new EvmBatchProcessor()
    .setBlockRange({from: 25_000_000}) //24468802
    .setDataSource({
        archive: 'https://v2.archive.subsquid.io/network/bsc-mainnet-25m',
        chain: 'https://rpc.ankr.com/bsc',
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
        address: [THENA_ADDRESS],
        topic0: [thena.events.Transfer.topic, thena.events.Approval.topic],
        transaction: true,
    })
    .addLog({
        address: [SOLIDLY_FACTORY],
        topic0: [solidlyFactory.events.PairCreated.topic],
        transaction: true,
    })
    .addLog({
        address: poolMetadata.pools[SOLIDLY_FACTORY],
        topic0: [
            solidlyPair.events.Swap.topic,
            solidlyPair.events.Sync.topic,
            solidlyPair.events.Transfer.topic,
            solidlyPair.events.Mint.topic,
            solidlyPair.events.Burn.topic,
        ],
        range: {from: 0, to: poolMetadata.block},
        transaction: true,
    })
    .addLog({
        topic0: [
            solidlyPair.events.Swap.topic,
            solidlyPair.events.Sync.topic,
            solidlyPair.events.Transfer.topic,
            solidlyPair.events.Mint.topic,
            solidlyPair.events.Burn.topic,
        ],
        range: {from: poolMetadata.block + 1},
        transaction: true,
    })
    .addLog({
        address: [ALGEBRA_FACTORY],
        topic0: [algebraFactory.events.Pool.topic],
        transaction: true,
    })
    .addLog({
        address: poolMetadata.pools[ALGEBRA_FACTORY],
        topic0: [algebraPool.events.Swap.topic],
        range: {from: 0, to: poolMetadata.block},
        transaction: true,
    })
    .addLog({
        topic0: [algebraPool.events.Swap.topic],
        range: {from: poolMetadata.block + 1},
        transaction: true,
    })
    .addLog({
        address: hypervisors.addresses,
        topic0: [
            hypervisor.events.Deposit.topic,
            hypervisor.events.Withdraw.topic,
            hypervisor.events.Transfer.topic,
            hypervisor.events.Rebalance.topic,
        ],
        transaction: true,
    })
    .addTransaction({
        to: [THENA_ADDRESS, ROUTER_V2_ADDRESS, ROUTER_V3_ADDRESS],
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>

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
