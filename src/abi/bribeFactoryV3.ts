import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './bribeFactoryV3.abi'

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
    addRewardToBribe: new Func<[_token: string, __bribe: string], {_token: string, __bribe: string}, []>(
        abi, '0x347e833b'
    ),
    addRewardToBribes: new Func<[_token: string, __bribes: Array<string>], {_token: string, __bribes: Array<string>}, []>(
        abi, '0xb4f4a083'
    ),
    addRewardsToBribe: new Func<[_token: Array<string>, __bribe: string], {_token: Array<string>, __bribe: string}, []>(
        abi, '0x348474ff'
    ),
    addRewardsToBribes: new Func<[_token: Array<Array<string>>, __bribes: Array<string>], {_token: Array<Array<string>>, __bribes: Array<string>}, []>(
        abi, '0xed124c0b'
    ),
    createBribe: new Func<[_owner: string, _token0: string, _token1: string, _type: string], {_owner: string, _token0: string, _token1: string, _type: string}, string>(
        abi, '0x0000e66b'
    ),
    defaultRewardToken: new Func<[_: bigint], {}, string>(
        abi, '0xec365b20'
    ),
    initialize: new Func<[_voter: string, _permissionsRegistry: string], {_voter: string, _permissionsRegistry: string}, []>(
        abi, '0x485cc955'
    ),
    last_bribe: new Func<[], {}, string>(
        abi, '0xb1d0fc82'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    permissionsRegistry: new Func<[], {}, string>(
        abi, '0x3df8504b'
    ),
    pushDefaultRewardToken: new Func<[_token: string], {_token: string}, []>(
        abi, '0x6fa782b9'
    ),
    recoverERC20AndUpdateData: new Func<[_bribe: Array<string>, _tokens: Array<string>, _amounts: Array<bigint>], {_bribe: Array<string>, _tokens: Array<string>, _amounts: Array<bigint>}, []>(
        abi, '0xae114688'
    ),
    recoverERC20From: new Func<[_bribe: Array<string>, _tokens: Array<string>, _amounts: Array<bigint>], {_bribe: Array<string>, _tokens: Array<string>, _amounts: Array<bigint>}, []>(
        abi, '0x58d05e5c'
    ),
    removeDefaultRewardToken: new Func<[_token: string], {_token: string}, []>(
        abi, '0x69a12557'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    setBribeMinter: new Func<[_bribe: Array<string>, _minter: string], {_bribe: Array<string>, _minter: string}, []>(
        abi, '0x3e264395'
    ),
    setBribeOwner: new Func<[_bribe: Array<string>, _owner: string], {_bribe: Array<string>, _owner: string}, []>(
        abi, '0x70eca117'
    ),
    setBribeVoter: new Func<[_bribe: Array<string>, _voter: string], {_bribe: Array<string>, _voter: string}, []>(
        abi, '0x48be0cb4'
    ),
    setPermissionsRegistry: new Func<[_permReg: string], {_permReg: string}, []>(
        abi, '0x33832a6a'
    ),
    setVoter: new Func<[_Voter: string], {_Voter: string}, []>(
        abi, '0x4bc2a657'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    voter: new Func<[], {}, string>(
        abi, '0x46c96aac'
    ),
}

export class Contract extends ContractBase {

    defaultRewardToken(arg0: bigint): Promise<string> {
        return this.eth_call(functions.defaultRewardToken, [arg0])
    }

    last_bribe(): Promise<string> {
        return this.eth_call(functions.last_bribe, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    permissionsRegistry(): Promise<string> {
        return this.eth_call(functions.permissionsRegistry, [])
    }

    voter(): Promise<string> {
        return this.eth_call(functions.voter, [])
    }
}
