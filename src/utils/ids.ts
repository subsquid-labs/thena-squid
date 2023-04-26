export function createTradeId(txId: string, index: number) {
    return `${txId}-${index.toString().padStart(5, '0')}`
}

export function createLiquidityPositionId(pool: string, address: string) {
    return `${pool}-${address}`
}

export function createLiquidityPositionUpdateId(txId: string, index: number) {
    return `${txId}-${index.toString().padStart(5, '0')}`
}