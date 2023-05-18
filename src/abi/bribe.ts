import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './bribe.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Recovered: new LogEvent<([token: string, amount: bigint] & {token: string, amount: bigint})>(
        abi, '0x8c1256b8896378cd5044f80c202f9772b9d77dc85c8a6eb51967210b09bfaa28'
    ),
    RewardAdded: new LogEvent<([rewardToken: string, reward: bigint, startTimestamp: bigint] & {rewardToken: string, reward: bigint, startTimestamp: bigint})>(
        abi, '0x6a6f77044107a33658235d41bedbbaf2fe9ccdceb313143c947a5e76e1ec8474'
    ),
    RewardPaid: new LogEvent<([user: string, rewardsToken: string, reward: bigint] & {user: string, rewardsToken: string, reward: bigint})>(
        abi, '0x540798df468d7b23d11f156fdb954cb19ad414d150722a7b6d55ba369dea792e'
    ),
    Staked: new LogEvent<([tokenId: bigint, amount: bigint] & {tokenId: bigint, amount: bigint})>(
        abi, '0x925435fa7e37e5d9555bb18ce0d62bb9627d0846942e58e5291e9a2dded462ed'
    ),
    Withdrawn: new LogEvent<([tokenId: bigint, amount: bigint] & {tokenId: bigint, amount: bigint})>(
        abi, '0x0c875c8d391179c5cf7ad8303d268efd50b8beb78b671f85cd54bfb91eb8ef40'
    ),
}

export const functions = {
    TYPE: new Func<[], {}, string>(
        abi, '0xbb24fe8a'
    ),
    WEEK: new Func<[], {}, bigint>(
        abi, '0xf4359ce5'
    ),
    _deposit: new Func<[amount: bigint, tokenId: bigint], {amount: bigint, tokenId: bigint}, []>(
        abi, '0xf3207723'
    ),
    _totalSupply: new Func<[_: bigint], {}, bigint>(
        abi, '0x5977e82a'
    ),
    _withdraw: new Func<[amount: bigint, tokenId: bigint], {amount: bigint, tokenId: bigint}, []>(
        abi, '0x9e2bf22c'
    ),
    addReward: new Func<[_rewardsToken: string], {_rewardsToken: string}, []>(
        abi, '0x9c9b2e21'
    ),
    addRewards: new Func<[_rewardsToken: Array<string>], {_rewardsToken: Array<string>}, []>(
        abi, '0x613ec914'
    ),
    balanceOf: new Func<[tokenId: bigint], {tokenId: bigint}, bigint>(
        abi, '0x9cc7f708'
    ),
    balanceOfAt: new Func<[tokenId: bigint, _timestamp: bigint], {tokenId: bigint, _timestamp: bigint}, bigint>(
        abi, '0x853c8aeb'
    ),
    balanceOfOwner: new Func<[_owner: string], {_owner: string}, bigint>(
        abi, '0xc66130d7'
    ),
    balanceOfOwnerAt: new Func<[_owner: string, _timestamp: bigint], {_owner: string, _timestamp: bigint}, bigint>(
        abi, '0xae205536'
    ),
    bribeFactory: new Func<[], {}, string>(
        abi, '0xeb4a78e0'
    ),
    'earned(address,address)': new Func<[_owner: string, _rewardToken: string], {_owner: string, _rewardToken: string}, bigint>(
        abi, '0x211dc32d'
    ),
    'earned(uint256,address)': new Func<[tokenId: bigint, _rewardToken: string], {tokenId: bigint, _rewardToken: string}, bigint>(
        abi, '0xe39c08fc'
    ),
    emergencyRecoverERC20: new Func<[tokenAddress: string, tokenAmount: bigint], {tokenAddress: string, tokenAmount: bigint}, []>(
        abi, '0x0125bb32'
    ),
    firstBribeTimestamp: new Func<[], {}, bigint>(
        abi, '0x55288eea'
    ),
    getEpochStart: new Func<[], {}, bigint>(
        abi, '0xa4a3e035'
    ),
    getNextEpochStart: new Func<[], {}, bigint>(
        abi, '0x65c5f94a'
    ),
    'getReward(address[])': new Func<[tokens: Array<string>], {tokens: Array<string>}, []>(
        abi, '0x7fd7d062'
    ),
    'getReward(uint256,address[])': new Func<[tokenId: bigint, tokens: Array<string>], {tokenId: bigint, tokens: Array<string>}, []>(
        abi, '0xf5f8d365'
    ),
    getRewardForAddress: new Func<[_owner: string, tokens: Array<string>], {_owner: string, tokens: Array<string>}, []>(
        abi, '0xdb0ea984'
    ),
    getRewardForOwner: new Func<[tokenId: bigint, tokens: Array<string>], {tokenId: bigint, tokens: Array<string>}, []>(
        abi, '0xa7852afa'
    ),
    isRewardToken: new Func<[_: string], {}, boolean>(
        abi, '0xb5fd73f8'
    ),
    minter: new Func<[], {}, string>(
        abi, '0x07546172'
    ),
    notifyRewardAmount: new Func<[_rewardsToken: string, reward: bigint], {_rewardsToken: string, reward: bigint}, []>(
        abi, '0xb66503cf'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    recoverERC20AndUpdateData: new Func<[tokenAddress: string, tokenAmount: bigint], {tokenAddress: string, tokenAmount: bigint}, []>(
        abi, '0xc95bda70'
    ),
    rewardData: new Func<[_: string, _: bigint], {}, ([periodFinish: bigint, rewardsPerEpoch: bigint, lastUpdateTime: bigint] & {periodFinish: bigint, rewardsPerEpoch: bigint, lastUpdateTime: bigint})>(
        abi, '0x38174862'
    ),
    rewardPerToken: new Func<[_rewardsToken: string, _timestmap: bigint], {_rewardsToken: string, _timestmap: bigint}, bigint>(
        abi, '0x57bc5614'
    ),
    rewardTokens: new Func<[_: bigint], {}, string>(
        abi, '0x7bb7bed1'
    ),
    rewardsListLength: new Func<[], {}, bigint>(
        abi, '0xe6886396'
    ),
    setMinter: new Func<[_minter: string], {_minter: string}, []>(
        abi, '0xfca3b5aa'
    ),
    setOwner: new Func<[_owner: string], {_owner: string}, []>(
        abi, '0x13af4035'
    ),
    setVoter: new Func<[_Voter: string], {_Voter: string}, []>(
        abi, '0x4bc2a657'
    ),
    totalSupply: new Func<[], {}, bigint>(
        abi, '0x18160ddd'
    ),
    totalSupplyAt: new Func<[_timestamp: bigint], {_timestamp: bigint}, bigint>(
        abi, '0x981b24d0'
    ),
    userRewardPerTokenPaid: new Func<[_: string, _: string], {}, bigint>(
        abi, '0x7035ab98'
    ),
    userTimestamp: new Func<[_: string, _: string], {}, bigint>(
        abi, '0x731b8f72'
    ),
    ve: new Func<[], {}, string>(
        abi, '0x1f850716'
    ),
    voter: new Func<[], {}, string>(
        abi, '0x46c96aac'
    ),
}

export class Contract extends ContractBase {

    TYPE(): Promise<string> {
        return this.eth_call(functions.TYPE, [])
    }

    WEEK(): Promise<bigint> {
        return this.eth_call(functions.WEEK, [])
    }

    _totalSupply(arg0: bigint): Promise<bigint> {
        return this.eth_call(functions._totalSupply, [arg0])
    }

    balanceOf(tokenId: bigint): Promise<bigint> {
        return this.eth_call(functions.balanceOf, [tokenId])
    }

    balanceOfAt(tokenId: bigint, _timestamp: bigint): Promise<bigint> {
        return this.eth_call(functions.balanceOfAt, [tokenId, _timestamp])
    }

    balanceOfOwner(_owner: string): Promise<bigint> {
        return this.eth_call(functions.balanceOfOwner, [_owner])
    }

    balanceOfOwnerAt(_owner: string, _timestamp: bigint): Promise<bigint> {
        return this.eth_call(functions.balanceOfOwnerAt, [_owner, _timestamp])
    }

    bribeFactory(): Promise<string> {
        return this.eth_call(functions.bribeFactory, [])
    }

    'earned(address,address)'(_owner: string, _rewardToken: string): Promise<bigint> {
        return this.eth_call(functions['earned(address,address)'], [_owner, _rewardToken])
    }

    'earned(uint256,address)'(tokenId: bigint, _rewardToken: string): Promise<bigint> {
        return this.eth_call(functions['earned(uint256,address)'], [tokenId, _rewardToken])
    }

    firstBribeTimestamp(): Promise<bigint> {
        return this.eth_call(functions.firstBribeTimestamp, [])
    }

    getEpochStart(): Promise<bigint> {
        return this.eth_call(functions.getEpochStart, [])
    }

    getNextEpochStart(): Promise<bigint> {
        return this.eth_call(functions.getNextEpochStart, [])
    }

    isRewardToken(arg0: string): Promise<boolean> {
        return this.eth_call(functions.isRewardToken, [arg0])
    }

    minter(): Promise<string> {
        return this.eth_call(functions.minter, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    rewardData(arg0: string, arg1: bigint): Promise<([periodFinish: bigint, rewardsPerEpoch: bigint, lastUpdateTime: bigint] & {periodFinish: bigint, rewardsPerEpoch: bigint, lastUpdateTime: bigint})> {
        return this.eth_call(functions.rewardData, [arg0, arg1])
    }

    rewardPerToken(_rewardsToken: string, _timestmap: bigint): Promise<bigint> {
        return this.eth_call(functions.rewardPerToken, [_rewardsToken, _timestmap])
    }

    rewardTokens(arg0: bigint): Promise<string> {
        return this.eth_call(functions.rewardTokens, [arg0])
    }

    rewardsListLength(): Promise<bigint> {
        return this.eth_call(functions.rewardsListLength, [])
    }

    totalSupply(): Promise<bigint> {
        return this.eth_call(functions.totalSupply, [])
    }

    totalSupplyAt(_timestamp: bigint): Promise<bigint> {
        return this.eth_call(functions.totalSupplyAt, [_timestamp])
    }

    userRewardPerTokenPaid(arg0: string, arg1: string): Promise<bigint> {
        return this.eth_call(functions.userRewardPerTokenPaid, [arg0, arg1])
    }

    userTimestamp(arg0: string, arg1: string): Promise<bigint> {
        return this.eth_call(functions.userTimestamp, [arg0, arg1])
    }

    ve(): Promise<string> {
        return this.eth_call(functions.ve, [])
    }

    voter(): Promise<string> {
        return this.eth_call(functions.voter, [])
    }
}
