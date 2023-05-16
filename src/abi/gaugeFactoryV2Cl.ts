import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './gaugeFactoryV2Cl.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Initialized: new LogEvent<([version: number] & {version: number})>(
        abi, '0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
}

export const functions = {
    activateEmergencyMode: new Func<[_gauges: Array<string>], {_gauges: Array<string>}, []>(
        abi, '0x4ac0374e'
    ),
    createGaugeV2: new Func<[_rewardToken: string, _ve: string, _token: string, _distribution: string, _internal_bribe: string, _external_bribe: string, _: boolean], {_rewardToken: string, _ve: string, _token: string, _distribution: string, _internal_bribe: string, _external_bribe: string}, string>(
        abi, '0x7379e770'
    ),
    gammaFeeRecipient: new Func<[], {}, string>(
        abi, '0xe6d7d966'
    ),
    gauges: new Func<[], {}, Array<string>>(
        abi, '0x821bdcf1'
    ),
    initialize: new Func<[_permissionsRegistry: string, _gammaFeeRecipient: string], {_permissionsRegistry: string, _gammaFeeRecipient: string}, []>(
        abi, '0x485cc955'
    ),
    last_feeVault: new Func<[], {}, string>(
        abi, '0x049393d3'
    ),
    last_gauge: new Func<[], {}, string>(
        abi, '0x730a8bdb'
    ),
    length: new Func<[], {}, bigint>(
        abi, '0x1f7b6d32'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    permissionsRegistry: new Func<[], {}, string>(
        abi, '0x3df8504b'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    setDistribution: new Func<[_gauges: Array<string>, distro: string], {_gauges: Array<string>, distro: string}, []>(
        abi, '0x30c6f602'
    ),
    setGammaDefaultFeeRecipient: new Func<[_rec: string], {_rec: string}, []>(
        abi, '0xcedd67f7'
    ),
    setGaugeFeeVault: new Func<[_gauges: Array<string>, _vault: string], {_gauges: Array<string>, _vault: string}, []>(
        abi, '0xba36ebc1'
    ),
    setGaugeRewarder: new Func<[_gauges: Array<string>, _rewarder: Array<string>], {_gauges: Array<string>, _rewarder: Array<string>}, []>(
        abi, '0x1aae9afc'
    ),
    setInternalBribe: new Func<[_gauges: Array<string>, int_bribe: Array<string>], {_gauges: Array<string>, int_bribe: Array<string>}, []>(
        abi, '0x19fc92f6'
    ),
    setRegistry: new Func<[_registry: string], {_registry: string}, []>(
        abi, '0xa91ee0dc'
    ),
    setRewarderPid: new Func<[_gauges: Array<string>, _pids: Array<bigint>], {_gauges: Array<string>, _pids: Array<bigint>}, []>(
        abi, '0x39705ace'
    ),
    stopEmergencyMode: new Func<[_gauges: Array<string>], {_gauges: Array<string>}, []>(
        abi, '0xf0ec7e30'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
}

export class Contract extends ContractBase {

    gammaFeeRecipient(): Promise<string> {
        return this.eth_call(functions.gammaFeeRecipient, [])
    }

    gauges(): Promise<Array<string>> {
        return this.eth_call(functions.gauges, [])
    }

    last_feeVault(): Promise<string> {
        return this.eth_call(functions.last_feeVault, [])
    }

    last_gauge(): Promise<string> {
        return this.eth_call(functions.last_gauge, [])
    }

    length(): Promise<bigint> {
        return this.eth_call(functions.length, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    permissionsRegistry(): Promise<string> {
        return this.eth_call(functions.permissionsRegistry, [])
    }
}
