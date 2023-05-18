import fs from 'fs'

type PoolsMetadata = {
    height: number
    addresses: Record<string, string[]>
}

let pools: PoolsMetadata | undefined
export function loadPools(): PoolsMetadata {
    if (pools != null) return pools

    const file = fs.readFileSync('./assets/pools.json', 'utf-8')
    pools = JSON.parse(file) as PoolsMetadata
    return pools
}

type GaugesAndBribesMetadata = {
    height: number
    addresses: {
        gauges: string[]
        bribes: string[]
    }
}

let gauges: GaugesAndBribesMetadata | undefined
export function loadGaugesAndBribes(): GaugesAndBribesMetadata {
    if (gauges != null) return gauges

    const file = fs.readFileSync('./assets/gaugesAndBribes.json', 'utf-8')
    gauges = JSON.parse(file) as GaugesAndBribesMetadata
    return gauges
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
