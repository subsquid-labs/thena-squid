import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './gaugeV2.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    ClaimFees: new LogEvent<([from: string, claimed0: bigint, claimed1: bigint] & {from: string, claimed0: bigint, claimed1: bigint})>(
        abi, '0xbc567d6cbad26368064baa0ab5a757be46aae4d70f707f9203d9d9b6c8ccbfa3'
    ),
    Deposit: new LogEvent<([user: string, amount: bigint] & {user: string, amount: bigint})>(
        abi, '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c'
    ),
    Harvest: new LogEvent<([user: string, reward: bigint] & {user: string, reward: bigint})>(
        abi, '0xc9695243a805adb74c91f28311176c65b417e842d5699893cef56d18bfa48cba'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    RewardAdded: new LogEvent<([reward: bigint] & {reward: bigint})>(
        abi, '0xde88a922e0d3b88b24e9623efeb464919c6bf9f66857a65e2bfcf2ce87a9433d'
    ),
    Withdraw: new LogEvent<([user: string, amount: bigint] & {user: string, amount: bigint})>(
        abi, '0x884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a9424364'
    ),
}

export const functions = {
    DISTRIBUTION: new Func<[], {}, string>(
        abi, '0x7c91e4eb'
    ),
    DURATION: new Func<[], {}, bigint>(
        abi, '0x1be05289'
    ),
    TOKEN: new Func<[], {}, string>(
        abi, '0x82bfefc8'
    ),
    _VE: new Func<[], {}, string>(
        abi, '0x9f6d7d5b'
    ),
    _balances: new Func<[_: string], {}, bigint>(
        abi, '0x6ebcf607'
    ),
    _periodFinish: new Func<[], {}, bigint>(
        abi, '0x1407c664'
    ),
    _totalSupply: new Func<[], {}, bigint>(
        abi, '0x3eaaf86b'
    ),
    activateEmergencyMode: new Func<[], {}, []>(
        abi, '0xd0096010'
    ),
    balanceOf: new Func<[account: string], {account: string}, bigint>(
        abi, '0x70a08231'
    ),
    claimFees: new Func<[], {}, ([claimed0: bigint, claimed1: bigint] & {claimed0: bigint, claimed1: bigint})>(
        abi, '0xd294f093'
    ),
    deposit: new Func<[amount: bigint], {amount: bigint}, []>(
        abi, '0xb6b55f25'
    ),
    depositAll: new Func<[], {}, []>(
        abi, '0xde5f6268'
    ),
    earned: new Func<[account: string], {account: string}, bigint>(
        abi, '0x008cc262'
    ),
    emergency: new Func<[], {}, boolean>(
        abi, '0xcaa6fea4'
    ),
    emergencyWithdraw: new Func<[], {}, []>(
        abi, '0xdb2e21bc'
    ),
    emergencyWithdrawAmount: new Func<[_amount: bigint], {_amount: bigint}, []>(
        abi, '0xc6c8f6b6'
    ),
    external_bribe: new Func<[], {}, string>(
        abi, '0x03fbf83a'
    ),
    fees0: new Func<[], {}, bigint>(
        abi, '0x93f1c442'
    ),
    fees1: new Func<[], {}, bigint>(
        abi, '0x4c02a21c'
    ),
    gaugeRewarder: new Func<[], {}, string>(
        abi, '0x863e2442'
    ),
    'getReward()': new Func<[], {}, []>(
        abi, '0x3d18b912'
    ),
    'getReward(address)': new Func<[_user: string], {_user: string}, []>(
        abi, '0xc00007b0'
    ),
    internal_bribe: new Func<[], {}, string>(
        abi, '0x770f8571'
    ),
    isForPair: new Func<[], {}, boolean>(
        abi, '0xe5748213'
    ),
    lastTimeRewardApplicable: new Func<[], {}, bigint>(
        abi, '0x80faa57d'
    ),
    lastUpdateTime: new Func<[], {}, bigint>(
        abi, '0xc8f33c91'
    ),
    notifyRewardAmount: new Func<[token: string, reward: bigint], {token: string, reward: bigint}, []>(
        abi, '0xb66503cf'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    periodFinish: new Func<[], {}, bigint>(
        abi, '0xebe2b12b'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    rewardForDuration: new Func<[], {}, bigint>(
        abi, '0x6946a235'
    ),
    rewardPerToken: new Func<[], {}, bigint>(
        abi, '0xcd3daf9d'
    ),
    rewardPerTokenStored: new Func<[], {}, bigint>(
        abi, '0xdf136d65'
    ),
    rewardRate: new Func<[], {}, bigint>(
        abi, '0x7b0a47ee'
    ),
    rewardToken: new Func<[], {}, string>(
        abi, '0xf7c618c1'
    ),
    rewarderPid: new Func<[], {}, bigint>(
        abi, '0x8f67b013'
    ),
    rewards: new Func<[_: string], {}, bigint>(
        abi, '0x0700037d'
    ),
    setDistribution: new Func<[_distribution: string], {_distribution: string}, []>(
        abi, '0x7f699015'
    ),
    setGaugeRewarder: new Func<[_gaugeRewarder: string], {_gaugeRewarder: string}, []>(
        abi, '0xf97d2114'
    ),
    setInternalBribe: new Func<[_int: string], {_int: string}, []>(
        abi, '0x91f25a94'
    ),
    setRewarderPid: new Func<[_pid: bigint], {_pid: bigint}, []>(
        abi, '0x70b15e6d'
    ),
    stopEmergencyMode: new Func<[], {}, []>(
        abi, '0xb1534ecd'
    ),
    totalSupply: new Func<[], {}, bigint>(
        abi, '0x18160ddd'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    userRewardPerTokenPaid: new Func<[_: string], {}, bigint>(
        abi, '0x8b876347'
    ),
    withdraw: new Func<[amount: bigint], {amount: bigint}, []>(
        abi, '0x2e1a7d4d'
    ),
    withdrawAll: new Func<[], {}, []>(
        abi, '0x853828b6'
    ),
    withdrawAllAndHarvest: new Func<[], {}, []>(
        abi, '0x6e9852f2'
    ),
}

export class Contract extends ContractBase {

    DISTRIBUTION(): Promise<string> {
        return this.eth_call(functions.DISTRIBUTION, [])
    }

    DURATION(): Promise<bigint> {
        return this.eth_call(functions.DURATION, [])
    }

    TOKEN(): Promise<string> {
        return this.eth_call(functions.TOKEN, [])
    }

    _VE(): Promise<string> {
        return this.eth_call(functions._VE, [])
    }

    _balances(arg0: string): Promise<bigint> {
        return this.eth_call(functions._balances, [arg0])
    }

    _periodFinish(): Promise<bigint> {
        return this.eth_call(functions._periodFinish, [])
    }

    _totalSupply(): Promise<bigint> {
        return this.eth_call(functions._totalSupply, [])
    }

    balanceOf(account: string): Promise<bigint> {
        return this.eth_call(functions.balanceOf, [account])
    }

    earned(account: string): Promise<bigint> {
        return this.eth_call(functions.earned, [account])
    }

    emergency(): Promise<boolean> {
        return this.eth_call(functions.emergency, [])
    }

    external_bribe(): Promise<string> {
        return this.eth_call(functions.external_bribe, [])
    }

    fees0(): Promise<bigint> {
        return this.eth_call(functions.fees0, [])
    }

    fees1(): Promise<bigint> {
        return this.eth_call(functions.fees1, [])
    }

    gaugeRewarder(): Promise<string> {
        return this.eth_call(functions.gaugeRewarder, [])
    }

    internal_bribe(): Promise<string> {
        return this.eth_call(functions.internal_bribe, [])
    }

    isForPair(): Promise<boolean> {
        return this.eth_call(functions.isForPair, [])
    }

    lastTimeRewardApplicable(): Promise<bigint> {
        return this.eth_call(functions.lastTimeRewardApplicable, [])
    }

    lastUpdateTime(): Promise<bigint> {
        return this.eth_call(functions.lastUpdateTime, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    periodFinish(): Promise<bigint> {
        return this.eth_call(functions.periodFinish, [])
    }

    rewardForDuration(): Promise<bigint> {
        return this.eth_call(functions.rewardForDuration, [])
    }

    rewardPerToken(): Promise<bigint> {
        return this.eth_call(functions.rewardPerToken, [])
    }

    rewardPerTokenStored(): Promise<bigint> {
        return this.eth_call(functions.rewardPerTokenStored, [])
    }

    rewardRate(): Promise<bigint> {
        return this.eth_call(functions.rewardRate, [])
    }

    rewardToken(): Promise<string> {
        return this.eth_call(functions.rewardToken, [])
    }

    rewarderPid(): Promise<bigint> {
        return this.eth_call(functions.rewarderPid, [])
    }

    rewards(arg0: string): Promise<bigint> {
        return this.eth_call(functions.rewards, [arg0])
    }

    totalSupply(): Promise<bigint> {
        return this.eth_call(functions.totalSupply, [])
    }

    userRewardPerTokenPaid(arg0: string): Promise<bigint> {
        return this.eth_call(functions.userRewardPerTokenPaid, [arg0])
    }
}
