import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './hypervisor.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, spender: string, value: bigint] & {owner: string, spender: string, value: bigint})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    Deposit: new LogEvent<([sender: string, to: string, shares: bigint, amount0: bigint, amount1: bigint] & {sender: string, to: string, shares: bigint, amount0: bigint, amount1: bigint})>(
        abi, '0x4e2ca0515ed1aef1395f66b5303bb5d6f1bf9d61a353fa53f73f8ac9973fa9f6'
    ),
    Rebalance: new LogEvent<([tick: number, totalAmount0: bigint, totalAmount1: bigint, feeAmount0: bigint, feeAmount1: bigint, totalSupply: bigint] & {tick: number, totalAmount0: bigint, totalAmount1: bigint, feeAmount0: bigint, feeAmount1: bigint, totalSupply: bigint})>(
        abi, '0xbc4c20ad04f161d631d9ce94d27659391196415aa3c42f6a71c62e905ece782d'
    ),
    SetFee: new LogEvent<([newFee: number] & {newFee: number})>(
        abi, '0x91f2ade82ab0e77bb6823899e6daddc07e3da0e3ad998577e7c09c2f38943c43'
    ),
    Transfer: new LogEvent<([from: string, to: string, value: bigint] & {from: string, to: string, value: bigint})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
    Withdraw: new LogEvent<([sender: string, to: string, shares: bigint, amount0: bigint, amount1: bigint] & {sender: string, to: string, shares: bigint, amount0: bigint, amount1: bigint})>(
        abi, '0xebff2602b3f468259e1e99f613fed6691f3a6526effe6ef3e768ba7ae7a36c4f'
    ),
    ZeroBurn: new LogEvent<([fee: number, fees0: bigint, fees1: bigint] & {fee: number, fees0: bigint, fees1: bigint})>(
        abi, '0x4606b8a47eb284e8e80929101ece6ab5fe8d4f8735acc56bd0c92ca872f2cfe7'
    ),
}

export const functions = {
    DOMAIN_SEPARATOR: new Func<[], {}, string>(
        abi, '0x3644e515'
    ),
    PRECISION: new Func<[], {}, bigint>(
        abi, '0xaaf5eb68'
    ),
    addLiquidity: new Func<[tickLower: number, tickUpper: number, amount0: bigint, amount1: bigint, inMin: Array<bigint>], {tickLower: number, tickUpper: number, amount0: bigint, amount1: bigint, inMin: Array<bigint>}, []>(
        abi, '0x63e96836'
    ),
    algebraMintCallback: new Func<[amount0: bigint, amount1: bigint, data: string], {amount0: bigint, amount1: bigint, data: string}, []>(
        abi, '0x3dd657c5'
    ),
    allowance: new Func<[owner: string, spender: string], {owner: string, spender: string}, bigint>(
        abi, '0xdd62ed3e'
    ),
    approve: new Func<[spender: string, amount: bigint], {spender: string, amount: bigint}, boolean>(
        abi, '0x095ea7b3'
    ),
    balanceOf: new Func<[account: string], {account: string}, bigint>(
        abi, '0x70a08231'
    ),
    baseLower: new Func<[], {}, number>(
        abi, '0xfa082743'
    ),
    baseUpper: new Func<[], {}, number>(
        abi, '0x888a9134'
    ),
    compound: new Func<[inMin: Array<bigint>], {inMin: Array<bigint>}, ([baseToken0Owed: bigint, baseToken1Owed: bigint, limitToken0Owed: bigint, limitToken1Owed: bigint] & {baseToken0Owed: bigint, baseToken1Owed: bigint, limitToken0Owed: bigint, limitToken1Owed: bigint})>(
        abi, '0x513ea884'
    ),
    currentTick: new Func<[], {}, number>(
        abi, '0x065e5360'
    ),
    decimals: new Func<[], {}, number>(
        abi, '0x313ce567'
    ),
    decreaseAllowance: new Func<[spender: string, subtractedValue: bigint], {spender: string, subtractedValue: bigint}, boolean>(
        abi, '0xa457c2d7'
    ),
    deposit: new Func<[deposit0: bigint, deposit1: bigint, to: string, from: string, inMin: Array<bigint>], {deposit0: bigint, deposit1: bigint, to: string, from: string, inMin: Array<bigint>}, bigint>(
        abi, '0x8e3c92e4'
    ),
    deposit0Max: new Func<[], {}, bigint>(
        abi, '0x648cab85'
    ),
    deposit1Max: new Func<[], {}, bigint>(
        abi, '0x4d461fbb'
    ),
    directDeposit: new Func<[], {}, boolean>(
        abi, '0x6d90a39c'
    ),
    fee: new Func<[], {}, number>(
        abi, '0xddca3f43'
    ),
    feeRecipient: new Func<[], {}, string>(
        abi, '0x46904840'
    ),
    getBasePosition: new Func<[], {}, ([liquidity: bigint, amount0: bigint, amount1: bigint] & {liquidity: bigint, amount0: bigint, amount1: bigint})>(
        abi, '0xd2eabcfc'
    ),
    getLimitPosition: new Func<[], {}, ([liquidity: bigint, amount0: bigint, amount1: bigint] & {liquidity: bigint, amount0: bigint, amount1: bigint})>(
        abi, '0xa049de6b'
    ),
    getTotalAmounts: new Func<[], {}, ([total0: bigint, total1: bigint] & {total0: bigint, total1: bigint})>(
        abi, '0xc4a7761e'
    ),
    increaseAllowance: new Func<[spender: string, addedValue: bigint], {spender: string, addedValue: bigint}, boolean>(
        abi, '0x39509351'
    ),
    limitLower: new Func<[], {}, number>(
        abi, '0x51e87af7'
    ),
    limitUpper: new Func<[], {}, number>(
        abi, '0x0f35bcac'
    ),
    maxTotalSupply: new Func<[], {}, bigint>(
        abi, '0x2ab4d052'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    nonces: new Func<[owner: string], {owner: string}, bigint>(
        abi, '0x7ecebe00'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    permit: new Func<[owner: string, spender: string, value: bigint, deadline: bigint, v: number, r: string, s: string], {owner: string, spender: string, value: bigint, deadline: bigint, v: number, r: string, s: string}, []>(
        abi, '0xd505accf'
    ),
    pool: new Func<[], {}, string>(
        abi, '0x16f0115b'
    ),
    pullLiquidity: new Func<[tickLower: number, tickUpper: number, shares: bigint, amountMin: Array<bigint>], {tickLower: number, tickUpper: number, shares: bigint, amountMin: Array<bigint>}, ([amount0: bigint, amount1: bigint] & {amount0: bigint, amount1: bigint})>(
        abi, '0x95235656'
    ),
    rebalance: new Func<[_baseLower: number, _baseUpper: number, _limitLower: number, _limitUpper: number, _feeRecipient: string, inMin: Array<bigint>, outMin: Array<bigint>], {_baseLower: number, _baseUpper: number, _limitLower: number, _limitUpper: number, _feeRecipient: string, inMin: Array<bigint>, outMin: Array<bigint>}, []>(
        abi, '0x85919c5d'
    ),
    removeWhitelisted: new Func<[], {}, []>(
        abi, '0xc5241e29'
    ),
    setFee: new Func<[newFee: number], {newFee: number}, []>(
        abi, '0xcb122a09'
    ),
    setWhitelist: new Func<[_address: string], {_address: string}, []>(
        abi, '0x854cff2f'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    tickSpacing: new Func<[], {}, number>(
        abi, '0xd0c93a7c'
    ),
    toggleDirectDeposit: new Func<[], {}, []>(
        abi, '0xb1a3d533'
    ),
    token0: new Func<[], {}, string>(
        abi, '0x0dfe1681'
    ),
    token1: new Func<[], {}, string>(
        abi, '0xd21220a7'
    ),
    totalSupply: new Func<[], {}, bigint>(
        abi, '0x18160ddd'
    ),
    transfer: new Func<[recipient: string, amount: bigint], {recipient: string, amount: bigint}, boolean>(
        abi, '0xa9059cbb'
    ),
    transferFrom: new Func<[sender: string, recipient: string, amount: bigint], {sender: string, recipient: string, amount: bigint}, boolean>(
        abi, '0x23b872dd'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    whitelistedAddress: new Func<[], {}, string>(
        abi, '0x86a29081'
    ),
    withdraw: new Func<[shares: bigint, to: string, from: string, minAmounts: Array<bigint>], {shares: bigint, to: string, from: string, minAmounts: Array<bigint>}, ([amount0: bigint, amount1: bigint] & {amount0: bigint, amount1: bigint})>(
        abi, '0xa8559872'
    ),
}

export class Contract extends ContractBase {

    DOMAIN_SEPARATOR(): Promise<string> {
        return this.eth_call(functions.DOMAIN_SEPARATOR, [])
    }

    PRECISION(): Promise<bigint> {
        return this.eth_call(functions.PRECISION, [])
    }

    allowance(owner: string, spender: string): Promise<bigint> {
        return this.eth_call(functions.allowance, [owner, spender])
    }

    balanceOf(account: string): Promise<bigint> {
        return this.eth_call(functions.balanceOf, [account])
    }

    baseLower(): Promise<number> {
        return this.eth_call(functions.baseLower, [])
    }

    baseUpper(): Promise<number> {
        return this.eth_call(functions.baseUpper, [])
    }

    currentTick(): Promise<number> {
        return this.eth_call(functions.currentTick, [])
    }

    decimals(): Promise<number> {
        return this.eth_call(functions.decimals, [])
    }

    deposit0Max(): Promise<bigint> {
        return this.eth_call(functions.deposit0Max, [])
    }

    deposit1Max(): Promise<bigint> {
        return this.eth_call(functions.deposit1Max, [])
    }

    directDeposit(): Promise<boolean> {
        return this.eth_call(functions.directDeposit, [])
    }

    fee(): Promise<number> {
        return this.eth_call(functions.fee, [])
    }

    feeRecipient(): Promise<string> {
        return this.eth_call(functions.feeRecipient, [])
    }

    getBasePosition(): Promise<([liquidity: bigint, amount0: bigint, amount1: bigint] & {liquidity: bigint, amount0: bigint, amount1: bigint})> {
        return this.eth_call(functions.getBasePosition, [])
    }

    getLimitPosition(): Promise<([liquidity: bigint, amount0: bigint, amount1: bigint] & {liquidity: bigint, amount0: bigint, amount1: bigint})> {
        return this.eth_call(functions.getLimitPosition, [])
    }

    getTotalAmounts(): Promise<([total0: bigint, total1: bigint] & {total0: bigint, total1: bigint})> {
        return this.eth_call(functions.getTotalAmounts, [])
    }

    limitLower(): Promise<number> {
        return this.eth_call(functions.limitLower, [])
    }

    limitUpper(): Promise<number> {
        return this.eth_call(functions.limitUpper, [])
    }

    maxTotalSupply(): Promise<bigint> {
        return this.eth_call(functions.maxTotalSupply, [])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    nonces(owner: string): Promise<bigint> {
        return this.eth_call(functions.nonces, [owner])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    pool(): Promise<string> {
        return this.eth_call(functions.pool, [])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    tickSpacing(): Promise<number> {
        return this.eth_call(functions.tickSpacing, [])
    }

    token0(): Promise<string> {
        return this.eth_call(functions.token0, [])
    }

    token1(): Promise<string> {
        return this.eth_call(functions.token1, [])
    }

    totalSupply(): Promise<bigint> {
        return this.eth_call(functions.totalSupply, [])
    }

    whitelistedAddress(): Promise<string> {
        return this.eth_call(functions.whitelistedAddress, [])
    }
}
