import {lookupArchive} from '@subsquid/archive-registry'
import {BatchProcessorItem, EvmBatchProcessor} from '@subsquid/evm-processor'
import * as thena from './abi/bep20'
import * as routerV2 from './abi/routerV2'
import * as solidlyPair from './abi/solidlyPair'
import * as solidlyFactory from './abi/solidlyFactory'
import * as algebraPool from './abi/algebraPool'
import * as algebraFactory from './abi/algebraFactory'
import {THENA_ADDRESS, ROUTER_V2_ADDRESS, ROUTER_V3_ADDRESS, SOLIDLY_FACTORY, ALGEBRA_FACTORY} from './config'

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
    .addLog(ROUTER_V2_ADDRESS, {
        filter: [[routerV2.events.Swap.topic]],
        data: evmLogData,
    })
    .addLog(SOLIDLY_FACTORY, {
        filter: [[solidlyFactory.events.PairCreated.topic]],
        data: evmLogData,
    })
    .addLog([], {
        filter: [[solidlyPair.events.Swap.topic]],
        data: evmLogData,
    })
    .addLog(ALGEBRA_FACTORY, {
        filter: [[algebraFactory.events.Pool.topic]],
        data: evmLogData,
    })
    .addLog([], {
        filter: [[algebraPool.events.Swap.topic]],
        data: evmLogData,
    })
    .addTransaction([THENA_ADDRESS, ROUTER_V2_ADDRESS, ROUTER_V3_ADDRESS], {
        sighash: [],
        data: transactionData,
    })

export type ProcessorItem = BatchProcessorItem<typeof processor>
