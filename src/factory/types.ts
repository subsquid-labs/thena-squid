import {EvmBlock, EvmTransaction} from '@subsquid/evm-processor'

export interface PoolCreation {
    id: string
    block: Pick<EvmBlock, 'id' | 'hash' | 'height' | 'timestamp'>
    transaction: Pick<EvmTransaction, 'id' | 'hash'>
    token0: string
    token1: string
}
