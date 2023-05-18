import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import * as algebraFactory from './abi/algebraFactory'
import * as algebraPool from './abi/algebraPool'
import * as thena from './abi/bep20'
import * as hypervisor from './abi/hypervisor'
import * as solidlyFactory from './abi/solidlyFactory'
import * as solidlyPair from './abi/solidlyPair'
import * as voter from './abi/voterV3'
import * as veToken from './abi/votingEscrow'
import * as rebaseDistributor from './abi/rebaseDistributor'
import * as gauge from './abi/gaugeV2'
import * as bribe from './abi/bribe'
import {
    ALGEBRA_FACTORY,
    REBASE_DISTRIBUTOR,
    ROUTER_V2_ADDRESS,
    ROUTER_V3_ADDRESS,
    SOLIDLY_FACTORY,
    THENA_ADDRESS,
    VE_TOKEN,
    VOTER,
} from './config'
import {loadGaugesAndBribes, loadHypervisors, loadPools} from './utils/loaders'

const poolMetadata = loadPools()
const gaugesAndBribes = loadGaugesAndBribes()
const hypervisors = loadHypervisors()

export const processor = new EvmBatchProcessor()
    .setBlockRange({from: 24_468_802}) //24_468_802
    .setDataSource({
        archive: 'https://v2.archive.subsquid.io/network/bsc-mainnet-24m',
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
        address: poolMetadata.addresses[SOLIDLY_FACTORY],
        topic0: [
            solidlyPair.events.Swap.topic,
            solidlyPair.events.Sync.topic,
            solidlyPair.events.Transfer.topic,
            solidlyPair.events.Mint.topic,
            solidlyPair.events.Burn.topic,
        ],
        range: {from: 0, to: poolMetadata.height},
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
        range: {from: poolMetadata.height + 1},
        transaction: true,
    })
    .addLog({
        address: [ALGEBRA_FACTORY],
        topic0: [algebraFactory.events.Pool.topic],
        transaction: true,
    })
    .addLog({
        address: poolMetadata.addresses[ALGEBRA_FACTORY],
        topic0: [algebraPool.events.Swap.topic],
        range: {from: 0, to: poolMetadata.height},
        transaction: true,
    })
    .addLog({
        topic0: [algebraPool.events.Swap.topic],
        range: {from: poolMetadata.height + 1},
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
    .addLog({
        address: [VOTER],
        topic0: [
            voter.events.GaugeCreated.topic,
            voter.events.GaugeKilled.topic,
            voter.events.GaugeRevived.topic,
            voter.events.Voted.topic,
            voter.events.Abstained.topic,
        ],
        transaction: true,
    })
    .addLog({
        address: gaugesAndBribes.addresses.gauges,
        topic0: [gauge.events.Deposit.topic, gauge.events.Withdraw.topic, gauge.events.Harvest.topic],
        transaction: true,
    })
    .addLog({
        address: gaugesAndBribes.addresses.bribes,
        topic0: [bribe.events.Staked.topic, bribe.events.Withdrawn.topic],
        transaction: true,
    })
    .addLog({
        address: [VE_TOKEN],
        topic0: [veToken.events.Transfer.topic, veToken.events.Deposit.topic, veToken.events.Withdraw.topic],
    })
    .addLog({
        address: [REBASE_DISTRIBUTOR],
        topic0: [rebaseDistributor.events.Claimed.topic],
    })
    .addTransaction({
        to: [THENA_ADDRESS, ROUTER_V2_ADDRESS, ROUTER_V3_ADDRESS],
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
