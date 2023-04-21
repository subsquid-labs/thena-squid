import {lookupArchive} from '@subsquid/archive-registry'
import {BatchProcessorItem, EvmBatchProcessor} from '@subsquid/evm-processor'
import * as thena from './abi/bep20'
import * as routerV2 from './abi/routerV2'
import * as solidlyPair from './abi/solidlyPair'
import * as solidlyFactory from './abi/solidlyFactory'
import * as algebraPool from './abi/algebraPool'
import * as algebraFactory from './abi/algebraFactory'
import {THENA_ADDRESS, ROUTER_V2_ADDRESS, ROUTER_V3_ADDRESS, SOLIDLY_FACTORY} from './config'

const evmLogData = {
    evmLog: {
        topics: true,
        data: true,
    },
    transaction: {
        from: true,
        hash: true,
    },
} as const

export const processor = new EvmBatchProcessor()
    .setBlockRange({from: 25152397})
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
    // .addLog([], {
    //     filter: [[]],
    // })
    .addTransaction([THENA_ADDRESS, ROUTER_V2_ADDRESS, ROUTER_V3_ADDRESS], {
        sighash: [],
        data: {
            transaction: {
                from: true,
                hash: true,
            },
        },
    })

export type ProcessorItem = BatchProcessorItem<typeof processor>
