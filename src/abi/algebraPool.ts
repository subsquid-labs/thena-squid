import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './algebraPool.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Burn: new LogEvent<([owner: string, bottomTick: number, topTick: number, liquidityAmount: bigint, amount0: bigint, amount1: bigint] & {owner: string, bottomTick: number, topTick: number, liquidityAmount: bigint, amount0: bigint, amount1: bigint})>(
        abi, '0x0c396cd989a39f4459b5fa1aed6a9a8dcdbc45908acfd67e028cd568da98982c'
    ),
    Collect: new LogEvent<([owner: string, recipient: string, bottomTick: number, topTick: number, amount0: bigint, amount1: bigint] & {owner: string, recipient: string, bottomTick: number, topTick: number, amount0: bigint, amount1: bigint})>(
        abi, '0x70935338e69775456a85ddef226c395fb668b63fa0115f5f20610b388e6ca9c0'
    ),
    CommunityFee: new LogEvent<([communityFee0New: number, communityFee1New: number] & {communityFee0New: number, communityFee1New: number})>(
        abi, '0x370966829959865419a97fc8708e1d348a92142c2cfec7299e264677970174bc'
    ),
    Fee: new LogEvent<([fee: number] & {fee: number})>(
        abi, '0x598b9f043c813aa6be3426ca60d1c65d17256312890be5118dab55b0775ebe2a'
    ),
    Flash: new LogEvent<([sender: string, recipient: string, amount0: bigint, amount1: bigint, paid0: bigint, paid1: bigint] & {sender: string, recipient: string, amount0: bigint, amount1: bigint, paid0: bigint, paid1: bigint})>(
        abi, '0xbdbdb71d7860376ba52b25a5028beea23581364a40522f6bcfb86bb1f2dca633'
    ),
    Incentive: new LogEvent<([virtualPoolAddress: string] & {virtualPoolAddress: string})>(
        abi, '0x915c5369e6580733735d1c2e30ca20dcaa395697a041033c9f35f80f53525e84'
    ),
    Initialize: new LogEvent<([price: bigint, tick: number] & {price: bigint, tick: number})>(
        abi, '0x98636036cb66a9c19a37435efc1e90142190214e8abeb821bdba3f2990dd4c95'
    ),
    LiquidityCooldown: new LogEvent<([liquidityCooldown: number] & {liquidityCooldown: number})>(
        abi, '0xb5e51602371b0e74f991b6e965cd7d32b4b14c7e6ede6d1298037650a0e1405f'
    ),
    Mint: new LogEvent<([sender: string, owner: string, bottomTick: number, topTick: number, liquidityAmount: bigint, amount0: bigint, amount1: bigint] & {sender: string, owner: string, bottomTick: number, topTick: number, liquidityAmount: bigint, amount0: bigint, amount1: bigint})>(
        abi, '0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85488f0853ae16239d0bde'
    ),
    Swap: new LogEvent<([sender: string, recipient: string, amount0: bigint, amount1: bigint, price: bigint, liquidity: bigint, tick: number] & {sender: string, recipient: string, amount0: bigint, amount1: bigint, price: bigint, liquidity: bigint, tick: number})>(
        abi, '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67'
    ),
}

export const functions = {
    activeIncentive: new Func<[], {}, string>(
        abi, '0xfacb0eb1'
    ),
    burn: new Func<[bottomTick: number, topTick: number, amount: bigint], {bottomTick: number, topTick: number, amount: bigint}, ([amount0: bigint, amount1: bigint] & {amount0: bigint, amount1: bigint})>(
        abi, '0xa34123a7'
    ),
    collect: new Func<[recipient: string, bottomTick: number, topTick: number, amount0Requested: bigint, amount1Requested: bigint], {recipient: string, bottomTick: number, topTick: number, amount0Requested: bigint, amount1Requested: bigint}, ([amount0: bigint, amount1: bigint] & {amount0: bigint, amount1: bigint})>(
        abi, '0x4f1eb3d8'
    ),
    dataStorageOperator: new Func<[], {}, string>(
        abi, '0x29047dfa'
    ),
    factory: new Func<[], {}, string>(
        abi, '0xc45a0155'
    ),
    flash: new Func<[recipient: string, amount0: bigint, amount1: bigint, data: string], {recipient: string, amount0: bigint, amount1: bigint, data: string}, []>(
        abi, '0x490e6cbc'
    ),
    getInnerCumulatives: new Func<[bottomTick: number, topTick: number], {bottomTick: number, topTick: number}, ([innerTickCumulative: bigint, innerSecondsSpentPerLiquidity: bigint, innerSecondsSpent: number] & {innerTickCumulative: bigint, innerSecondsSpentPerLiquidity: bigint, innerSecondsSpent: number})>(
        abi, '0x920c34e5'
    ),
    getTimepoints: new Func<[secondsAgos: Array<number>], {secondsAgos: Array<number>}, ([tickCumulatives: Array<bigint>, secondsPerLiquidityCumulatives: Array<bigint>, volatilityCumulatives: Array<bigint>, volumePerAvgLiquiditys: Array<bigint>] & {tickCumulatives: Array<bigint>, secondsPerLiquidityCumulatives: Array<bigint>, volatilityCumulatives: Array<bigint>, volumePerAvgLiquiditys: Array<bigint>})>(
        abi, '0x9d3a5241'
    ),
    globalState: new Func<[], {}, ([price: bigint, tick: number, fee: number, timepointIndex: number, communityFeeToken0: number, communityFeeToken1: number, unlocked: boolean] & {price: bigint, tick: number, fee: number, timepointIndex: number, communityFeeToken0: number, communityFeeToken1: number, unlocked: boolean})>(
        abi, '0xe76c01e4'
    ),
    initialize: new Func<[initialPrice: bigint], {initialPrice: bigint}, []>(
        abi, '0xf637731d'
    ),
    liquidity: new Func<[], {}, bigint>(
        abi, '0x1a686502'
    ),
    liquidityCooldown: new Func<[], {}, number>(
        abi, '0x17e25b3c'
    ),
    maxLiquidityPerTick: new Func<[], {}, bigint>(
        abi, '0x70cf754a'
    ),
    mint: new Func<[sender: string, recipient: string, bottomTick: number, topTick: number, liquidityDesired: bigint, data: string], {sender: string, recipient: string, bottomTick: number, topTick: number, liquidityDesired: bigint, data: string}, ([amount0: bigint, amount1: bigint, liquidityActual: bigint] & {amount0: bigint, amount1: bigint, liquidityActual: bigint})>(
        abi, '0xaafe29c0'
    ),
    positions: new Func<[_: string], {}, ([liquidity: bigint, lastLiquidityAddTimestamp: number, innerFeeGrowth0Token: bigint, innerFeeGrowth1Token: bigint, fees0: bigint, fees1: bigint] & {liquidity: bigint, lastLiquidityAddTimestamp: number, innerFeeGrowth0Token: bigint, innerFeeGrowth1Token: bigint, fees0: bigint, fees1: bigint})>(
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
    swap: new Func<[recipient: string, zeroToOne: boolean, amountRequired: bigint, limitSqrtPrice: bigint, data: string], {recipient: string, zeroToOne: boolean, amountRequired: bigint, limitSqrtPrice: bigint, data: string}, ([amount0: bigint, amount1: bigint] & {amount0: bigint, amount1: bigint})>(
        abi, '0x128acb08'
    ),
    swapSupportingFeeOnInputTokens: new Func<[sender: string, recipient: string, zeroToOne: boolean, amountRequired: bigint, limitSqrtPrice: bigint, data: string], {sender: string, recipient: string, zeroToOne: boolean, amountRequired: bigint, limitSqrtPrice: bigint, data: string}, ([amount0: bigint, amount1: bigint] & {amount0: bigint, amount1: bigint})>(
        abi, '0x71334694'
    ),
    tickSpacing: new Func<[], {}, number>(
        abi, '0xd0c93a7c'
    ),
    tickTable: new Func<[_: number], {}, bigint>(
        abi, '0xc677e3e0'
    ),
    ticks: new Func<[_: number], {}, ([liquidityTotal: bigint, liquidityDelta: bigint, outerFeeGrowth0Token: bigint, outerFeeGrowth1Token: bigint, outerTickCumulative: bigint, outerSecondsPerLiquidity: bigint, outerSecondsSpent: number, initialized: boolean] & {liquidityTotal: bigint, liquidityDelta: bigint, outerFeeGrowth0Token: bigint, outerFeeGrowth1Token: bigint, outerTickCumulative: bigint, outerSecondsPerLiquidity: bigint, outerSecondsSpent: number, initialized: boolean})>(
        abi, '0xf30dba93'
    ),
    timepoints: new Func<[index: bigint], {index: bigint}, ([initialized: boolean, blockTimestamp: number, tickCumulative: bigint, secondsPerLiquidityCumulative: bigint, volatilityCumulative: bigint, averageTick: number, volumePerLiquidityCumulative: bigint] & {initialized: boolean, blockTimestamp: number, tickCumulative: bigint, secondsPerLiquidityCumulative: bigint, volatilityCumulative: bigint, averageTick: number, volumePerLiquidityCumulative: bigint})>(
        abi, '0x74eceae6'
    ),
    token0: new Func<[], {}, string>(
        abi, '0x0dfe1681'
    ),
    token1: new Func<[], {}, string>(
        abi, '0xd21220a7'
    ),
    totalFeeGrowth0Token: new Func<[], {}, bigint>(
        abi, '0x6378ae44'
    ),
    totalFeeGrowth1Token: new Func<[], {}, bigint>(
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

    getInnerCumulatives(bottomTick: number, topTick: number): Promise<([innerTickCumulative: bigint, innerSecondsSpentPerLiquidity: bigint, innerSecondsSpent: number] & {innerTickCumulative: bigint, innerSecondsSpentPerLiquidity: bigint, innerSecondsSpent: number})> {
        return this.eth_call(functions.getInnerCumulatives, [bottomTick, topTick])
    }

    getTimepoints(secondsAgos: Array<number>): Promise<([tickCumulatives: Array<bigint>, secondsPerLiquidityCumulatives: Array<bigint>, volatilityCumulatives: Array<bigint>, volumePerAvgLiquiditys: Array<bigint>] & {tickCumulatives: Array<bigint>, secondsPerLiquidityCumulatives: Array<bigint>, volatilityCumulatives: Array<bigint>, volumePerAvgLiquiditys: Array<bigint>})> {
        return this.eth_call(functions.getTimepoints, [secondsAgos])
    }

    globalState(): Promise<([price: bigint, tick: number, fee: number, timepointIndex: number, communityFeeToken0: number, communityFeeToken1: number, unlocked: boolean] & {price: bigint, tick: number, fee: number, timepointIndex: number, communityFeeToken0: number, communityFeeToken1: number, unlocked: boolean})> {
        return this.eth_call(functions.globalState, [])
    }

    liquidity(): Promise<bigint> {
        return this.eth_call(functions.liquidity, [])
    }

    liquidityCooldown(): Promise<number> {
        return this.eth_call(functions.liquidityCooldown, [])
    }

    maxLiquidityPerTick(): Promise<bigint> {
        return this.eth_call(functions.maxLiquidityPerTick, [])
    }

    positions(arg0: string): Promise<([liquidity: bigint, lastLiquidityAddTimestamp: number, innerFeeGrowth0Token: bigint, innerFeeGrowth1Token: bigint, fees0: bigint, fees1: bigint] & {liquidity: bigint, lastLiquidityAddTimestamp: number, innerFeeGrowth0Token: bigint, innerFeeGrowth1Token: bigint, fees0: bigint, fees1: bigint})> {
        return this.eth_call(functions.positions, [arg0])
    }

    tickSpacing(): Promise<number> {
        return this.eth_call(functions.tickSpacing, [])
    }

    tickTable(arg0: number): Promise<bigint> {
        return this.eth_call(functions.tickTable, [arg0])
    }

    ticks(arg0: number): Promise<([liquidityTotal: bigint, liquidityDelta: bigint, outerFeeGrowth0Token: bigint, outerFeeGrowth1Token: bigint, outerTickCumulative: bigint, outerSecondsPerLiquidity: bigint, outerSecondsSpent: number, initialized: boolean] & {liquidityTotal: bigint, liquidityDelta: bigint, outerFeeGrowth0Token: bigint, outerFeeGrowth1Token: bigint, outerTickCumulative: bigint, outerSecondsPerLiquidity: bigint, outerSecondsSpent: number, initialized: boolean})> {
        return this.eth_call(functions.ticks, [arg0])
    }

    timepoints(index: bigint): Promise<([initialized: boolean, blockTimestamp: number, tickCumulative: bigint, secondsPerLiquidityCumulative: bigint, volatilityCumulative: bigint, averageTick: number, volumePerLiquidityCumulative: bigint] & {initialized: boolean, blockTimestamp: number, tickCumulative: bigint, secondsPerLiquidityCumulative: bigint, volatilityCumulative: bigint, averageTick: number, volumePerLiquidityCumulative: bigint})> {
        return this.eth_call(functions.timepoints, [index])
    }

    token0(): Promise<string> {
        return this.eth_call(functions.token0, [])
    }

    token1(): Promise<string> {
        return this.eth_call(functions.token1, [])
    }

    totalFeeGrowth0Token(): Promise<bigint> {
        return this.eth_call(functions.totalFeeGrowth0Token, [])
    }

    totalFeeGrowth1Token(): Promise<bigint> {
        return this.eth_call(functions.totalFeeGrowth1Token, [])
    }
}
