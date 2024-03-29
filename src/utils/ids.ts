import assert from 'assert'

export function createTradeId(txId: string, index: number) {
    return `${txId}-${index.toString().padStart(5, '0')}`
}

export function createLiquidityPositionId(pool: string, address: string): string
export function createLiquidityPositionId(pool: string, address: string, lowerTick: number, upperTick: number): string
export function createLiquidityPositionId(pool: string, address: string, lowerTick?: number, upperTick?: number) {
    let id = `${pool}-${address}`

    if (lowerTick != null) {
        assert(lowerTick >= -8388608 && lowerTick <= 8388607)
        id += `-${Number(lowerTick) + 8388608}`
    }

    if (upperTick != null) {
        assert(upperTick >= -8388608 && upperTick <= 8388607)
        id += `-${Number(upperTick) + 8388608}`
    }

    return id
}

export function createLiquidityPositionUpdateId(txId: string, index: number) {
    return `${txId}-${index.toString().padStart(5, '0')}`
}

export function createGaugeStakeId(gauge: string, address: string) {
    let id = `${gauge}-${address}`

    return id
}

export function createVeTokenId(tokenIndex: bigint) {
    return tokenIndex.toString().padStart(10, '0')
}

export function createVoteId(tokenId: string, poolId: string) {
    return `${tokenId}-${poolId}`
}

export function createTradingCompetitionId(counterId: number, tcAddress: string) {
    return `${tcAddress}-${counterId}`
}

export function createTCParticipantId(tcId: string, userId: string) {
    return `${tcId}-${userId}`
}

export function createThenianNftId(tokenIndex: bigint) {
    return tokenIndex.toString().padStart(10, '0')
}

export function createUsernameNftId(tokenIndex: bigint) {
    return tokenIndex.toString().padStart(10, '0')
}