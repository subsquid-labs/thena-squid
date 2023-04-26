import assert from 'assert'

export function toEntityMap<T extends {id: string}>(entities: T[]): Map<string, T> {
    return new Map(entities.map((e) => [e.id, e]))
}

export function last<T>(arr: T[]): T {
    assert(arr.length > 0)
    return arr[arr.length - 1]
}
