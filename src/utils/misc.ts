import {BatchBlock, EvmBlock} from '@subsquid/evm-processor'

export function processItems<I>(blocks: BatchBlock<I>[], fn: (block: BatchBlock<unknown>['header'], item: I) => void) {
    for (let block of blocks) {
        for (let item of block.items) {
            fn(block.header, item)
        }
    }
}

export function getTimestamp(block: EvmBlock) {
    return new Date(block.timestamp)
}

export function toEntityMap<T extends {id: string}>(entities: T[]): Map<string, T> {
    return new Map(entities.map((e) => [e.id, e]))
}
