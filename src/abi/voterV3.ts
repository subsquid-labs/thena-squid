import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './voterV3.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Abstained: new LogEvent<([tokenId: bigint, weight: bigint] & {tokenId: bigint, weight: bigint})>(
        abi, '0xa9f3ca5f8a9e1580edb2741e0ba560084ec72e0067ba3423f9e9327a176882db'
    ),
    Attach: new LogEvent<([owner: string, gauge: string, tokenId: bigint] & {owner: string, gauge: string, tokenId: bigint})>(
        abi, '0x60940192810a6fb3bce3fd3e2e3a13fd6ccc7605e963fb87ee971aba829989bd'
    ),
    Blacklisted: new LogEvent<([blacklister: string, token: string] & {blacklister: string, token: string})>(
        abi, '0xd36871fdf6981136f3ac0564927005901eda06f7a9dff1e8b2a1d7846b8ebb50'
    ),
    Detach: new LogEvent<([owner: string, gauge: string, tokenId: bigint] & {owner: string, gauge: string, tokenId: bigint})>(
        abi, '0xae268d9aab12f3605f58efd74fd3801fa812b03fdb44317eb70f46dff0e19e22'
    ),
    DistributeReward: new LogEvent<([sender: string, gauge: string, amount: bigint] & {sender: string, gauge: string, amount: bigint})>(
        abi, '0x4fa9693cae526341d334e2862ca2413b2e503f1266255f9e0869fb36e6d89b17'
    ),
    GaugeCreated: new LogEvent<([gauge: string, creator: string, internal_bribe: string, external_bribe: string, pool: string] & {gauge: string, creator: string, internal_bribe: string, external_bribe: string, pool: string})>(
        abi, '0xa4d97e9e7c65249b4cd01acb82add613adea98af32daf092366982f0a0d4e453'
    ),
    GaugeKilled: new LogEvent<([gauge: string] & {gauge: string})>(
        abi, '0x04a5d3f5d80d22d9345acc80618f4a4e7e663cf9e1aed23b57d975acec002ba7'
    ),
    GaugeRevived: new LogEvent<([gauge: string] & {gauge: string})>(
        abi, '0xed18e9faa3dccfd8aa45f69c4de40546b2ca9cccc4538a2323531656516db1aa'
    ),
    Initialized: new LogEvent<([version: number] & {version: number})>(
        abi, '0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498'
    ),
    NotifyReward: new LogEvent<([sender: string, reward: string, amount: bigint] & {sender: string, reward: string, amount: bigint})>(
        abi, '0xf70d5c697de7ea828df48e5c4573cb2194c659f1901f70110c52b066dcf50826'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    Voted: new LogEvent<([voter: string, tokenId: bigint, weight: bigint] & {voter: string, tokenId: bigint, weight: bigint})>(
        abi, '0xea66f58e474bc09f580000e81f31b334d171db387d0c6098ba47bd897741679b'
    ),
    Whitelisted: new LogEvent<([whitelister: string, token: string] & {whitelister: string, token: string})>(
        abi, '0x6661a7108aecd07864384529117d96c319c1163e3010c01390f6b704726e07de'
    ),
}

export const functions = {
    MAX_VOTE_DELAY: new Func<[], {}, bigint>(
        abi, '0x6c4f2e38'
    ),
    VOTE_DELAY: new Func<[], {}, bigint>(
        abi, '0xffe5195b'
    ),
    _epochTimestamp: new Func<[], {}, bigint>(
        abi, '0xf8803bb6'
    ),
    _factories: new Func<[], {}, Array<string>>(
        abi, '0xe9f6adfa'
    ),
    _gaugeFactories: new Func<[], {}, Array<string>>(
        abi, '0x9fb5dc05'
    ),
    _init: new Func<[_tokens: Array<string>, _permissionsRegistry: string, _minter: string], {_tokens: Array<string>, _permissionsRegistry: string, _minter: string}, []>(
        abi, '0x9772e18f'
    ),
    _notifyRewardAmount: new Func<[amount: bigint], {amount: bigint}, []>(
        abi, '0x9aea6279'
    ),
    _ve: new Func<[], {}, string>(
        abi, '0x8dd598fb'
    ),
    addFactory: new Func<[_pairFactory: string, _gaugeFactory: string], {_pairFactory: string, _gaugeFactory: string}, []>(
        abi, '0x6566afad'
    ),
    attachTokenToGauge: new Func<[tokenId: bigint, account: string], {tokenId: bigint, account: string}, []>(
        abi, '0x698473e3'
    ),
    blacklist: new Func<[_token: Array<string>], {_token: Array<string>}, []>(
        abi, '0x041f173f'
    ),
    bribefactory: new Func<[], {}, string>(
        abi, '0x38752a9d'
    ),
    'claimBribes(address[],address[][],uint256)': new Func<[_bribes: Array<string>, _tokens: Array<Array<string>>, _tokenId: bigint], {_bribes: Array<string>, _tokens: Array<Array<string>>, _tokenId: bigint}, []>(
        abi, '0x7715ee75'
    ),
    'claimBribes(address[],address[][])': new Func<[_bribes: Array<string>, _tokens: Array<Array<string>>], {_bribes: Array<string>, _tokens: Array<Array<string>>}, []>(
        abi, '0xc2b79e98'
    ),
    'claimFees(address[],address[][],uint256)': new Func<[_fees: Array<string>, _tokens: Array<Array<string>>, _tokenId: bigint], {_fees: Array<string>, _tokens: Array<Array<string>>, _tokenId: bigint}, []>(
        abi, '0x666256aa'
    ),
    'claimFees(address[],address[][])': new Func<[_bribes: Array<string>, _tokens: Array<Array<string>>], {_bribes: Array<string>, _tokens: Array<Array<string>>}, []>(
        abi, '0xc991866d'
    ),
    claimRewards: new Func<[_gauges: Array<string>], {_gauges: Array<string>}, []>(
        abi, '0xf9f031df'
    ),
    claimable: new Func<[_: string], {}, bigint>(
        abi, '0x402914f5'
    ),
    createGauge: new Func<[_pool: string, _gaugeType: bigint], {_pool: string, _gaugeType: bigint}, ([_gauge: string, _internal_bribe: string, _external_bribe: string] & {_gauge: string, _internal_bribe: string, _external_bribe: string})>(
        abi, '0xdcd9e47a'
    ),
    createGauges: new Func<[_pool: Array<string>, _gaugeTypes: Array<bigint>], {_pool: Array<string>, _gaugeTypes: Array<bigint>}, [_: Array<string>, _: Array<string>, _: Array<string>]>(
        abi, '0x4d68ce44'
    ),
    detachTokenFromGauge: new Func<[tokenId: bigint, account: string], {tokenId: bigint, account: string}, []>(
        abi, '0x411b1f77'
    ),
    'distribute(address[])': new Func<[_gauges: Array<string>], {_gauges: Array<string>}, []>(
        abi, '0x6138889b'
    ),
    'distribute(uint256,uint256)': new Func<[start: bigint, finish: bigint], {start: bigint, finish: bigint}, []>(
        abi, '0x7625391a'
    ),
    distributeAll: new Func<[], {}, []>(
        abi, '0x436596c4'
    ),
    distributeFees: new Func<[_gauges: Array<string>], {_gauges: Array<string>}, []>(
        abi, '0xc527ee1f'
    ),
    external_bribes: new Func<[_: string], {}, string>(
        abi, '0xae21c4cb'
    ),
    factories: new Func<[_: bigint], {}, string>(
        abi, '0x672383c4'
    ),
    factory: new Func<[], {}, string>(
        abi, '0xc45a0155'
    ),
    factoryLength: new Func<[], {}, bigint>(
        abi, '0x470f4985'
    ),
    forceResetTo: new Func<[_tokenId: bigint], {_tokenId: bigint}, []>(
        abi, '0xb15db79c'
    ),
    gaugeFactories: new Func<[_: bigint], {}, string>(
        abi, '0x23e1af42'
    ),
    gaugeFactoriesLength: new Func<[], {}, bigint>(
        abi, '0xb52a3151'
    ),
    gaugefactory: new Func<[], {}, string>(
        abi, '0x68c3acb3'
    ),
    gauges: new Func<[_: string], {}, string>(
        abi, '0xb9a09fd5'
    ),
    gaugesDistributionTimestmap: new Func<[_: string], {}, bigint>(
        abi, '0xc445d88a'
    ),
    increaseGaugeApprovals: new Func<[_gauge: string], {_gauge: string}, []>(
        abi, '0x556e091d'
    ),
    initialize: new Func<[__ve: string, _factory: string, _gauges: string, _bribes: string], {__ve: string, _factory: string, _gauges: string, _bribes: string}, []>(
        abi, '0xf8c8765e'
    ),
    internal_bribes: new Func<[_: string], {}, string>(
        abi, '0xeae40f26'
    ),
    isAlive: new Func<[_: string], {}, boolean>(
        abi, '0x1703e5f9'
    ),
    isFactory: new Func<[_: string], {}, boolean>(
        abi, '0x0f04ba67'
    ),
    isGauge: new Func<[_: string], {}, boolean>(
        abi, '0xaa79979b'
    ),
    isGaugeFactory: new Func<[_: string], {}, boolean>(
        abi, '0x657021fb'
    ),
    isWhitelisted: new Func<[_: string], {}, boolean>(
        abi, '0x3af32abf'
    ),
    killGauge: new Func<[_gauge: string], {_gauge: string}, []>(
        abi, '0x992a7933'
    ),
    killGaugeTotally: new Func<[_gauge: string], {_gauge: string}, []>(
        abi, '0x9edfd460'
    ),
    lastVoted: new Func<[_: bigint], {}, bigint>(
        abi, '0xf3594be0'
    ),
    length: new Func<[], {}, bigint>(
        abi, '0x1f7b6d32'
    ),
    minter: new Func<[], {}, string>(
        abi, '0x07546172'
    ),
    notifyRewardAmount: new Func<[amount: bigint], {amount: bigint}, []>(
        abi, '0x3c6b16ab'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    permissionRegistry: new Func<[], {}, string>(
        abi, '0xb55a5c1c'
    ),
    poke: new Func<[_tokenId: bigint], {_tokenId: bigint}, []>(
        abi, '0x32145f90'
    ),
    poolForGauge: new Func<[_: string], {}, string>(
        abi, '0x06d6a1b2'
    ),
    poolVote: new Func<[_: bigint, _: bigint], {}, string>(
        abi, '0xa86a366d'
    ),
    poolVoteLength: new Func<[tokenId: bigint], {tokenId: bigint}, bigint>(
        abi, '0x6447e7da'
    ),
    pools: new Func<[_: bigint], {}, string>(
        abi, '0xac4afa38'
    ),
    removeFactory: new Func<[_pos: bigint], {_pos: bigint}, []>(
        abi, '0x577387b5'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    replaceFactory: new Func<[_pairFactory: string, _gaugeFactory: string, _pos: bigint], {_pairFactory: string, _gaugeFactory: string, _pos: bigint}, []>(
        abi, '0x27e5c823'
    ),
    reset: new Func<[_tokenId: bigint], {_tokenId: bigint}, []>(
        abi, '0x310bd74b'
    ),
    reviveGauge: new Func<[_gauge: string], {_gauge: string}, []>(
        abi, '0x9f06247b'
    ),
    setBribeFactory: new Func<[_bribeFactory: string], {_bribeFactory: string}, []>(
        abi, '0xa9b5aa7e'
    ),
    setExternalBribeFor: new Func<[_gauge: string, _external: string], {_gauge: string, _external: string}, []>(
        abi, '0xdaa168bd'
    ),
    setGaugeFactory: new Func<[_gaugeFactory: string], {_gaugeFactory: string}, []>(
        abi, '0x23130d11'
    ),
    setInternalBribeFor: new Func<[_gauge: string, _internal: string], {_gauge: string, _internal: string}, []>(
        abi, '0xb7c89f9c'
    ),
    setMinter: new Func<[_minter: string], {_minter: string}, []>(
        abi, '0xfca3b5aa'
    ),
    setNewBribes: new Func<[_gauge: string, _internal: string, _external: string], {_gauge: string, _internal: string, _external: string}, []>(
        abi, '0xb0f50278'
    ),
    setPairFactory: new Func<[_factory: string], {_factory: string}, []>(
        abi, '0x7964bac9'
    ),
    setPermissionsRegistry: new Func<[_permissionRegistry: string], {_permissionRegistry: string}, []>(
        abi, '0x33832a6a'
    ),
    setVoteDelay: new Func<[_delay: bigint], {_delay: bigint}, []>(
        abi, '0x8b6fc247'
    ),
    totalWeight: new Func<[], {}, bigint>(
        abi, '0x96c82e57'
    ),
    totalWeightAt: new Func<[_time: bigint], {_time: bigint}, bigint>(
        abi, '0x53be568d'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    updateAll: new Func<[], {}, []>(
        abi, '0x53d78693'
    ),
    updateFor: new Func<[_gauges: Array<string>], {_gauges: Array<string>}, []>(
        abi, '0xd560b0d7'
    ),
    updateForRange: new Func<[start: bigint, end: bigint], {start: bigint, end: bigint}, []>(
        abi, '0x9b6a9d72'
    ),
    usedWeights: new Func<[_: bigint], {}, bigint>(
        abi, '0x79e93824'
    ),
    vote: new Func<[_tokenId: bigint, _poolVote: Array<string>, _weights: Array<bigint>], {_tokenId: bigint, _poolVote: Array<string>, _weights: Array<bigint>}, []>(
        abi, '0x7ac09bf7'
    ),
    votes: new Func<[_: bigint, _: string], {}, bigint>(
        abi, '0xd23254b4'
    ),
    weights: new Func<[_pool: string], {_pool: string}, bigint>(
        abi, '0xa7cac846'
    ),
    weightsAt: new Func<[_pool: string, _time: bigint], {_pool: string, _time: bigint}, bigint>(
        abi, '0x636056f2'
    ),
    whitelist: new Func<[_token: Array<string>], {_token: Array<string>}, []>(
        abi, '0xbd8aa780'
    ),
}

export class Contract extends ContractBase {

    MAX_VOTE_DELAY(): Promise<bigint> {
        return this.eth_call(functions.MAX_VOTE_DELAY, [])
    }

    VOTE_DELAY(): Promise<bigint> {
        return this.eth_call(functions.VOTE_DELAY, [])
    }

    _epochTimestamp(): Promise<bigint> {
        return this.eth_call(functions._epochTimestamp, [])
    }

    _factories(): Promise<Array<string>> {
        return this.eth_call(functions._factories, [])
    }

    _gaugeFactories(): Promise<Array<string>> {
        return this.eth_call(functions._gaugeFactories, [])
    }

    _ve(): Promise<string> {
        return this.eth_call(functions._ve, [])
    }

    bribefactory(): Promise<string> {
        return this.eth_call(functions.bribefactory, [])
    }

    claimable(arg0: string): Promise<bigint> {
        return this.eth_call(functions.claimable, [arg0])
    }

    external_bribes(arg0: string): Promise<string> {
        return this.eth_call(functions.external_bribes, [arg0])
    }

    factories(arg0: bigint): Promise<string> {
        return this.eth_call(functions.factories, [arg0])
    }

    factory(): Promise<string> {
        return this.eth_call(functions.factory, [])
    }

    factoryLength(): Promise<bigint> {
        return this.eth_call(functions.factoryLength, [])
    }

    gaugeFactories(arg0: bigint): Promise<string> {
        return this.eth_call(functions.gaugeFactories, [arg0])
    }

    gaugeFactoriesLength(): Promise<bigint> {
        return this.eth_call(functions.gaugeFactoriesLength, [])
    }

    gaugefactory(): Promise<string> {
        return this.eth_call(functions.gaugefactory, [])
    }

    gauges(arg0: string): Promise<string> {
        return this.eth_call(functions.gauges, [arg0])
    }

    gaugesDistributionTimestmap(arg0: string): Promise<bigint> {
        return this.eth_call(functions.gaugesDistributionTimestmap, [arg0])
    }

    internal_bribes(arg0: string): Promise<string> {
        return this.eth_call(functions.internal_bribes, [arg0])
    }

    isAlive(arg0: string): Promise<boolean> {
        return this.eth_call(functions.isAlive, [arg0])
    }

    isFactory(arg0: string): Promise<boolean> {
        return this.eth_call(functions.isFactory, [arg0])
    }

    isGauge(arg0: string): Promise<boolean> {
        return this.eth_call(functions.isGauge, [arg0])
    }

    isGaugeFactory(arg0: string): Promise<boolean> {
        return this.eth_call(functions.isGaugeFactory, [arg0])
    }

    isWhitelisted(arg0: string): Promise<boolean> {
        return this.eth_call(functions.isWhitelisted, [arg0])
    }

    lastVoted(arg0: bigint): Promise<bigint> {
        return this.eth_call(functions.lastVoted, [arg0])
    }

    length(): Promise<bigint> {
        return this.eth_call(functions.length, [])
    }

    minter(): Promise<string> {
        return this.eth_call(functions.minter, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    permissionRegistry(): Promise<string> {
        return this.eth_call(functions.permissionRegistry, [])
    }

    poolForGauge(arg0: string): Promise<string> {
        return this.eth_call(functions.poolForGauge, [arg0])
    }

    poolVote(arg0: bigint, arg1: bigint): Promise<string> {
        return this.eth_call(functions.poolVote, [arg0, arg1])
    }

    poolVoteLength(tokenId: bigint): Promise<bigint> {
        return this.eth_call(functions.poolVoteLength, [tokenId])
    }

    pools(arg0: bigint): Promise<string> {
        return this.eth_call(functions.pools, [arg0])
    }

    totalWeight(): Promise<bigint> {
        return this.eth_call(functions.totalWeight, [])
    }

    totalWeightAt(_time: bigint): Promise<bigint> {
        return this.eth_call(functions.totalWeightAt, [_time])
    }

    usedWeights(arg0: bigint): Promise<bigint> {
        return this.eth_call(functions.usedWeights, [arg0])
    }

    votes(arg0: bigint, arg1: string): Promise<bigint> {
        return this.eth_call(functions.votes, [arg0, arg1])
    }

    weights(_pool: string): Promise<bigint> {
        return this.eth_call(functions.weights, [_pool])
    }

    weightsAt(_pool: string, _time: bigint): Promise<bigint> {
        return this.eth_call(functions.weightsAt, [_pool, _time])
    }
}
