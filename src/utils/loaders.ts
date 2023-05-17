import fs from 'fs'

type PoolsMetadata = {
    block: number
    pools: Record<string, string[]>
}

let pools: PoolsMetadata | undefined
export function loadPreindexedPools(): PoolsMetadata {
    if (pools != null) return pools

    const file = fs.readFileSync('./assets/pools.json', 'utf-8')
    pools = JSON.parse(file) as PoolsMetadata
    return pools
}

type HypervisorsMetadata = {
    addresses: string[]
}

let hypervisors: HypervisorsMetadata | undefined
export function loadHypervisors(): HypervisorsMetadata {
    const file = fs.readFileSync('./assets/hypervisors.json', 'utf-8')
    hypervisors = JSON.parse(file) as HypervisorsMetadata
    return hypervisors
}
