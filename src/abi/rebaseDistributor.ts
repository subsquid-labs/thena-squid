import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './rebaseDistributor.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    CheckpointToken: new LogEvent<([time: bigint, tokens: bigint] & {time: bigint, tokens: bigint})>(
        abi, '0xce749457b74e10f393f2c6b1ce4261b78791376db5a3f501477a809f03f500d6'
    ),
    Claimed: new LogEvent<([tokenId: bigint, amount: bigint, claim_epoch: bigint, max_epoch: bigint] & {tokenId: bigint, amount: bigint, claim_epoch: bigint, max_epoch: bigint})>(
        abi, '0xcae2990aa9af8eb1c64713b7eddb3a80bf18e49a94a13fe0d0002b5d61d58f00'
    ),
}

export const functions = {
    checkpoint_token: new Func<[], {}, []>(
        abi, '0x811a40fe'
    ),
    checkpoint_total_supply: new Func<[], {}, []>(
        abi, '0xb21ed502'
    ),
    claim: new Func<[_tokenId: bigint], {_tokenId: bigint}, bigint>(
        abi, '0x379607f5'
    ),
    claim_many: new Func<[_tokenIds: Array<bigint>], {_tokenIds: Array<bigint>}, boolean>(
        abi, '0x1f1db043'
    ),
    claimable: new Func<[_tokenId: bigint], {_tokenId: bigint}, bigint>(
        abi, '0xd1d58b25'
    ),
    depositor: new Func<[], {}, string>(
        abi, '0xc7c4ff46'
    ),
    last_token_time: new Func<[], {}, bigint>(
        abi, '0x7f58e8f8'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    setDepositor: new Func<[_depositor: string], {_depositor: string}, []>(
        abi, '0xf2c098b7'
    ),
    setOwner: new Func<[_owner: string], {_owner: string}, []>(
        abi, '0x13af4035'
    ),
    start_time: new Func<[], {}, bigint>(
        abi, '0x834ee417'
    ),
    time_cursor: new Func<[], {}, bigint>(
        abi, '0x127dcbd3'
    ),
    time_cursor_of: new Func<[_: bigint], {}, bigint>(
        abi, '0x486d25fe'
    ),
    timestamp: new Func<[], {}, bigint>(
        abi, '0xb80777ea'
    ),
    token: new Func<[], {}, string>(
        abi, '0xfc0c546a'
    ),
    token_last_balance: new Func<[], {}, bigint>(
        abi, '0x22b04bfc'
    ),
    tokens_per_week: new Func<[_: bigint], {}, bigint>(
        abi, '0xedf59997'
    ),
    user_epoch_of: new Func<[_: bigint], {}, bigint>(
        abi, '0x16aea5c0'
    ),
    ve_for_at: new Func<[_tokenId: bigint, _timestamp: bigint], {_tokenId: bigint, _timestamp: bigint}, bigint>(
        abi, '0x68809889'
    ),
    ve_supply: new Func<[_: bigint], {}, bigint>(
        abi, '0xd4dafba8'
    ),
    voting_escrow: new Func<[], {}, string>(
        abi, '0xdfe05031'
    ),
}

export class Contract extends ContractBase {

    claimable(_tokenId: bigint): Promise<bigint> {
        return this.eth_call(functions.claimable, [_tokenId])
    }

    depositor(): Promise<string> {
        return this.eth_call(functions.depositor, [])
    }

    last_token_time(): Promise<bigint> {
        return this.eth_call(functions.last_token_time, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    start_time(): Promise<bigint> {
        return this.eth_call(functions.start_time, [])
    }

    time_cursor(): Promise<bigint> {
        return this.eth_call(functions.time_cursor, [])
    }

    time_cursor_of(arg0: bigint): Promise<bigint> {
        return this.eth_call(functions.time_cursor_of, [arg0])
    }

    timestamp(): Promise<bigint> {
        return this.eth_call(functions.timestamp, [])
    }

    token(): Promise<string> {
        return this.eth_call(functions.token, [])
    }

    token_last_balance(): Promise<bigint> {
        return this.eth_call(functions.token_last_balance, [])
    }

    tokens_per_week(arg0: bigint): Promise<bigint> {
        return this.eth_call(functions.tokens_per_week, [arg0])
    }

    user_epoch_of(arg0: bigint): Promise<bigint> {
        return this.eth_call(functions.user_epoch_of, [arg0])
    }

    ve_for_at(_tokenId: bigint, _timestamp: bigint): Promise<bigint> {
        return this.eth_call(functions.ve_for_at, [_tokenId, _timestamp])
    }

    ve_supply(arg0: bigint): Promise<bigint> {
        return this.eth_call(functions.ve_supply, [arg0])
    }

    voting_escrow(): Promise<string> {
        return this.eth_call(functions.voting_escrow, [])
    }
}
