import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './solidlyFactory.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Initialized: new LogEvent<([version: number] & {version: number})>(
        abi, '0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    PairCreated: new LogEvent<([token0: string, token1: string, stable: boolean, pair: string, _: bigint] & {token0: string, token1: string, stable: boolean, pair: string})>(
        abi, '0xc4805696c66d7cf352fc1d6bb633ad5ee82f6cb577c453024b6e0eb8306c6fc9'
    ),
}

export const functions = {
    MAX_FEE: new Func<[], {}, bigint>(
        abi, '0xbc063e1a'
    ),
    MAX_REFERRAL_FEE: new Func<[], {}, bigint>(
        abi, '0x1e61079c'
    ),
    acceptFeeManager: new Func<[], {}, []>(
        abi, '0xf94c53c7'
    ),
    allPairs: new Func<[_: bigint], {}, string>(
        abi, '0x1e3dd18b'
    ),
    allPairsLength: new Func<[], {}, bigint>(
        abi, '0x574f2ba3'
    ),
    createPair: new Func<[tokenA: string, tokenB: string, stable: boolean], {tokenA: string, tokenB: string, stable: boolean}, string>(
        abi, '0x82dfdce4'
    ),
    dibs: new Func<[], {}, string>(
        abi, '0x7be1623e'
    ),
    feeManager: new Func<[], {}, string>(
        abi, '0xd0fb0203'
    ),
    getFee: new Func<[_stable: boolean], {_stable: boolean}, bigint>(
        abi, '0x512b45ea'
    ),
    getInitializable: new Func<[], {}, [_: string, _: string, _: boolean]>(
        abi, '0xeb13c4cf'
    ),
    getPair: new Func<[_: string, _: string, _: boolean], {}, string>(
        abi, '0x6801cc30'
    ),
    initialize: new Func<[], {}, []>(
        abi, '0x8129fc1c'
    ),
    isPair: new Func<[_: string], {}, boolean>(
        abi, '0xe5e31b13'
    ),
    isPaused: new Func<[], {}, boolean>(
        abi, '0xb187bd26'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    pairCodeHash: new Func<[], {}, string>(
        abi, '0x9aab9248'
    ),
    pairs: new Func<[], {}, Array<string>>(
        abi, '0xffb0a4a0'
    ),
    pendingFeeManager: new Func<[], {}, string>(
        abi, '0x8a4fa0d2'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    setDibs: new Func<[_dibs: string], {_dibs: string}, []>(
        abi, '0x0c74db12'
    ),
    setFee: new Func<[_stable: boolean, _fee: bigint], {_stable: boolean, _fee: bigint}, []>(
        abi, '0xe1f76b44'
    ),
    setFeeManager: new Func<[_feeManager: string], {_feeManager: string}, []>(
        abi, '0x472d35b9'
    ),
    setPause: new Func<[_state: boolean], {_state: boolean}, []>(
        abi, '0xbedb86fb'
    ),
    setReferralFee: new Func<[_refFee: bigint], {_refFee: bigint}, []>(
        abi, '0x713494d7'
    ),
    setStakingFeeAddress: new Func<[_feehandler: string], {_feehandler: string}, []>(
        abi, '0x4091cb77'
    ),
    setStakingFees: new Func<[_newFee: bigint], {_newFee: bigint}, []>(
        abi, '0x482a8d07'
    ),
    stableFee: new Func<[], {}, bigint>(
        abi, '0x40bbd775'
    ),
    stakingFeeHandler: new Func<[], {}, string>(
        abi, '0xc124a4a2'
    ),
    stakingNFTFee: new Func<[], {}, bigint>(
        abi, '0x956f94a1'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    volatileFee: new Func<[], {}, bigint>(
        abi, '0x5084ed03'
    ),
}

export class Contract extends ContractBase {

    MAX_FEE(): Promise<bigint> {
        return this.eth_call(functions.MAX_FEE, [])
    }

    MAX_REFERRAL_FEE(): Promise<bigint> {
        return this.eth_call(functions.MAX_REFERRAL_FEE, [])
    }

    allPairs(arg0: bigint): Promise<string> {
        return this.eth_call(functions.allPairs, [arg0])
    }

    allPairsLength(): Promise<bigint> {
        return this.eth_call(functions.allPairsLength, [])
    }

    dibs(): Promise<string> {
        return this.eth_call(functions.dibs, [])
    }

    feeManager(): Promise<string> {
        return this.eth_call(functions.feeManager, [])
    }

    getFee(_stable: boolean): Promise<bigint> {
        return this.eth_call(functions.getFee, [_stable])
    }

    getInitializable(): Promise<[_: string, _: string, _: boolean]> {
        return this.eth_call(functions.getInitializable, [])
    }

    getPair(arg0: string, arg1: string, arg2: boolean): Promise<string> {
        return this.eth_call(functions.getPair, [arg0, arg1, arg2])
    }

    isPair(arg0: string): Promise<boolean> {
        return this.eth_call(functions.isPair, [arg0])
    }

    isPaused(): Promise<boolean> {
        return this.eth_call(functions.isPaused, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    pairCodeHash(): Promise<string> {
        return this.eth_call(functions.pairCodeHash, [])
    }

    pairs(): Promise<Array<string>> {
        return this.eth_call(functions.pairs, [])
    }

    pendingFeeManager(): Promise<string> {
        return this.eth_call(functions.pendingFeeManager, [])
    }

    stableFee(): Promise<bigint> {
        return this.eth_call(functions.stableFee, [])
    }

    stakingFeeHandler(): Promise<string> {
        return this.eth_call(functions.stakingFeeHandler, [])
    }

    stakingNFTFee(): Promise<bigint> {
        return this.eth_call(functions.stakingNFTFee, [])
    }

    volatileFee(): Promise<bigint> {
        return this.eth_call(functions.volatileFee, [])
    }
}
