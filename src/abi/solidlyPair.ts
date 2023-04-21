import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './solidlyPair.abi'

export const abi = new ethers.utils.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, spender: string, amount: ethers.BigNumber] & {owner: string, spender: string, amount: ethers.BigNumber})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    Burn: new LogEvent<([sender: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber, to: string] & {sender: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber, to: string})>(
        abi, '0xdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496'
    ),
    Claim: new LogEvent<([sender: string, recipient: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber] & {sender: string, recipient: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber})>(
        abi, '0x865ca08d59f5cb456e85cd2f7ef63664ea4f73327414e9d8152c4158b0e94645'
    ),
    Fees: new LogEvent<([sender: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber] & {sender: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber})>(
        abi, '0x112c256902bf554b6ed882d2936687aaeb4225e8cd5b51303c90ca6cf43a8602'
    ),
    Mint: new LogEvent<([sender: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber] & {sender: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber})>(
        abi, '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f'
    ),
    Swap: new LogEvent<([sender: string, amount0In: ethers.BigNumber, amount1In: ethers.BigNumber, amount0Out: ethers.BigNumber, amount1Out: ethers.BigNumber, to: string] & {sender: string, amount0In: ethers.BigNumber, amount1In: ethers.BigNumber, amount0Out: ethers.BigNumber, amount1Out: ethers.BigNumber, to: string})>(
        abi, '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822'
    ),
    Sync: new LogEvent<([reserve0: ethers.BigNumber, reserve1: ethers.BigNumber] & {reserve0: ethers.BigNumber, reserve1: ethers.BigNumber})>(
        abi, '0xcf2aa50876cdfbb541206f89af0ee78d44a2abf8d328e37fa4917f982149848a'
    ),
    Transfer: new LogEvent<([from: string, to: string, amount: ethers.BigNumber] & {from: string, to: string, amount: ethers.BigNumber})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
}

export const functions = {
    allowance: new Func<[_: string, _: string], {}, ethers.BigNumber>(
        abi, '0xdd62ed3e'
    ),
    approve: new Func<[spender: string, amount: ethers.BigNumber], {spender: string, amount: ethers.BigNumber}, boolean>(
        abi, '0x095ea7b3'
    ),
    balanceOf: new Func<[_: string], {}, ethers.BigNumber>(
        abi, '0x70a08231'
    ),
    blockTimestampLast: new Func<[], {}, ethers.BigNumber>(
        abi, '0xc5700a02'
    ),
    burn: new Func<[to: string], {to: string}, ([amount0: ethers.BigNumber, amount1: ethers.BigNumber] & {amount0: ethers.BigNumber, amount1: ethers.BigNumber})>(
        abi, '0x89afcb44'
    ),
    claimFees: new Func<[], {}, ([claimed0: ethers.BigNumber, claimed1: ethers.BigNumber] & {claimed0: ethers.BigNumber, claimed1: ethers.BigNumber})>(
        abi, '0xd294f093'
    ),
    claimStakingFees: new Func<[], {}, []>(
        abi, '0xf083be3b'
    ),
    claimable0: new Func<[_: string], {}, ethers.BigNumber>(
        abi, '0x4d5a9f8a'
    ),
    claimable1: new Func<[_: string], {}, ethers.BigNumber>(
        abi, '0xa1ac4d13'
    ),
    current: new Func<[tokenIn: string, amountIn: ethers.BigNumber], {tokenIn: string, amountIn: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0x517b3f82'
    ),
    currentCumulativePrices: new Func<[], {}, ([reserve0Cumulative: ethers.BigNumber, reserve1Cumulative: ethers.BigNumber, blockTimestamp: ethers.BigNumber] & {reserve0Cumulative: ethers.BigNumber, reserve1Cumulative: ethers.BigNumber, blockTimestamp: ethers.BigNumber})>(
        abi, '0x1df8c717'
    ),
    decimals: new Func<[], {}, number>(
        abi, '0x313ce567'
    ),
    fees: new Func<[], {}, string>(
        abi, '0x9af1d35a'
    ),
    getAmountOut: new Func<[amountIn: ethers.BigNumber, tokenIn: string], {amountIn: ethers.BigNumber, tokenIn: string}, ethers.BigNumber>(
        abi, '0xf140a35a'
    ),
    getReserves: new Func<[], {}, ([_reserve0: ethers.BigNumber, _reserve1: ethers.BigNumber, _blockTimestampLast: ethers.BigNumber] & {_reserve0: ethers.BigNumber, _reserve1: ethers.BigNumber, _blockTimestampLast: ethers.BigNumber})>(
        abi, '0x0902f1ac'
    ),
    index0: new Func<[], {}, ethers.BigNumber>(
        abi, '0x32c0defd'
    ),
    index1: new Func<[], {}, ethers.BigNumber>(
        abi, '0xbda39cad'
    ),
    isStable: new Func<[], {}, boolean>(
        abi, '0x09047bdd'
    ),
    lastObservation: new Func<[], {}, ([timestamp: ethers.BigNumber, reserve0Cumulative: ethers.BigNumber, reserve1Cumulative: ethers.BigNumber] & {timestamp: ethers.BigNumber, reserve0Cumulative: ethers.BigNumber, reserve1Cumulative: ethers.BigNumber})>(
        abi, '0x8a7b8cf2'
    ),
    metadata: new Func<[], {}, ([dec0: ethers.BigNumber, dec1: ethers.BigNumber, r0: ethers.BigNumber, r1: ethers.BigNumber, st: boolean, t0: string, t1: string] & {dec0: ethers.BigNumber, dec1: ethers.BigNumber, r0: ethers.BigNumber, r1: ethers.BigNumber, st: boolean, t0: string, t1: string})>(
        abi, '0x392f37e9'
    ),
    mint: new Func<[to: string], {to: string}, ethers.BigNumber>(
        abi, '0x6a627842'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    nonces: new Func<[_: string], {}, ethers.BigNumber>(
        abi, '0x7ecebe00'
    ),
    observationLength: new Func<[], {}, ethers.BigNumber>(
        abi, '0xebeb31db'
    ),
    observations: new Func<[_: ethers.BigNumber], {}, ([timestamp: ethers.BigNumber, reserve0Cumulative: ethers.BigNumber, reserve1Cumulative: ethers.BigNumber] & {timestamp: ethers.BigNumber, reserve0Cumulative: ethers.BigNumber, reserve1Cumulative: ethers.BigNumber})>(
        abi, '0x252c09d7'
    ),
    permit: new Func<[owner: string, spender: string, value: ethers.BigNumber, deadline: ethers.BigNumber, v: number, r: string, s: string], {owner: string, spender: string, value: ethers.BigNumber, deadline: ethers.BigNumber, v: number, r: string, s: string}, []>(
        abi, '0xd505accf'
    ),
    prices: new Func<[tokenIn: string, amountIn: ethers.BigNumber, points: ethers.BigNumber], {tokenIn: string, amountIn: ethers.BigNumber, points: ethers.BigNumber}, Array<ethers.BigNumber>>(
        abi, '0x5881c475'
    ),
    quote: new Func<[tokenIn: string, amountIn: ethers.BigNumber, granularity: ethers.BigNumber], {tokenIn: string, amountIn: ethers.BigNumber, granularity: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0x9e8cc04b'
    ),
    reserve0: new Func<[], {}, ethers.BigNumber>(
        abi, '0x443cb4bc'
    ),
    reserve0CumulativeLast: new Func<[], {}, ethers.BigNumber>(
        abi, '0xbf944dbc'
    ),
    reserve1: new Func<[], {}, ethers.BigNumber>(
        abi, '0x5a76f25e'
    ),
    reserve1CumulativeLast: new Func<[], {}, ethers.BigNumber>(
        abi, '0xc245febc'
    ),
    sample: new Func<[tokenIn: string, amountIn: ethers.BigNumber, points: ethers.BigNumber, window: ethers.BigNumber], {tokenIn: string, amountIn: ethers.BigNumber, points: ethers.BigNumber, window: ethers.BigNumber}, Array<ethers.BigNumber>>(
        abi, '0x13345fe1'
    ),
    skim: new Func<[to: string], {to: string}, []>(
        abi, '0xbc25cf77'
    ),
    stable: new Func<[], {}, boolean>(
        abi, '0x22be3de1'
    ),
    supplyIndex0: new Func<[_: string], {}, ethers.BigNumber>(
        abi, '0x9f767c88'
    ),
    supplyIndex1: new Func<[_: string], {}, ethers.BigNumber>(
        abi, '0x205aabf1'
    ),
    swap: new Func<[amount0Out: ethers.BigNumber, amount1Out: ethers.BigNumber, to: string, data: string], {amount0Out: ethers.BigNumber, amount1Out: ethers.BigNumber, to: string, data: string}, []>(
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
    totalSupply: new Func<[], {}, ethers.BigNumber>(
        abi, '0x18160ddd'
    ),
    transfer: new Func<[dst: string, amount: ethers.BigNumber], {dst: string, amount: ethers.BigNumber}, boolean>(
        abi, '0xa9059cbb'
    ),
    transferFrom: new Func<[src: string, dst: string, amount: ethers.BigNumber], {src: string, dst: string, amount: ethers.BigNumber}, boolean>(
        abi, '0x23b872dd'
    ),
}

export class Contract extends ContractBase {

    allowance(arg0: string, arg1: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.allowance, [arg0, arg1])
    }

    balanceOf(arg0: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.balanceOf, [arg0])
    }

    blockTimestampLast(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.blockTimestampLast, [])
    }

    claimable0(arg0: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.claimable0, [arg0])
    }

    claimable1(arg0: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.claimable1, [arg0])
    }

    current(tokenIn: string, amountIn: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.current, [tokenIn, amountIn])
    }

    currentCumulativePrices(): Promise<([reserve0Cumulative: ethers.BigNumber, reserve1Cumulative: ethers.BigNumber, blockTimestamp: ethers.BigNumber] & {reserve0Cumulative: ethers.BigNumber, reserve1Cumulative: ethers.BigNumber, blockTimestamp: ethers.BigNumber})> {
        return this.eth_call(functions.currentCumulativePrices, [])
    }

    decimals(): Promise<number> {
        return this.eth_call(functions.decimals, [])
    }

    fees(): Promise<string> {
        return this.eth_call(functions.fees, [])
    }

    getAmountOut(amountIn: ethers.BigNumber, tokenIn: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.getAmountOut, [amountIn, tokenIn])
    }

    getReserves(): Promise<([_reserve0: ethers.BigNumber, _reserve1: ethers.BigNumber, _blockTimestampLast: ethers.BigNumber] & {_reserve0: ethers.BigNumber, _reserve1: ethers.BigNumber, _blockTimestampLast: ethers.BigNumber})> {
        return this.eth_call(functions.getReserves, [])
    }

    index0(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.index0, [])
    }

    index1(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.index1, [])
    }

    isStable(): Promise<boolean> {
        return this.eth_call(functions.isStable, [])
    }

    lastObservation(): Promise<([timestamp: ethers.BigNumber, reserve0Cumulative: ethers.BigNumber, reserve1Cumulative: ethers.BigNumber] & {timestamp: ethers.BigNumber, reserve0Cumulative: ethers.BigNumber, reserve1Cumulative: ethers.BigNumber})> {
        return this.eth_call(functions.lastObservation, [])
    }

    metadata(): Promise<([dec0: ethers.BigNumber, dec1: ethers.BigNumber, r0: ethers.BigNumber, r1: ethers.BigNumber, st: boolean, t0: string, t1: string] & {dec0: ethers.BigNumber, dec1: ethers.BigNumber, r0: ethers.BigNumber, r1: ethers.BigNumber, st: boolean, t0: string, t1: string})> {
        return this.eth_call(functions.metadata, [])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    nonces(arg0: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.nonces, [arg0])
    }

    observationLength(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.observationLength, [])
    }

    observations(arg0: ethers.BigNumber): Promise<([timestamp: ethers.BigNumber, reserve0Cumulative: ethers.BigNumber, reserve1Cumulative: ethers.BigNumber] & {timestamp: ethers.BigNumber, reserve0Cumulative: ethers.BigNumber, reserve1Cumulative: ethers.BigNumber})> {
        return this.eth_call(functions.observations, [arg0])
    }

    prices(tokenIn: string, amountIn: ethers.BigNumber, points: ethers.BigNumber): Promise<Array<ethers.BigNumber>> {
        return this.eth_call(functions.prices, [tokenIn, amountIn, points])
    }

    quote(tokenIn: string, amountIn: ethers.BigNumber, granularity: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.quote, [tokenIn, amountIn, granularity])
    }

    reserve0(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.reserve0, [])
    }

    reserve0CumulativeLast(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.reserve0CumulativeLast, [])
    }

    reserve1(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.reserve1, [])
    }

    reserve1CumulativeLast(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.reserve1CumulativeLast, [])
    }

    sample(tokenIn: string, amountIn: ethers.BigNumber, points: ethers.BigNumber, window: ethers.BigNumber): Promise<Array<ethers.BigNumber>> {
        return this.eth_call(functions.sample, [tokenIn, amountIn, points, window])
    }

    stable(): Promise<boolean> {
        return this.eth_call(functions.stable, [])
    }

    supplyIndex0(arg0: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.supplyIndex0, [arg0])
    }

    supplyIndex1(arg0: string): Promise<ethers.BigNumber> {
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

    totalSupply(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.totalSupply, [])
    }
}
