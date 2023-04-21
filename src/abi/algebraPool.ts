import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './algebraPool.abi'

export const abi = new ethers.utils.Interface(ABI_JSON);

export const events = {
    Burn: new LogEvent<([owner: string, bottomTick: number, topTick: number, liquidityAmount: ethers.BigNumber, amount0: ethers.BigNumber, amount1: ethers.BigNumber] & {owner: string, bottomTick: number, topTick: number, liquidityAmount: ethers.BigNumber, amount0: ethers.BigNumber, amount1: ethers.BigNumber})>(
        abi, '0x0c396cd989a39f4459b5fa1aed6a9a8dcdbc45908acfd67e028cd568da98982c'
    ),
    Collect: new LogEvent<([owner: string, recipient: string, bottomTick: number, topTick: number, amount0: ethers.BigNumber, amount1: ethers.BigNumber] & {owner: string, recipient: string, bottomTick: number, topTick: number, amount0: ethers.BigNumber, amount1: ethers.BigNumber})>(
        abi, '0x70935338e69775456a85ddef226c395fb668b63fa0115f5f20610b388e6ca9c0'
    ),
    CommunityFee: new LogEvent<([communityFee0New: number, communityFee1New: number] & {communityFee0New: number, communityFee1New: number})>(
        abi, '0x370966829959865419a97fc8708e1d348a92142c2cfec7299e264677970174bc'
    ),
    Fee: new LogEvent<([fee: number] & {fee: number})>(
        abi, '0x598b9f043c813aa6be3426ca60d1c65d17256312890be5118dab55b0775ebe2a'
    ),
    Flash: new LogEvent<([sender: string, recipient: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber, paid0: ethers.BigNumber, paid1: ethers.BigNumber] & {sender: string, recipient: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber, paid0: ethers.BigNumber, paid1: ethers.BigNumber})>(
        abi, '0xbdbdb71d7860376ba52b25a5028beea23581364a40522f6bcfb86bb1f2dca633'
    ),
    Incentive: new LogEvent<([virtualPoolAddress: string] & {virtualPoolAddress: string})>(
        abi, '0x915c5369e6580733735d1c2e30ca20dcaa395697a041033c9f35f80f53525e84'
    ),
    Initialize: new LogEvent<([price: ethers.BigNumber, tick: number] & {price: ethers.BigNumber, tick: number})>(
        abi, '0x98636036cb66a9c19a37435efc1e90142190214e8abeb821bdba3f2990dd4c95'
    ),
    LiquidityCooldown: new LogEvent<([liquidityCooldown: number] & {liquidityCooldown: number})>(
        abi, '0xb5e51602371b0e74f991b6e965cd7d32b4b14c7e6ede6d1298037650a0e1405f'
    ),
    Mint: new LogEvent<([sender: string, owner: string, bottomTick: number, topTick: number, liquidityAmount: ethers.BigNumber, amount0: ethers.BigNumber, amount1: ethers.BigNumber] & {sender: string, owner: string, bottomTick: number, topTick: number, liquidityAmount: ethers.BigNumber, amount0: ethers.BigNumber, amount1: ethers.BigNumber})>(
        abi, '0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85488f0853ae16239d0bde'
    ),
    Swap: new LogEvent<([sender: string, recipient: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber, price: ethers.BigNumber, liquidity: ethers.BigNumber, tick: number] & {sender: string, recipient: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber, price: ethers.BigNumber, liquidity: ethers.BigNumber, tick: number})>(
        abi, '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67'
    ),
}

export const functions = {
    activeIncentive: new Func<[], {}, string>(
        abi, '0xfacb0eb1'
    ),
    burn: new Func<[bottomTick: number, topTick: number, amount: ethers.BigNumber], {bottomTick: number, topTick: number, amount: ethers.BigNumber}, ([amount0: ethers.BigNumber, amount1: ethers.BigNumber] & {amount0: ethers.BigNumber, amount1: ethers.BigNumber})>(
        abi, '0xa34123a7'
    ),
    collect: new Func<[recipient: string, bottomTick: number, topTick: number, amount0Requested: ethers.BigNumber, amount1Requested: ethers.BigNumber], {recipient: string, bottomTick: number, topTick: number, amount0Requested: ethers.BigNumber, amount1Requested: ethers.BigNumber}, ([amount0: ethers.BigNumber, amount1: ethers.BigNumber] & {amount0: ethers.BigNumber, amount1: ethers.BigNumber})>(
        abi, '0x4f1eb3d8'
    ),
    dataStorageOperator: new Func<[], {}, string>(
        abi, '0x29047dfa'
    ),
    factory: new Func<[], {}, string>(
        abi, '0xc45a0155'
    ),
    flash: new Func<[recipient: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber, data: string], {recipient: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber, data: string}, []>(
        abi, '0x490e6cbc'
    ),
    getInnerCumulatives: new Func<[bottomTick: number, topTick: number], {bottomTick: number, topTick: number}, ([innerTickCumulative: ethers.BigNumber, innerSecondsSpentPerLiquidity: ethers.BigNumber, innerSecondsSpent: number] & {innerTickCumulative: ethers.BigNumber, innerSecondsSpentPerLiquidity: ethers.BigNumber, innerSecondsSpent: number})>(
        abi, '0x920c34e5'
    ),
    getTimepoints: new Func<[secondsAgos: Array<number>], {secondsAgos: Array<number>}, ([tickCumulatives: Array<ethers.BigNumber>, secondsPerLiquidityCumulatives: Array<ethers.BigNumber>, volatilityCumulatives: Array<ethers.BigNumber>, volumePerAvgLiquiditys: Array<ethers.BigNumber>] & {tickCumulatives: Array<ethers.BigNumber>, secondsPerLiquidityCumulatives: Array<ethers.BigNumber>, volatilityCumulatives: Array<ethers.BigNumber>, volumePerAvgLiquiditys: Array<ethers.BigNumber>})>(
        abi, '0x9d3a5241'
    ),
    globalState: new Func<[], {}, ([price: ethers.BigNumber, tick: number, fee: number, timepointIndex: number, communityFeeToken0: number, communityFeeToken1: number, unlocked: boolean] & {price: ethers.BigNumber, tick: number, fee: number, timepointIndex: number, communityFeeToken0: number, communityFeeToken1: number, unlocked: boolean})>(
        abi, '0xe76c01e4'
    ),
    initialize: new Func<[initialPrice: ethers.BigNumber], {initialPrice: ethers.BigNumber}, []>(
        abi, '0xf637731d'
    ),
    liquidity: new Func<[], {}, ethers.BigNumber>(
        abi, '0x1a686502'
    ),
    liquidityCooldown: new Func<[], {}, number>(
        abi, '0x17e25b3c'
    ),
    maxLiquidityPerTick: new Func<[], {}, ethers.BigNumber>(
        abi, '0x70cf754a'
    ),
    mint: new Func<[sender: string, recipient: string, bottomTick: number, topTick: number, liquidityDesired: ethers.BigNumber, data: string], {sender: string, recipient: string, bottomTick: number, topTick: number, liquidityDesired: ethers.BigNumber, data: string}, ([amount0: ethers.BigNumber, amount1: ethers.BigNumber, liquidityActual: ethers.BigNumber] & {amount0: ethers.BigNumber, amount1: ethers.BigNumber, liquidityActual: ethers.BigNumber})>(
        abi, '0xaafe29c0'
    ),
    positions: new Func<[_: string], {}, ([liquidity: ethers.BigNumber, lastLiquidityAddTimestamp: number, innerFeeGrowth0Token: ethers.BigNumber, innerFeeGrowth1Token: ethers.BigNumber, fees0: ethers.BigNumber, fees1: ethers.BigNumber] & {liquidity: ethers.BigNumber, lastLiquidityAddTimestamp: number, innerFeeGrowth0Token: ethers.BigNumber, innerFeeGrowth1Token: ethers.BigNumber, fees0: ethers.BigNumber, fees1: ethers.BigNumber})>(
        abi, '0x514ea4bf'
    ),
    setCommunityFee: new Func<[communityFee0: number, communityFee1: number], {communityFee0: number, communityFee1: number}, []>(
        abi, '0xf0b9cf59'
    ),
    setIncentive: new Func<[virtualPoolAddress: string], {virtualPoolAddress: string}, []>(
        abi, '0x7c1fe0c8'
    ),
    setLiquidityCooldown: new Func<[newLiquidityCooldown: number], {newLiquidityCooldown: number}, []>(
        abi, '0x289fe9b0'
    ),
    swap: new Func<[recipient: string, zeroToOne: boolean, amountRequired: ethers.BigNumber, limitSqrtPrice: ethers.BigNumber, data: string], {recipient: string, zeroToOne: boolean, amountRequired: ethers.BigNumber, limitSqrtPrice: ethers.BigNumber, data: string}, ([amount0: ethers.BigNumber, amount1: ethers.BigNumber] & {amount0: ethers.BigNumber, amount1: ethers.BigNumber})>(
        abi, '0x128acb08'
    ),
    swapSupportingFeeOnInputTokens: new Func<[sender: string, recipient: string, zeroToOne: boolean, amountRequired: ethers.BigNumber, limitSqrtPrice: ethers.BigNumber, data: string], {sender: string, recipient: string, zeroToOne: boolean, amountRequired: ethers.BigNumber, limitSqrtPrice: ethers.BigNumber, data: string}, ([amount0: ethers.BigNumber, amount1: ethers.BigNumber] & {amount0: ethers.BigNumber, amount1: ethers.BigNumber})>(
        abi, '0x71334694'
    ),
    tickSpacing: new Func<[], {}, number>(
        abi, '0xd0c93a7c'
    ),
    tickTable: new Func<[_: number], {}, ethers.BigNumber>(
        abi, '0xc677e3e0'
    ),
    ticks: new Func<[_: number], {}, ([liquidityTotal: ethers.BigNumber, liquidityDelta: ethers.BigNumber, outerFeeGrowth0Token: ethers.BigNumber, outerFeeGrowth1Token: ethers.BigNumber, outerTickCumulative: ethers.BigNumber, outerSecondsPerLiquidity: ethers.BigNumber, outerSecondsSpent: number, initialized: boolean] & {liquidityTotal: ethers.BigNumber, liquidityDelta: ethers.BigNumber, outerFeeGrowth0Token: ethers.BigNumber, outerFeeGrowth1Token: ethers.BigNumber, outerTickCumulative: ethers.BigNumber, outerSecondsPerLiquidity: ethers.BigNumber, outerSecondsSpent: number, initialized: boolean})>(
        abi, '0xf30dba93'
    ),
    timepoints: new Func<[index: ethers.BigNumber], {index: ethers.BigNumber}, ([initialized: boolean, blockTimestamp: number, tickCumulative: ethers.BigNumber, secondsPerLiquidityCumulative: ethers.BigNumber, volatilityCumulative: ethers.BigNumber, averageTick: number, volumePerLiquidityCumulative: ethers.BigNumber] & {initialized: boolean, blockTimestamp: number, tickCumulative: ethers.BigNumber, secondsPerLiquidityCumulative: ethers.BigNumber, volatilityCumulative: ethers.BigNumber, averageTick: number, volumePerLiquidityCumulative: ethers.BigNumber})>(
        abi, '0x74eceae6'
    ),
    token0: new Func<[], {}, string>(
        abi, '0x0dfe1681'
    ),
    token1: new Func<[], {}, string>(
        abi, '0xd21220a7'
    ),
    totalFeeGrowth0Token: new Func<[], {}, ethers.BigNumber>(
        abi, '0x6378ae44'
    ),
    totalFeeGrowth1Token: new Func<[], {}, ethers.BigNumber>(
        abi, '0xecdecf42'
    ),
}

export class Contract extends ContractBase {

    activeIncentive(): Promise<string> {
        return this.eth_call(functions.activeIncentive, [])
    }

    dataStorageOperator(): Promise<string> {
        return this.eth_call(functions.dataStorageOperator, [])
    }

    factory(): Promise<string> {
        return this.eth_call(functions.factory, [])
    }

    getInnerCumulatives(bottomTick: number, topTick: number): Promise<([innerTickCumulative: ethers.BigNumber, innerSecondsSpentPerLiquidity: ethers.BigNumber, innerSecondsSpent: number] & {innerTickCumulative: ethers.BigNumber, innerSecondsSpentPerLiquidity: ethers.BigNumber, innerSecondsSpent: number})> {
        return this.eth_call(functions.getInnerCumulatives, [bottomTick, topTick])
    }

    getTimepoints(secondsAgos: Array<number>): Promise<([tickCumulatives: Array<ethers.BigNumber>, secondsPerLiquidityCumulatives: Array<ethers.BigNumber>, volatilityCumulatives: Array<ethers.BigNumber>, volumePerAvgLiquiditys: Array<ethers.BigNumber>] & {tickCumulatives: Array<ethers.BigNumber>, secondsPerLiquidityCumulatives: Array<ethers.BigNumber>, volatilityCumulatives: Array<ethers.BigNumber>, volumePerAvgLiquiditys: Array<ethers.BigNumber>})> {
        return this.eth_call(functions.getTimepoints, [secondsAgos])
    }

    globalState(): Promise<([price: ethers.BigNumber, tick: number, fee: number, timepointIndex: number, communityFeeToken0: number, communityFeeToken1: number, unlocked: boolean] & {price: ethers.BigNumber, tick: number, fee: number, timepointIndex: number, communityFeeToken0: number, communityFeeToken1: number, unlocked: boolean})> {
        return this.eth_call(functions.globalState, [])
    }

    liquidity(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.liquidity, [])
    }

    liquidityCooldown(): Promise<number> {
        return this.eth_call(functions.liquidityCooldown, [])
    }

    maxLiquidityPerTick(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.maxLiquidityPerTick, [])
    }

    positions(arg0: string): Promise<([liquidity: ethers.BigNumber, lastLiquidityAddTimestamp: number, innerFeeGrowth0Token: ethers.BigNumber, innerFeeGrowth1Token: ethers.BigNumber, fees0: ethers.BigNumber, fees1: ethers.BigNumber] & {liquidity: ethers.BigNumber, lastLiquidityAddTimestamp: number, innerFeeGrowth0Token: ethers.BigNumber, innerFeeGrowth1Token: ethers.BigNumber, fees0: ethers.BigNumber, fees1: ethers.BigNumber})> {
        return this.eth_call(functions.positions, [arg0])
    }

    tickSpacing(): Promise<number> {
        return this.eth_call(functions.tickSpacing, [])
    }

    tickTable(arg0: number): Promise<ethers.BigNumber> {
        return this.eth_call(functions.tickTable, [arg0])
    }

    ticks(arg0: number): Promise<([liquidityTotal: ethers.BigNumber, liquidityDelta: ethers.BigNumber, outerFeeGrowth0Token: ethers.BigNumber, outerFeeGrowth1Token: ethers.BigNumber, outerTickCumulative: ethers.BigNumber, outerSecondsPerLiquidity: ethers.BigNumber, outerSecondsSpent: number, initialized: boolean] & {liquidityTotal: ethers.BigNumber, liquidityDelta: ethers.BigNumber, outerFeeGrowth0Token: ethers.BigNumber, outerFeeGrowth1Token: ethers.BigNumber, outerTickCumulative: ethers.BigNumber, outerSecondsPerLiquidity: ethers.BigNumber, outerSecondsSpent: number, initialized: boolean})> {
        return this.eth_call(functions.ticks, [arg0])
    }

    timepoints(index: ethers.BigNumber): Promise<([initialized: boolean, blockTimestamp: number, tickCumulative: ethers.BigNumber, secondsPerLiquidityCumulative: ethers.BigNumber, volatilityCumulative: ethers.BigNumber, averageTick: number, volumePerLiquidityCumulative: ethers.BigNumber] & {initialized: boolean, blockTimestamp: number, tickCumulative: ethers.BigNumber, secondsPerLiquidityCumulative: ethers.BigNumber, volatilityCumulative: ethers.BigNumber, averageTick: number, volumePerLiquidityCumulative: ethers.BigNumber})> {
        return this.eth_call(functions.timepoints, [index])
    }

    token0(): Promise<string> {
        return this.eth_call(functions.token0, [])
    }

    token1(): Promise<string> {
        return this.eth_call(functions.token1, [])
    }

    totalFeeGrowth0Token(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.totalFeeGrowth0Token, [])
    }

    totalFeeGrowth1Token(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.totalFeeGrowth1Token, [])
    }
}
