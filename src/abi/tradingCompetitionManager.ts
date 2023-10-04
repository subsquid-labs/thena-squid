import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './tradingCompetitionManager.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    AddCreator: new LogEvent<([creator: string, blocktimestamp: bigint] & {creator: string, blocktimestamp: bigint})>(
        abi, '0x80d4b5a40bdefc5f6220b49ff7636fa91328bcdec86c26a5a544ca4fe55ff733'
    ),
    AddToken: new LogEvent<([token: string, blocktimestamp: bigint] & {token: string, blocktimestamp: bigint})>(
        abi, '0xe1bea1af9b1d1aede8b7fa043080de8690470a8ae61449360b3d0c0bf8104b46'
    ),
    Create: new LogEvent<([tradingCompetition: ([entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})] & {entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})}), competition: string, caller: string, idCounter: bigint, blocktimestamp: bigint] & {tradingCompetition: ([entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})] & {entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})}), competition: string, caller: string, idCounter: bigint, blocktimestamp: bigint})>(
        abi, '0xb98c47531f1c52dcc75d4ad4426930ab9006962cca7d5663c8dd7a7d464e0a2b'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    RemoveCreator: new LogEvent<([creator: string, blocktimestamp: bigint] & {creator: string, blocktimestamp: bigint})>(
        abi, '0x0a97a5d8c435610c0cc2428b64ab9a50350cbd531e1280d8c34fb60ad93821f5'
    ),
    RemoveToken: new LogEvent<([token: string, blocktimestamp: bigint] & {token: string, blocktimestamp: bigint})>(
        abi, '0x67f5552e5abc48ba6305130450943fa23b76a0b6eb18c29d3eea39559139fc5a'
    ),
    SetMaxPlacements: new LogEvent<([oldAmount: bigint, newAmount: bigint, blocktimestamp: bigint] & {oldAmount: bigint, newAmount: bigint, blocktimestamp: bigint})>(
        abi, '0xe25d596b1ebc746e3d0de146aab6bbdddc0285837b20e8401d8991053a0d5e89'
    ),
    SetMaxUsers: new LogEvent<([oldAmount: bigint, newAmount: bigint, blocktimestamp: bigint] & {oldAmount: bigint, newAmount: bigint, blocktimestamp: bigint})>(
        abi, '0x1fa9670a0191240734c81056588c5c33980d1deeab1741a8d851f44c8e4218de'
    ),
    SetPermissionlessCreation: new LogEvent<([status: boolean, blocktimestamp: bigint] & {status: boolean, blocktimestamp: bigint})>(
        abi, '0x4cf2b1511c2e39ba3f68b85948f292664f024ba5b0c2a31d2de252fe8e325b41'
    ),
    SetPerpetualFactory: new LogEvent<([old: string, newFactory: string, blocktimestamp: bigint] & {old: string, newFactory: string, blocktimestamp: bigint})>(
        abi, '0x71c62f057a24ead59576e7972046a4579cae7f6a668556035e7e1a18990011b5'
    ),
    SetProtocolFee: new LogEvent<([oldAmount: bigint, newAmount: bigint, blocktimestamp: bigint] & {oldAmount: bigint, newAmount: bigint, blocktimestamp: bigint})>(
        abi, '0xce1af523d72a1520418223fe991f28e9b42047a7e9c812528bced782fe2e5cac'
    ),
    SetProtocolFeeToken: new LogEvent<([oldtoken: string, newToken: string, blocktimestamp: bigint] & {oldtoken: string, newToken: string, blocktimestamp: bigint})>(
        abi, '0x4080fcd11d900f8e2875dbcfe7c0bbb53880680c790b73d8d63f1e4a5ef4fb09'
    ),
    SetRouter: new LogEvent<([old: string, newRouter: string, blocktimestamp: bigint] & {old: string, newRouter: string, blocktimestamp: bigint})>(
        abi, '0xc8b43d48e252426ceaf214acf7eb3ac5701d485e66dd6f96d203e792344c79b9'
    ),
    SetSpotFactory: new LogEvent<([old: string, newFactory: string, blocktimestamp: bigint] & {old: string, newFactory: string, blocktimestamp: bigint})>(
        abi, '0x574d62c705e12728a52b294c72bf36261588b8cad798fe40d51ed202fda29555'
    ),
    SetTreasury: new LogEvent<([oldTreasury: string, newTreasury: string, blocktimestamp: bigint] & {oldTreasury: string, newTreasury: string, blocktimestamp: bigint})>(
        abi, '0x887a88d49d602347b4a69bb465e2458180b92824203a28d0adb681d26c9227fe'
    ),
}

export const functions = {
    MAX_OWNER_FEE: new Func<[], {}, bigint>(
        abi, '0x08a41d28'
    ),
    MAX_PLACEMENTS: new Func<[], {}, bigint>(
        abi, '0x6d0b551b'
    ),
    MAX_TOKEN_PRIZE: new Func<[], {}, bigint>(
        abi, '0x973e928c'
    ),
    MAX_USERS: new Func<[], {}, bigint>(
        abi, '0xfa6ac131'
    ),
    PRECISION: new Func<[], {}, bigint>(
        abi, '0xaaf5eb68'
    ),
    addCreator: new Func<[_creator: Array<string>], {_creator: Array<string>}, []>(
        abi, '0x8ec36962'
    ),
    addToken: new Func<[_token: Array<string>], {_token: Array<string>}, []>(
        abi, '0x10881166'
    ),
    create: new Func<[_tradingCompetition: ([entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})] & {entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})})], {_tradingCompetition: ([entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})] & {entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})})}, [_: string, _: bigint]>(
        abi, '0x9ecb8286'
    ),
    idCounter: new Func<[], {}, bigint>(
        abi, '0xeb08ab28'
    ),
    idToTradingCompetition: new Func<[_id: bigint], {_id: bigint}, ([entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})] & {entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})})>(
        abi, '0x59538b59'
    ),
    isAllowedCreator: new Func<[_: string], {}, boolean>(
        abi, '0xaef35888'
    ),
    isAllowedToken: new Func<[_: string], {}, boolean>(
        abi, '0xcbe230c3'
    ),
    isPermissionless: new Func<[], {}, boolean>(
        abi, '0xfaa1bce3'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    pause: new Func<[], {}, boolean>(
        abi, '0x8456cb59'
    ),
    perpetualFactory: new Func<[], {}, string>(
        abi, '0x44279fe6'
    ),
    protocol_fee: new Func<[], {}, bigint>(
        abi, '0x16552732'
    ),
    protocol_fee_token: new Func<[], {}, string>(
        abi, '0x358769e4'
    ),
    protocol_fee_treasury: new Func<[], {}, string>(
        abi, '0x8fbde24f'
    ),
    removeCreator: new Func<[_creator: Array<string>], {_creator: Array<string>}, []>(
        abi, '0xd4fbac12'
    ),
    removeToken: new Func<[_token: Array<string>], {_token: Array<string>}, []>(
        abi, '0xbf7cb70b'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    router: new Func<[], {}, string>(
        abi, '0xf887ea40'
    ),
    setMaxPlacements: new Func<[_MAX_PLACEMENTS: bigint], {_MAX_PLACEMENTS: bigint}, []>(
        abi, '0x5f0dad8c'
    ),
    setMaxUsers: new Func<[_MAX_USERS: bigint], {_MAX_USERS: bigint}, []>(
        abi, '0x416f4267'
    ),
    setPermissionlessCreation: new Func<[_type: boolean], {_type: boolean}, []>(
        abi, '0x774550af'
    ),
    setPerpetualFactory: new Func<[_perpetualFactory: string], {_perpetualFactory: string}, []>(
        abi, '0xfa218ae7'
    ),
    setProtocolFee: new Func<[amount: bigint], {amount: bigint}, []>(
        abi, '0x787dce3d'
    ),
    setProtocolFeeToken: new Func<[token: string], {token: string}, []>(
        abi, '0x9be93a08'
    ),
    setRouter: new Func<[_newRouter: string], {_newRouter: string}, []>(
        abi, '0xc0d78655'
    ),
    setSpotFactory: new Func<[_spotFactory: string], {_spotFactory: string}, []>(
        abi, '0x915dc659'
    ),
    setTreasury: new Func<[_treasury: string], {_treasury: string}, []>(
        abi, '0xf0f44260'
    ),
    spotFactory: new Func<[], {}, string>(
        abi, '0x360dd573'
    ),
    tradingTokens: new Func<[], {}, Array<string>>(
        abi, '0x58f9d888'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
}

export class Contract extends ContractBase {

    MAX_OWNER_FEE(): Promise<bigint> {
        return this.eth_call(functions.MAX_OWNER_FEE, [])
    }

    MAX_PLACEMENTS(): Promise<bigint> {
        return this.eth_call(functions.MAX_PLACEMENTS, [])
    }

    MAX_TOKEN_PRIZE(): Promise<bigint> {
        return this.eth_call(functions.MAX_TOKEN_PRIZE, [])
    }

    MAX_USERS(): Promise<bigint> {
        return this.eth_call(functions.MAX_USERS, [])
    }

    PRECISION(): Promise<bigint> {
        return this.eth_call(functions.PRECISION, [])
    }

    idCounter(): Promise<bigint> {
        return this.eth_call(functions.idCounter, [])
    }

    idToTradingCompetition(_id: bigint): Promise<([entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})] & {entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})})> {
        return this.eth_call(functions.idToTradingCompetition, [_id])
    }

    isAllowedCreator(arg0: string): Promise<boolean> {
        return this.eth_call(functions.isAllowedCreator, [arg0])
    }

    isAllowedToken(arg0: string): Promise<boolean> {
        return this.eth_call(functions.isAllowedToken, [arg0])
    }

    isPermissionless(): Promise<boolean> {
        return this.eth_call(functions.isPermissionless, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    pause(): Promise<boolean> {
        return this.eth_call(functions.pause, [])
    }

    perpetualFactory(): Promise<string> {
        return this.eth_call(functions.perpetualFactory, [])
    }

    protocol_fee(): Promise<bigint> {
        return this.eth_call(functions.protocol_fee, [])
    }

    protocol_fee_token(): Promise<string> {
        return this.eth_call(functions.protocol_fee_token, [])
    }

    protocol_fee_treasury(): Promise<string> {
        return this.eth_call(functions.protocol_fee_treasury, [])
    }

    router(): Promise<string> {
        return this.eth_call(functions.router, [])
    }

    spotFactory(): Promise<string> {
        return this.eth_call(functions.spotFactory, [])
    }

    tradingTokens(): Promise<Array<string>> {
        return this.eth_call(functions.tradingTokens, [])
    }
}
