import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './routerV2.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Swap: new LogEvent<([sender: string, amount0In: bigint, _tokenIn: string, to: string, stable: boolean] & {sender: string, amount0In: bigint, _tokenIn: string, to: string, stable: boolean})>(
        abi, '0x423c093a1f80c354c75d4f9e86fde37d7c9014453df9643f585a1b199d094e50'
    ),
}

export const functions = {
    UNSAFE_swapExactTokensForTokens: new Func<[amounts: Array<bigint>, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>, to: string, deadline: bigint], {amounts: Array<bigint>, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>, to: string, deadline: bigint}, Array<bigint>>(
        abi, '0x7301e3c8'
    ),
    addLiquidity: new Func<[tokenA: string, tokenB: string, stable: boolean, amountADesired: bigint, amountBDesired: bigint, amountAMin: bigint, amountBMin: bigint, to: string, deadline: bigint], {tokenA: string, tokenB: string, stable: boolean, amountADesired: bigint, amountBDesired: bigint, amountAMin: bigint, amountBMin: bigint, to: string, deadline: bigint}, ([amountA: bigint, amountB: bigint, liquidity: bigint] & {amountA: bigint, amountB: bigint, liquidity: bigint})>(
        abi, '0x5a47ddc3'
    ),
    addLiquidityETH: new Func<[token: string, stable: boolean, amountTokenDesired: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint], {token: string, stable: boolean, amountTokenDesired: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint}, ([amountToken: bigint, amountETH: bigint, liquidity: bigint] & {amountToken: bigint, amountETH: bigint, liquidity: bigint})>(
        abi, '0xb7e0d4c0'
    ),
    factory: new Func<[], {}, string>(
        abi, '0xc45a0155'
    ),
    getAmountOut: new Func<[amountIn: bigint, tokenIn: string, tokenOut: string], {amountIn: bigint, tokenIn: string, tokenOut: string}, ([amount: bigint, stable: boolean] & {amount: bigint, stable: boolean})>(
        abi, '0x5e1e6325'
    ),
    getAmountsOut: new Func<[amountIn: bigint, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>], {amountIn: bigint, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>}, Array<bigint>>(
        abi, '0x9881fcb4'
    ),
    getReserves: new Func<[tokenA: string, tokenB: string, stable: boolean], {tokenA: string, tokenB: string, stable: boolean}, ([reserveA: bigint, reserveB: bigint] & {reserveA: bigint, reserveB: bigint})>(
        abi, '0x5e60dab5'
    ),
    isPair: new Func<[pair: string], {pair: string}, boolean>(
        abi, '0xe5e31b13'
    ),
    pairFor: new Func<[tokenA: string, tokenB: string, stable: boolean], {tokenA: string, tokenB: string, stable: boolean}, string>(
        abi, '0x4c1ee03e'
    ),
    quoteAddLiquidity: new Func<[tokenA: string, tokenB: string, stable: boolean, amountADesired: bigint, amountBDesired: bigint], {tokenA: string, tokenB: string, stable: boolean, amountADesired: bigint, amountBDesired: bigint}, ([amountA: bigint, amountB: bigint, liquidity: bigint] & {amountA: bigint, amountB: bigint, liquidity: bigint})>(
        abi, '0x98a0fb3c'
    ),
    quoteRemoveLiquidity: new Func<[tokenA: string, tokenB: string, stable: boolean, liquidity: bigint], {tokenA: string, tokenB: string, stable: boolean, liquidity: bigint}, ([amountA: bigint, amountB: bigint] & {amountA: bigint, amountB: bigint})>(
        abi, '0x4386e63c'
    ),
    removeLiquidity: new Func<[tokenA: string, tokenB: string, stable: boolean, liquidity: bigint, amountAMin: bigint, amountBMin: bigint, to: string, deadline: bigint], {tokenA: string, tokenB: string, stable: boolean, liquidity: bigint, amountAMin: bigint, amountBMin: bigint, to: string, deadline: bigint}, ([amountA: bigint, amountB: bigint] & {amountA: bigint, amountB: bigint})>(
        abi, '0x0dede6c4'
    ),
    removeLiquidityETH: new Func<[token: string, stable: boolean, liquidity: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint], {token: string, stable: boolean, liquidity: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint}, ([amountToken: bigint, amountETH: bigint] & {amountToken: bigint, amountETH: bigint})>(
        abi, '0xd7b0e0a5'
    ),
    removeLiquidityETHSupportingFeeOnTransferTokens: new Func<[token: string, stable: boolean, liquidity: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint], {token: string, stable: boolean, liquidity: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint}, ([amountToken: bigint, amountETH: bigint] & {amountToken: bigint, amountETH: bigint})>(
        abi, '0xfe411f14'
    ),
    removeLiquidityETHWithPermit: new Func<[token: string, stable: boolean, liquidity: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint, approveMax: boolean, v: number, r: string, s: string], {token: string, stable: boolean, liquidity: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint, approveMax: boolean, v: number, r: string, s: string}, ([amountToken: bigint, amountETH: bigint] & {amountToken: bigint, amountETH: bigint})>(
        abi, '0x448725b4'
    ),
    removeLiquidityETHWithPermitSupportingFeeOnTransferTokens: new Func<[token: string, stable: boolean, liquidity: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint, approveMax: boolean, v: number, r: string, s: string], {token: string, stable: boolean, liquidity: bigint, amountTokenMin: bigint, amountETHMin: bigint, to: string, deadline: bigint, approveMax: boolean, v: number, r: string, s: string}, ([amountToken: bigint, amountETH: bigint] & {amountToken: bigint, amountETH: bigint})>(
        abi, '0xe2d9d4dc'
    ),
    removeLiquidityWithPermit: new Func<[tokenA: string, tokenB: string, stable: boolean, liquidity: bigint, amountAMin: bigint, amountBMin: bigint, to: string, deadline: bigint, approveMax: boolean, v: number, r: string, s: string], {tokenA: string, tokenB: string, stable: boolean, liquidity: bigint, amountAMin: bigint, amountBMin: bigint, to: string, deadline: bigint, approveMax: boolean, v: number, r: string, s: string}, ([amountA: bigint, amountB: bigint] & {amountA: bigint, amountB: bigint})>(
        abi, '0xa32b1fcd'
    ),
    sortTokens: new Func<[tokenA: string, tokenB: string], {tokenA: string, tokenB: string}, ([token0: string, token1: string] & {token0: string, token1: string})>(
        abi, '0x544caa56'
    ),
    swapExactETHForTokens: new Func<[amountOutMin: bigint, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>, to: string, deadline: bigint], {amountOutMin: bigint, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>, to: string, deadline: bigint}, Array<bigint>>(
        abi, '0x67ffb66a'
    ),
    swapExactETHForTokensSupportingFeeOnTransferTokens: new Func<[amountOutMin: bigint, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>, to: string, deadline: bigint], {amountOutMin: bigint, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>, to: string, deadline: bigint}, []>(
        abi, '0x76c72751'
    ),
    swapExactTokensForETH: new Func<[amountIn: bigint, amountOutMin: bigint, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>, to: string, deadline: bigint], {amountIn: bigint, amountOutMin: bigint, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>, to: string, deadline: bigint}, Array<bigint>>(
        abi, '0x18a13086'
    ),
    swapExactTokensForETHSupportingFeeOnTransferTokens: new Func<[amountIn: bigint, amountOutMin: bigint, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>, to: string, deadline: bigint], {amountIn: bigint, amountOutMin: bigint, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>, to: string, deadline: bigint}, []>(
        abi, '0x7af728c8'
    ),
    swapExactTokensForTokens: new Func<[amountIn: bigint, amountOutMin: bigint, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>, to: string, deadline: bigint], {amountIn: bigint, amountOutMin: bigint, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>, to: string, deadline: bigint}, Array<bigint>>(
        abi, '0xf41766d8'
    ),
    swapExactTokensForTokensSimple: new Func<[amountIn: bigint, amountOutMin: bigint, tokenFrom: string, tokenTo: string, stable: boolean, to: string, deadline: bigint], {amountIn: bigint, amountOutMin: bigint, tokenFrom: string, tokenTo: string, stable: boolean, to: string, deadline: bigint}, Array<bigint>>(
        abi, '0x13dcfc59'
    ),
    swapExactTokensForTokensSupportingFeeOnTransferTokens: new Func<[amountIn: bigint, amountOutMin: bigint, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>, to: string, deadline: bigint], {amountIn: bigint, amountOutMin: bigint, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>, to: string, deadline: bigint}, []>(
        abi, '0x6cc1ae13'
    ),
    wETH: new Func<[], {}, string>(
        abi, '0xf2428621'
    ),
}

export class Contract extends ContractBase {

    factory(): Promise<string> {
        return this.eth_call(functions.factory, [])
    }

    getAmountOut(amountIn: bigint, tokenIn: string, tokenOut: string): Promise<([amount: bigint, stable: boolean] & {amount: bigint, stable: boolean})> {
        return this.eth_call(functions.getAmountOut, [amountIn, tokenIn, tokenOut])
    }

    getAmountsOut(amountIn: bigint, routes: Array<([from: string, to: string, stable: boolean] & {from: string, to: string, stable: boolean})>): Promise<Array<bigint>> {
        return this.eth_call(functions.getAmountsOut, [amountIn, routes])
    }

    getReserves(tokenA: string, tokenB: string, stable: boolean): Promise<([reserveA: bigint, reserveB: bigint] & {reserveA: bigint, reserveB: bigint})> {
        return this.eth_call(functions.getReserves, [tokenA, tokenB, stable])
    }

    isPair(pair: string): Promise<boolean> {
        return this.eth_call(functions.isPair, [pair])
    }

    pairFor(tokenA: string, tokenB: string, stable: boolean): Promise<string> {
        return this.eth_call(functions.pairFor, [tokenA, tokenB, stable])
    }

    quoteAddLiquidity(tokenA: string, tokenB: string, stable: boolean, amountADesired: bigint, amountBDesired: bigint): Promise<([amountA: bigint, amountB: bigint, liquidity: bigint] & {amountA: bigint, amountB: bigint, liquidity: bigint})> {
        return this.eth_call(functions.quoteAddLiquidity, [tokenA, tokenB, stable, amountADesired, amountBDesired])
    }

    quoteRemoveLiquidity(tokenA: string, tokenB: string, stable: boolean, liquidity: bigint): Promise<([amountA: bigint, amountB: bigint] & {amountA: bigint, amountB: bigint})> {
        return this.eth_call(functions.quoteRemoveLiquidity, [tokenA, tokenB, stable, liquidity])
    }

    sortTokens(tokenA: string, tokenB: string): Promise<([token0: string, token1: string] & {token0: string, token1: string})> {
        return this.eth_call(functions.sortTokens, [tokenA, tokenB])
    }

    wETH(): Promise<string> {
        return this.eth_call(functions.wETH, [])
    }
}
