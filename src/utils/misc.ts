import {BatchBlock, EvmBlock} from '@subsquid/evm-processor'
import assert from 'assert'

export function processItems<I>(
    blocks: BatchBlock<I>[],
    fn: (block: BatchBlock<unknown>['header'], item: I, prevItem?: I) => void
) {
    for (let block of blocks) {
        let prevItem: I | undefined
        for (let item of block.items) {
            fn(block.header, item, prevItem)
            prevItem = item
        }
    }
}

export function getTimestamp(block: {timestamp: number}) {
    return new Date(block.timestamp)
}

export function toEntityMap<T extends {id: string}>(entities: T[]): Map<string, T> {
    return new Map(entities.map((e) => [e.id, e]))
}

export function last<T>(arr: T[]): T {
    assert(arr.length > 0)
    return arr[arr.length - 1]
}
