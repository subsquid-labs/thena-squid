import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './swap.abi'

export const abi = new ethers.utils.Interface(ABI_JSON);

export const functions = {
    WNativeToken: new Func<[], {}, string>(
        abi, '0x8af3ac85'
    ),
    algebraSwapCallback: new Func<[amount0Delta: ethers.BigNumber, amount1Delta: ethers.BigNumber, _data: string], {amount0Delta: ethers.BigNumber, amount1Delta: ethers.BigNumber, _data: string}, []>(
        abi, '0x2c8958f6'
    ),
    exactInput: new Func<[params: ([path: string, recipient: string, deadline: ethers.BigNumber, amountIn: ethers.BigNumber, amountOutMinimum: ethers.BigNumber] & {path: string, recipient: string, deadline: ethers.BigNumber, amountIn: ethers.BigNumber, amountOutMinimum: ethers.BigNumber})], {params: ([path: string, recipient: string, deadline: ethers.BigNumber, amountIn: ethers.BigNumber, amountOutMinimum: ethers.BigNumber] & {path: string, recipient: string, deadline: ethers.BigNumber, amountIn: ethers.BigNumber, amountOutMinimum: ethers.BigNumber})}, ethers.BigNumber>(
        abi, '0xc04b8d59'
    ),
    exactInputSingle: new Func<[params: ([tokenIn: string, tokenOut: string, recipient: string, deadline: ethers.BigNumber, amountIn: ethers.BigNumber, amountOutMinimum: ethers.BigNumber, limitSqrtPrice: ethers.BigNumber] & {tokenIn: string, tokenOut: string, recipient: string, deadline: ethers.BigNumber, amountIn: ethers.BigNumber, amountOutMinimum: ethers.BigNumber, limitSqrtPrice: ethers.BigNumber})], {params: ([tokenIn: string, tokenOut: string, recipient: string, deadline: ethers.BigNumber, amountIn: ethers.BigNumber, amountOutMinimum: ethers.BigNumber, limitSqrtPrice: ethers.BigNumber] & {tokenIn: string, tokenOut: string, recipient: string, deadline: ethers.BigNumber, amountIn: ethers.BigNumber, amountOutMinimum: ethers.BigNumber, limitSqrtPrice: ethers.BigNumber})}, ethers.BigNumber>(
        abi, '0xbc651188'
    ),
    exactInputSingleSupportingFeeOnTransferTokens: new Func<[params: ([tokenIn: string, tokenOut: string, recipient: string, deadline: ethers.BigNumber, amountIn: ethers.BigNumber, amountOutMinimum: ethers.BigNumber, limitSqrtPrice: ethers.BigNumber] & {tokenIn: string, tokenOut: string, recipient: string, deadline: ethers.BigNumber, amountIn: ethers.BigNumber, amountOutMinimum: ethers.BigNumber, limitSqrtPrice: ethers.BigNumber})], {params: ([tokenIn: string, tokenOut: string, recipient: string, deadline: ethers.BigNumber, amountIn: ethers.BigNumber, amountOutMinimum: ethers.BigNumber, limitSqrtPrice: ethers.BigNumber] & {tokenIn: string, tokenOut: string, recipient: string, deadline: ethers.BigNumber, amountIn: ethers.BigNumber, amountOutMinimum: ethers.BigNumber, limitSqrtPrice: ethers.BigNumber})}, ethers.BigNumber>(
        abi, '0xb87d2524'
    ),
    exactOutput: new Func<[params: ([path: string, recipient: string, deadline: ethers.BigNumber, amountOut: ethers.BigNumber, amountInMaximum: ethers.BigNumber] & {path: string, recipient: string, deadline: ethers.BigNumber, amountOut: ethers.BigNumber, amountInMaximum: ethers.BigNumber})], {params: ([path: string, recipient: string, deadline: ethers.BigNumber, amountOut: ethers.BigNumber, amountInMaximum: ethers.BigNumber] & {path: string, recipient: string, deadline: ethers.BigNumber, amountOut: ethers.BigNumber, amountInMaximum: ethers.BigNumber})}, ethers.BigNumber>(
        abi, '0xf28c0498'
    ),
    exactOutputSingle: new Func<[params: ([tokenIn: string, tokenOut: string, fee: number, recipient: string, deadline: ethers.BigNumber, amountOut: ethers.BigNumber, amountInMaximum: ethers.BigNumber, limitSqrtPrice: ethers.BigNumber] & {tokenIn: string, tokenOut: string, fee: number, recipient: string, deadline: ethers.BigNumber, amountOut: ethers.BigNumber, amountInMaximum: ethers.BigNumber, limitSqrtPrice: ethers.BigNumber})], {params: ([tokenIn: string, tokenOut: string, fee: number, recipient: string, deadline: ethers.BigNumber, amountOut: ethers.BigNumber, amountInMaximum: ethers.BigNumber, limitSqrtPrice: ethers.BigNumber] & {tokenIn: string, tokenOut: string, fee: number, recipient: string, deadline: ethers.BigNumber, amountOut: ethers.BigNumber, amountInMaximum: ethers.BigNumber, limitSqrtPrice: ethers.BigNumber})}, ethers.BigNumber>(
        abi, '0xdb3e2198'
    ),
    factory: new Func<[], {}, string>(
        abi, '0xc45a0155'
    ),
    multicall: new Func<[data: Array<string>], {data: Array<string>}, Array<string>>(
        abi, '0xac9650d8'
    ),
    poolDeployer: new Func<[], {}, string>(
        abi, '0x3119049a'
    ),
    refundNativeToken: new Func<[], {}, []>(
        abi, '0x41865270'
    ),
    selfPermit: new Func<[token: string, value: ethers.BigNumber, deadline: ethers.BigNumber, v: number, r: string, s: string], {token: string, value: ethers.BigNumber, deadline: ethers.BigNumber, v: number, r: string, s: string}, []>(
        abi, '0xf3995c67'
    ),
    selfPermitAllowed: new Func<[token: string, nonce: ethers.BigNumber, expiry: ethers.BigNumber, v: number, r: string, s: string], {token: string, nonce: ethers.BigNumber, expiry: ethers.BigNumber, v: number, r: string, s: string}, []>(
        abi, '0x4659a494'
    ),
    selfPermitAllowedIfNecessary: new Func<[token: string, nonce: ethers.BigNumber, expiry: ethers.BigNumber, v: number, r: string, s: string], {token: string, nonce: ethers.BigNumber, expiry: ethers.BigNumber, v: number, r: string, s: string}, []>(
        abi, '0xa4a78f0c'
    ),
    selfPermitIfNecessary: new Func<[token: string, value: ethers.BigNumber, deadline: ethers.BigNumber, v: number, r: string, s: string], {token: string, value: ethers.BigNumber, deadline: ethers.BigNumber, v: number, r: string, s: string}, []>(
        abi, '0xc2e3140a'
    ),
    sweepToken: new Func<[token: string, amountMinimum: ethers.BigNumber, recipient: string], {token: string, amountMinimum: ethers.BigNumber, recipient: string}, []>(
        abi, '0xdf2ab5bb'
    ),
    sweepTokenWithFee: new Func<[token: string, amountMinimum: ethers.BigNumber, recipient: string, feeBips: ethers.BigNumber, feeRecipient: string], {token: string, amountMinimum: ethers.BigNumber, recipient: string, feeBips: ethers.BigNumber, feeRecipient: string}, []>(
        abi, '0xe0e189a0'
    ),
    unwrapWNativeToken: new Func<[amountMinimum: ethers.BigNumber, recipient: string], {amountMinimum: ethers.BigNumber, recipient: string}, []>(
        abi, '0x69bc35b2'
    ),
    unwrapWNativeTokenWithFee: new Func<[amountMinimum: ethers.BigNumber, recipient: string, feeBips: ethers.BigNumber, feeRecipient: string], {amountMinimum: ethers.BigNumber, recipient: string, feeBips: ethers.BigNumber, feeRecipient: string}, []>(
        abi, '0xc60696ec'
    ),
}

export class Contract extends ContractBase {

    WNativeToken(): Promise<string> {
        return this.eth_call(functions.WNativeToken, [])
    }

    factory(): Promise<string> {
        return this.eth_call(functions.factory, [])
    }

    poolDeployer(): Promise<string> {
        return this.eth_call(functions.poolDeployer, [])
    }
}
