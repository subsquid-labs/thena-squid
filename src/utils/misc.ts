import assert from 'assert'

export function toEntityMap<T extends {id: string}>(entities: T[]): Map<string, T> {
    return new Map(entities.map((e) => [e.id, e]))
}

export function last<T>(arr: T[]): T {
    assert(arr.length > 0)
    return arr[arr.length - 1]
}

export function* splitIntoBatches<T>(list: T[], maxBatchSize: number): Generator<T[]> {
    if (list.length <= maxBatchSize) {
        yield list
    } else {
        let offset = 0
        while (list.length - offset > maxBatchSize) {
            yield list.slice(offset, offset + maxBatchSize)
            offset += maxBatchSize
        }
        yield list.slice(offset)
    }
}