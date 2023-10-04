import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './tradingCompetitionSpot.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    ClaimOwnerFee: new LogEvent<([owner: string, to: string, token: string, amount: bigint] & {owner: string, to: string, token: string, amount: bigint})>(
        abi, '0x98677a426d819e4e42c5ce7c790f63da4983e8e5336dbc477f58221c11ef2b62'
    ),
    ClaimPrize: new LogEvent<([winner: string, to: string, token: string, amount: bigint] & {winner: string, to: string, token: string, amount: bigint})>(
        abi, '0xd8d9a68ff50a3262f010c0038f7caf50afda1cd2303d1590fc777e6787ef8ba2'
    ),
    DepositFund: new LogEvent<([user: string, token: string, amountIn: bigint, timestamp: bigint] & {user: string, token: string, amountIn: bigint, timestamp: bigint})>(
        abi, '0xf09a5fa3195e3e263d45424b2cdacfd0eea5dd2fdf46f31140babc0fde60abb9'
    ),
    Trade: new LogEvent<([user: string, tokenIn: string, tokenOut: string, amountIn: bigint, amountOut: bigint, calls: Array<([target: bigint, gasLimit: bigint, value: bigint, data: string] & {target: bigint, gasLimit: bigint, value: bigint, data: string})>, timestamp: bigint] & {user: string, tokenIn: string, tokenOut: string, amountIn: bigint, amountOut: bigint, calls: Array<([target: bigint, gasLimit: bigint, value: bigint, data: string] & {target: bigint, gasLimit: bigint, value: bigint, data: string})>, timestamp: bigint})>(
        abi, '0x4bd70cac06af26311cc4baf9edb4aba66d91b20f7e34c09ff9247998281b622a'
    ),
    WithdrawFund: new LogEvent<([user: string, token: string, amountOut: bigint, timestamp: bigint] & {user: string, token: string, amountOut: bigint, timestamp: bigint})>(
        abi, '0xa820b63c87193288cc94a3f317ea876d89c6dd3f158665fad57874409e75a8bc'
    ),
}

export const functions = {
    ID: new Func<[], {}, bigint>(
        abi, '0xb3cea217'
    ),
    _init: new Func<[_tc: ([entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})] & {entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})})], {_tc: ([entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})] & {entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})})}, boolean>(
        abi, '0x1f2a4ba8'
    ),
    claimOwnerFee: new Func<[to: string], {to: string}, []>(
        abi, '0x3a3bdf56'
    ),
    claimPrize: new Func<[to: string], {to: string}, []>(
        abi, '0xe5e9b661'
    ),
    claimable: new Func<[who: string], {who: string}, ([amount: bigint, token: string] & {amount: bigint, token: string})>(
        abi, '0x402914f5'
    ),
    deposit: new Func<[amount: bigint], {amount: bigint}, []>(
        abi, '0xb6b55f25'
    ),
    getPNLOf: new Func<[who: string], {who: string}, bigint>(
        abi, '0x31fcc683'
    ),
    increasePrize: new Func<[amount: bigint], {amount: bigint}, []>(
        abi, '0x8bd03dcf'
    ),
    init: new Func<[], {}, boolean>(
        abi, '0xe1c7392a'
    ),
    isRegistered: new Func<[_who: string], {_who: string}, boolean>(
        abi, '0xc3c5a547'
    ),
    isWinner: new Func<[who: string], {who: string}, ([answer: boolean, placement: bigint] & {answer: boolean, placement: bigint})>(
        abi, '0x9d9ca28d'
    ),
    manager: new Func<[], {}, string>(
        abi, '0x481c6a75'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    register: new Func<[], {}, []>(
        abi, '0x1aa3a008'
    ),
    registerAndDeposit: new Func<[amount: bigint], {amount: bigint}, []>(
        abi, '0xada6afa4'
    ),
    swap: new Func<[caller: string, desc: ([srcToken: string, dstToken: string, srcReceiver: string, dstReceiver: string, amount: bigint, minReturnAmount: bigint, guaranteedAmount: bigint, flags: bigint, referrer: string, permit: string] & {srcToken: string, dstToken: string, srcReceiver: string, dstReceiver: string, amount: bigint, minReturnAmount: bigint, guaranteedAmount: bigint, flags: bigint, referrer: string, permit: string}), calls: Array<([target: bigint, gasLimit: bigint, value: bigint, data: string] & {target: bigint, gasLimit: bigint, value: bigint, data: string})>], {caller: string, desc: ([srcToken: string, dstToken: string, srcReceiver: string, dstReceiver: string, amount: bigint, minReturnAmount: bigint, guaranteedAmount: bigint, flags: bigint, referrer: string, permit: string] & {srcToken: string, dstToken: string, srcReceiver: string, dstReceiver: string, amount: bigint, minReturnAmount: bigint, guaranteedAmount: bigint, flags: bigint, referrer: string, permit: string}), calls: Array<([target: bigint, gasLimit: bigint, value: bigint, data: string] & {target: bigint, gasLimit: bigint, value: bigint, data: string})>}, bigint>(
        abi, '0x90411a32'
    ),
    timestamp: new Func<[], {}, ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint})>(
        abi, '0xb80777ea'
    ),
    tradingCompetition: new Func<[], {}, ([entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})] & {entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})})>(
        abi, '0x0ddd6fc8'
    ),
    tradingTokens: new Func<[], {}, Array<string>>(
        abi, '0x58f9d888'
    ),
    user: new Func<[_who: string], {_who: string}, ([startBalance: bigint, tokenBalance: Array<bigint>] & {startBalance: bigint, tokenBalance: Array<bigint>})>(
        abi, '0x81e7e20e'
    ),
    userBalance: new Func<[who: string], {who: string}, ([amounts: Array<bigint>, tokens: Array<string>] & {amounts: Array<bigint>, tokens: Array<string>})>(
        abi, '0x0103c92b'
    ),
    users: new Func<[], {}, Array<string>>(
        abi, '0xf2020275'
    ),
    winnersList: new Func<[_: bigint], {}, string>(
        abi, '0x23c674d4'
    ),
    withdrawAllFunds: new Func<[], {}, []>(
        abi, '0x49649fbf'
    ),
    withdrawFunds: new Func<[_token: string, _amount: bigint], {_token: string, _amount: bigint}, []>(
        abi, '0xc1075329'
    ),
}

export class Contract extends ContractBase {

    ID(): Promise<bigint> {
        return this.eth_call(functions.ID, [])
    }

    claimable(who: string): Promise<([amount: bigint, token: string] & {amount: bigint, token: string})> {
        return this.eth_call(functions.claimable, [who])
    }

    getPNLOf(who: string): Promise<bigint> {
        return this.eth_call(functions.getPNLOf, [who])
    }

    init(): Promise<boolean> {
        return this.eth_call(functions.init, [])
    }

    isRegistered(_who: string): Promise<boolean> {
        return this.eth_call(functions.isRegistered, [_who])
    }

    isWinner(who: string): Promise<([answer: boolean, placement: bigint] & {answer: boolean, placement: bigint})> {
        return this.eth_call(functions.isWinner, [who])
    }

    manager(): Promise<string> {
        return this.eth_call(functions.manager, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    timestamp(): Promise<([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint})> {
        return this.eth_call(functions.timestamp, [])
    }

    tradingCompetition(): Promise<([entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})] & {entryFee: bigint, MAX_PARTICIPANTS: bigint, owner: string, tradingCompetition: string, name: string, description: string, timestamp: ([startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint] & {startTimestamp: bigint, endTimestamp: bigint, registrationStart: bigint, registrationEnd: bigint}), market: number, prize: ([win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint] & {win_type: boolean, weights: Array<bigint>, totalPrize: bigint, owner_fee: bigint, token: string, host_contribution: bigint}), competitionRules: ([starting_balance: bigint, winning_token: string, tradingTokens: Array<string>] & {starting_balance: bigint, winning_token: string, tradingTokens: Array<string>})})> {
        return this.eth_call(functions.tradingCompetition, [])
    }

    tradingTokens(): Promise<Array<string>> {
        return this.eth_call(functions.tradingTokens, [])
    }

    user(_who: string): Promise<([startBalance: bigint, tokenBalance: Array<bigint>] & {startBalance: bigint, tokenBalance: Array<bigint>})> {
        return this.eth_call(functions.user, [_who])
    }

    userBalance(who: string): Promise<([amounts: Array<bigint>, tokens: Array<string>] & {amounts: Array<bigint>, tokens: Array<string>})> {
        return this.eth_call(functions.userBalance, [who])
    }

    users(): Promise<Array<string>> {
        return this.eth_call(functions.users, [])
    }

    winnersList(arg0: bigint): Promise<string> {
        return this.eth_call(functions.winnersList, [arg0])
    }
}
