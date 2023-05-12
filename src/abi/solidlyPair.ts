import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './solidlyPair.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, spender: string, amount: bigint] & {owner: string, spender: string, amount: bigint})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    Burn: new LogEvent<([sender: string, amount0: bigint, amount1: bigint, to: string] & {sender: string, amount0: bigint, amount1: bigint, to: string})>(
        abi, '0xdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496'
    ),
    Claim: new LogEvent<([sender: string, recipient: string, amount0: bigint, amount1: bigint] & {sender: string, recipient: string, amount0: bigint, amount1: bigint})>(
        abi, '0x865ca08d59f5cb456e85cd2f7ef63664ea4f73327414e9d8152c4158b0e94645'
    ),
    Fees: new LogEvent<([sender: string, amount0: bigint, amount1: bigint] & {sender: string, amount0: bigint, amount1: bigint})>(
        abi, '0x112c256902bf554b6ed882d2936687aaeb4225e8cd5b51303c90ca6cf43a8602'
    ),
    Mint: new LogEvent<([sender: string, amount0: bigint, amount1: bigint] & {sender: string, amount0: bigint, amount1: bigint})>(
        abi, '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f'
    ),
    Swap: new LogEvent<([sender: string, amount0In: bigint, amount1In: bigint, amount0Out: bigint, amount1Out: bigint, to: string] & {sender: string, amount0In: bigint, amount1In: bigint, amount0Out: bigint, amount1Out: bigint, to: string})>(
        abi, '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822'
    ),
    Sync: new LogEvent<([reserve0: bigint, reserve1: bigint] & {reserve0: bigint, reserve1: bigint})>(
        abi, '0xcf2aa50876cdfbb541206f89af0ee78d44a2abf8d328e37fa4917f982149848a'
    ),
    Transfer: new LogEvent<([from: string, to: string, amount: bigint] & {from: string, to: string, amount: bigint})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
}

export const functions = {
    allowance: new Func<[_: string, _: string], {}, bigint>(
        abi, '0xdd62ed3e'
    ),
    approve: new Func<[spender: string, amount: bigint], {spender: string, amount: bigint}, boolean>(
        abi, '0x095ea7b3'
    ),
    balanceOf: new Func<[_: string], {}, bigint>(
        abi, '0x70a08231'
    ),
    blockTimestampLast: new Func<[], {}, bigint>(
        abi, '0xc5700a02'
    ),
    burn: new Func<[to: string], {to: string}, ([amount0: bigint, amount1: bigint] & {amount0: bigint, amount1: bigint})>(
        abi, '0x89afcb44'
    ),
    claimFees: new Func<[], {}, ([claimed0: bigint, claimed1: bigint] & {claimed0: bigint, claimed1: bigint})>(
        abi, '0xd294f093'
    ),
    claimStakingFees: new Func<[], {}, []>(
        abi, '0xf083be3b'
    ),
    claimable0: new Func<[_: string], {}, bigint>(
        abi, '0x4d5a9f8a'
    ),
    claimable1: new Func<[_: string], {}, bigint>(
        abi, '0xa1ac4d13'
    ),
    current: new Func<[tokenIn: string, amountIn: bigint], {tokenIn: string, amountIn: bigint}, bigint>(
        abi, '0x517b3f82'
    ),
    currentCumulativePrices: new Func<[], {}, ([reserve0Cumulative: bigint, reserve1Cumulative: bigint, blockTimestamp: bigint] & {reserve0Cumulative: bigint, reserve1Cumulative: bigint, blockTimestamp: bigint})>(
        abi, '0x1df8c717'
    ),
    decimals: new Func<[], {}, number>(
        abi, '0x313ce567'
    ),
    fees: new Func<[], {}, string>(
        abi, '0x9af1d35a'
    ),
    getAmountOut: new Func<[amountIn: bigint, tokenIn: string], {amountIn: bigint, tokenIn: string}, bigint>(
        abi, '0xf140a35a'
    ),
    getReserves: new Func<[], {}, ([_reserve0: bigint, _reserve1: bigint, _blockTimestampLast: bigint] & {_reserve0: bigint, _reserve1: bigint, _blockTimestampLast: bigint})>(
        abi, '0x0902f1ac'
    ),
    index0: new Func<[], {}, bigint>(
        abi, '0x32c0defd'
    ),
    index1: new Func<[], {}, bigint>(
        abi, '0xbda39cad'
    ),
    isStable: new Func<[], {}, boolean>(
        abi, '0x09047bdd'
    ),
    lastObservation: new Func<[], {}, ([timestamp: bigint, reserve0Cumulative: bigint, reserve1Cumulative: bigint] & {timestamp: bigint, reserve0Cumulative: bigint, reserve1Cumulative: bigint})>(
        abi, '0x8a7b8cf2'
    ),
    metadata: new Func<[], {}, ([dec0: bigint, dec1: bigint, r0: bigint, r1: bigint, st: boolean, t0: string, t1: string] & {dec0: bigint, dec1: bigint, r0: bigint, r1: bigint, st: boolean, t0: string, t1: string})>(
        abi, '0x392f37e9'
    ),
    mint: new Func<[to: string], {to: string}, bigint>(
        abi, '0x6a627842'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    nonces: new Func<[_: string], {}, bigint>(
        abi, '0x7ecebe00'
    ),
    observationLength: new Func<[], {}, bigint>(
        abi, '0xebeb31db'
    ),
    observations: new Func<[_: bigint], {}, ([timestamp: bigint, reserve0Cumulative: bigint, reserve1Cumulative: bigint] & {timestamp: bigint, reserve0Cumulative: bigint, reserve1Cumulative: bigint})>(
        abi, '0x252c09d7'
    ),
    permit: new Func<[owner: string, spender: string, value: bigint, deadline: bigint, v: number, r: string, s: string], {owner: string, spender: string, value: bigint, deadline: bigint, v: number, r: string, s: string}, []>(
        abi, '0xd505accf'
    ),
    prices: new Func<[tokenIn: string, amountIn: bigint, points: bigint], {tokenIn: string, amountIn: bigint, points: bigint}, Array<bigint>>(
        abi, '0x5881c475'
    ),
    quote: new Func<[tokenIn: string, amountIn: bigint, granularity: bigint], {tokenIn: string, amountIn: bigint, granularity: bigint}, bigint>(
        abi, '0x9e8cc04b'
    ),
    reserve0: new Func<[], {}, bigint>(
        abi, '0x443cb4bc'
    ),
    reserve0CumulativeLast: new Func<[], {}, bigint>(
        abi, '0xbf944dbc'
    ),
    reserve1: new Func<[], {}, bigint>(
        abi, '0x5a76f25e'
    ),
    reserve1CumulativeLast: new Func<[], {}, bigint>(
        abi, '0xc245febc'
    ),
    sample: new Func<[tokenIn: string, amountIn: bigint, points: bigint, window: bigint], {tokenIn: string, amountIn: bigint, points: bigint, window: bigint}, Array<bigint>>(
        abi, '0x13345fe1'
    ),
    skim: new Func<[to: string], {to: string}, []>(
        abi, '0xbc25cf77'
    ),
    stable: new Func<[], {}, boolean>(
        abi, '0x22be3de1'
    ),
    supplyIndex0: new Func<[_: string], {}, bigint>(
        abi, '0x9f767c88'
    ),
    supplyIndex1: new Func<[_: string], {}, bigint>(
        abi, '0x205aabf1'
    ),
    swap: new Func<[amount0Out: bigint, amount1Out: bigint, to: string, data: string], {amount0Out: bigint, amount1Out: bigint, to: string, data: string}, []>(
        abi, '0x022c0d9f'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    sync: new Func<[], {}, []>(
        abi, '0xfff6cae9'
    ),
    token0: new Func<[], {}, string>(
        abi, '0x0dfe1681'
    ),
    token1: new Func<[], {}, string>(
        abi, '0xd21220a7'
    ),
    tokens: new Func<[], {}, [_: string, _: string]>(
        abi, '0x9d63848a'
    ),
    totalSupply: new Func<[], {}, bigint>(
        abi, '0x18160ddd'
    ),
    transfer: new Func<[dst: string, amount: bigint], {dst: string, amount: bigint}, boolean>(
        abi, '0xa9059cbb'
    ),
    transferFrom: new Func<[src: string, dst: string, amount: bigint], {src: string, dst: string, amount: bigint}, boolean>(
        abi, '0x23b872dd'
    ),
}

export class Contract extends ContractBase {

    allowance(arg0: string, arg1: string): Promise<bigint> {
        return this.eth_call(functions.allowance, [arg0, arg1])
    }

    balanceOf(arg0: string): Promise<bigint> {
        return this.eth_call(functions.balanceOf, [arg0])
    }

    blockTimestampLast(): Promise<bigint> {
        return this.eth_call(functions.blockTimestampLast, [])
    }

    claimable0(arg0: string): Promise<bigint> {
        return this.eth_call(functions.claimable0, [arg0])
    }

    claimable1(arg0: string): Promise<bigint> {
        return this.eth_call(functions.claimable1, [arg0])
    }

    current(tokenIn: string, amountIn: bigint): Promise<bigint> {
        return this.eth_call(functions.current, [tokenIn, amountIn])
    }

    currentCumulativePrices(): Promise<([reserve0Cumulative: bigint, reserve1Cumulative: bigint, blockTimestamp: bigint] & {reserve0Cumulative: bigint, reserve1Cumulative: bigint, blockTimestamp: bigint})> {
        return this.eth_call(functions.currentCumulativePrices, [])
    }

    decimals(): Promise<number> {
        return this.eth_call(functions.decimals, [])
    }

    fees(): Promise<string> {
        return this.eth_call(functions.fees, [])
    }

    getAmountOut(amountIn: bigint, tokenIn: string): Promise<bigint> {
        return this.eth_call(functions.getAmountOut, [amountIn, tokenIn])
    }

    getReserves(): Promise<([_reserve0: bigint, _reserve1: bigint, _blockTimestampLast: bigint] & {_reserve0: bigint, _reserve1: bigint, _blockTimestampLast: bigint})> {
        return this.eth_call(functions.getReserves, [])
    }

    index0(): Promise<bigint> {
        return this.eth_call(functions.index0, [])
    }

    index1(): Promise<bigint> {
        return this.eth_call(functions.index1, [])
    }

    isStable(): Promise<boolean> {
        return this.eth_call(functions.isStable, [])
    }

    lastObservation(): Promise<([timestamp: bigint, reserve0Cumulative: bigint, reserve1Cumulative: bigint] & {timestamp: bigint, reserve0Cumulative: bigint, reserve1Cumulative: bigint})> {
        return this.eth_call(functions.lastObservation, [])
    }

    metadata(): Promise<([dec0: bigint, dec1: bigint, r0: bigint, r1: bigint, st: boolean, t0: string, t1: string] & {dec0: bigint, dec1: bigint, r0: bigint, r1: bigint, st: boolean, t0: string, t1: string})> {
        return this.eth_call(functions.metadata, [])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    nonces(arg0: string): Promise<bigint> {
        return this.eth_call(functions.nonces, [arg0])
    }

    observationLength(): Promise<bigint> {
        return this.eth_call(functions.observationLength, [])
    }

    observations(arg0: bigint): Promise<([timestamp: bigint, reserve0Cumulative: bigint, reserve1Cumulative: bigint] & {timestamp: bigint, reserve0Cumulative: bigint, reserve1Cumulative: bigint})> {
        return this.eth_call(functions.observations, [arg0])
    }

    prices(tokenIn: string, amountIn: bigint, points: bigint): Promise<Array<bigint>> {
        return this.eth_call(functions.prices, [tokenIn, amountIn, points])
    }

    quote(tokenIn: string, amountIn: bigint, granularity: bigint): Promise<bigint> {
        return this.eth_call(functions.quote, [tokenIn, amountIn, granularity])
    }

    reserve0(): Promise<bigint> {
        return this.eth_call(functions.reserve0, [])
    }

    reserve0CumulativeLast(): Promise<bigint> {
        return this.eth_call(functions.reserve0CumulativeLast, [])
    }

    reserve1(): Promise<bigint> {
        return this.eth_call(functions.reserve1, [])
    }

    reserve1CumulativeLast(): Promise<bigint> {
        return this.eth_call(functions.reserve1CumulativeLast, [])
    }

    sample(tokenIn: string, amountIn: bigint, points: bigint, window: bigint): Promise<Array<bigint>> {
        return this.eth_call(functions.sample, [tokenIn, amountIn, points, window])
    }

    stable(): Promise<boolean> {
        return this.eth_call(functions.stable, [])
    }

    supplyIndex0(arg0: string): Promise<bigint> {
        return this.eth_call(functions.supplyIndex0, [arg0])
    }

    supplyIndex1(arg0: string): Promise<bigint> {
        return this.eth_call(functions.supplyIndex1, [arg0])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    token0(): Promise<string> {
        return this.eth_call(functions.token0, [])
    }

    token1(): Promise<string> {
        return this.eth_call(functions.token1, [])
    }

    tokens(): Promise<[_: string, _: string]> {
        return this.eth_call(functions.tokens, [])
    }

    totalSupply(): Promise<bigint> {
        return this.eth_call(functions.totalSupply, [])
    }
}
