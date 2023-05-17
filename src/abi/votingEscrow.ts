import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './votingEscrow.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, approved: string, tokenId: bigint] & {owner: string, approved: string, tokenId: bigint})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    ApprovalForAll: new LogEvent<([owner: string, operator: string, approved: boolean] & {owner: string, operator: string, approved: boolean})>(
        abi, '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31'
    ),
    DelegateChanged: new LogEvent<([delegator: string, fromDelegate: string, toDelegate: string] & {delegator: string, fromDelegate: string, toDelegate: string})>(
        abi, '0x3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f'
    ),
    DelegateVotesChanged: new LogEvent<([delegate: string, previousBalance: bigint, newBalance: bigint] & {delegate: string, previousBalance: bigint, newBalance: bigint})>(
        abi, '0xdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724'
    ),
    Deposit: new LogEvent<([provider: string, tokenId: bigint, value: bigint, locktime: bigint, deposit_type: number, ts: bigint] & {provider: string, tokenId: bigint, value: bigint, locktime: bigint, deposit_type: number, ts: bigint})>(
        abi, '0xff04ccafc360e16b67d682d17bd9503c4c6b9a131f6be6325762dc9ffc7de624'
    ),
    Supply: new LogEvent<([prevSupply: bigint, supply: bigint] & {prevSupply: bigint, supply: bigint})>(
        abi, '0x5e2aa66efd74cce82b21852e317e5490d9ecc9e6bb953ae24d90851258cc2f5c'
    ),
    Transfer: new LogEvent<([from: string, to: string, tokenId: bigint] & {from: string, to: string, tokenId: bigint})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
    Withdraw: new LogEvent<([provider: string, tokenId: bigint, value: bigint, ts: bigint] & {provider: string, tokenId: bigint, value: bigint, ts: bigint})>(
        abi, '0x02f25270a4d87bea75db541cdfe559334a275b4a233520ed6c0a2429667cca94'
    ),
}

export const functions = {
    DELEGATION_TYPEHASH: new Func<[], {}, string>(
        abi, '0xe7a324dc'
    ),
    DOMAIN_TYPEHASH: new Func<[], {}, string>(
        abi, '0x20606b70'
    ),
    MAX_DELEGATES: new Func<[], {}, bigint>(
        abi, '0x5f5b0c32'
    ),
    abstain: new Func<[_tokenId: bigint], {_tokenId: bigint}, []>(
        abi, '0xc1f0fb9f'
    ),
    approve: new Func<[_approved: string, _tokenId: bigint], {_approved: string, _tokenId: bigint}, []>(
        abi, '0x095ea7b3'
    ),
    artProxy: new Func<[], {}, string>(
        abi, '0x5594a045'
    ),
    attach: new Func<[_tokenId: bigint], {_tokenId: bigint}, []>(
        abi, '0xfbd3a29d'
    ),
    attachments: new Func<[_: bigint], {}, bigint>(
        abi, '0x0d6a2033'
    ),
    balanceOf: new Func<[_owner: string], {_owner: string}, bigint>(
        abi, '0x70a08231'
    ),
    balanceOfAtNFT: new Func<[_tokenId: bigint, _block: bigint], {_tokenId: bigint, _block: bigint}, bigint>(
        abi, '0x8c2c9baf'
    ),
    balanceOfNFT: new Func<[_tokenId: bigint], {_tokenId: bigint}, bigint>(
        abi, '0xe7e242d4'
    ),
    balanceOfNFTAt: new Func<[_tokenId: bigint, _t: bigint], {_tokenId: bigint, _t: bigint}, bigint>(
        abi, '0xe0514aba'
    ),
    block_number: new Func<[], {}, bigint>(
        abi, '0x25a58b56'
    ),
    checkpoint: new Func<[], {}, []>(
        abi, '0xc2c4c5c1'
    ),
    checkpoints: new Func<[_: string, _: number], {}, bigint>(
        abi, '0xf1127ed8'
    ),
    create_lock: new Func<[_value: bigint, _lock_duration: bigint], {_value: bigint, _lock_duration: bigint}, bigint>(
        abi, '0x65fc3873'
    ),
    create_lock_for: new Func<[_value: bigint, _lock_duration: bigint, _to: string], {_value: bigint, _lock_duration: bigint, _to: string}, bigint>(
        abi, '0xd4e54c3b'
    ),
    decimals: new Func<[], {}, number>(
        abi, '0x313ce567'
    ),
    delegate: new Func<[delegatee: string], {delegatee: string}, []>(
        abi, '0x5c19a95c'
    ),
    delegateBySig: new Func<[delegatee: string, nonce: bigint, expiry: bigint, v: number, r: string, s: string], {delegatee: string, nonce: bigint, expiry: bigint, v: number, r: string, s: string}, []>(
        abi, '0xc3cda520'
    ),
    delegates: new Func<[delegator: string], {delegator: string}, string>(
        abi, '0x587cde1e'
    ),
    deposit_for: new Func<[_tokenId: bigint, _value: bigint], {_tokenId: bigint, _value: bigint}, []>(
        abi, '0xee99fe28'
    ),
    detach: new Func<[_tokenId: bigint], {_tokenId: bigint}, []>(
        abi, '0x986b7d8a'
    ),
    epoch: new Func<[], {}, bigint>(
        abi, '0x900cf0cf'
    ),
    getApproved: new Func<[_tokenId: bigint], {_tokenId: bigint}, string>(
        abi, '0x081812fc'
    ),
    getPastTotalSupply: new Func<[timestamp: bigint], {timestamp: bigint}, bigint>(
        abi, '0x8e539e8c'
    ),
    getPastVotes: new Func<[account: string, timestamp: bigint], {account: string, timestamp: bigint}, bigint>(
        abi, '0x3a46b1a8'
    ),
    getPastVotesIndex: new Func<[account: string, timestamp: bigint], {account: string, timestamp: bigint}, number>(
        abi, '0x0758c7d8'
    ),
    getVotes: new Func<[account: string], {account: string}, bigint>(
        abi, '0x9ab24eb0'
    ),
    get_last_user_slope: new Func<[_tokenId: bigint], {_tokenId: bigint}, bigint>(
        abi, '0x461f711c'
    ),
    increase_amount: new Func<[_tokenId: bigint, _value: bigint], {_tokenId: bigint, _value: bigint}, []>(
        abi, '0xa183af52'
    ),
    increase_unlock_time: new Func<[_tokenId: bigint, _lock_duration: bigint], {_tokenId: bigint, _lock_duration: bigint}, []>(
        abi, '0xa4d855df'
    ),
    isApprovedForAll: new Func<[_owner: string, _operator: string], {_owner: string, _operator: string}, boolean>(
        abi, '0xe985e9c5'
    ),
    isApprovedOrOwner: new Func<[_spender: string, _tokenId: bigint], {_spender: string, _tokenId: bigint}, boolean>(
        abi, '0x430c2081'
    ),
    locked: new Func<[_: bigint], {}, ([amount: bigint, end: bigint] & {amount: bigint, end: bigint})>(
        abi, '0xb45a3c0e'
    ),
    locked__end: new Func<[_tokenId: bigint], {_tokenId: bigint}, bigint>(
        abi, '0xf8a05763'
    ),
    merge: new Func<[_from: bigint, _to: bigint], {_from: bigint, _to: bigint}, []>(
        abi, '0xd1c2babb'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    nonces: new Func<[_: string], {}, bigint>(
        abi, '0x7ecebe00'
    ),
    numCheckpoints: new Func<[_: string], {}, number>(
        abi, '0x6fcfff45'
    ),
    ownerOf: new Func<[_tokenId: bigint], {_tokenId: bigint}, string>(
        abi, '0x6352211e'
    ),
    ownership_change: new Func<[_: bigint], {}, bigint>(
        abi, '0x6f548837'
    ),
    point_history: new Func<[_: bigint], {}, ([bias: bigint, slope: bigint, ts: bigint, blk: bigint] & {bias: bigint, slope: bigint, ts: bigint, blk: bigint})>(
        abi, '0xd1febfb9'
    ),
    'safeTransferFrom(address,address,uint256)': new Func<[_from: string, _to: string, _tokenId: bigint], {_from: string, _to: string, _tokenId: bigint}, []>(
        abi, '0x42842e0e'
    ),
    'safeTransferFrom(address,address,uint256,bytes)': new Func<[_from: string, _to: string, _tokenId: bigint, _data: string], {_from: string, _to: string, _tokenId: bigint, _data: string}, []>(
        abi, '0xb88d4fde'
    ),
    setApprovalForAll: new Func<[_operator: string, _approved: boolean], {_operator: string, _approved: boolean}, []>(
        abi, '0xa22cb465'
    ),
    setArtProxy: new Func<[_proxy: string], {_proxy: string}, []>(
        abi, '0x2e720f7d'
    ),
    setTeam: new Func<[_team: string], {_team: string}, []>(
        abi, '0x095cf5c6'
    ),
    setVoter: new Func<[_voter: string], {_voter: string}, []>(
        abi, '0x4bc2a657'
    ),
    slope_changes: new Func<[_: bigint], {}, bigint>(
        abi, '0x71197484'
    ),
    split: new Func<[amounts: Array<bigint>, _tokenId: bigint], {amounts: Array<bigint>, _tokenId: bigint}, []>(
        abi, '0x56afe744'
    ),
    supply: new Func<[], {}, bigint>(
        abi, '0x047fc9aa'
    ),
    supportsInterface: new Func<[_interfaceID: string], {_interfaceID: string}, boolean>(
        abi, '0x01ffc9a7'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    team: new Func<[], {}, string>(
        abi, '0x85f2aef2'
    ),
    token: new Func<[], {}, string>(
        abi, '0xfc0c546a'
    ),
    tokenOfOwnerByIndex: new Func<[_owner: string, _tokenIndex: bigint], {_owner: string, _tokenIndex: bigint}, bigint>(
        abi, '0x2f745c59'
    ),
    tokenURI: new Func<[_tokenId: bigint], {_tokenId: bigint}, string>(
        abi, '0xc87b56dd'
    ),
    totalSupply: new Func<[], {}, bigint>(
        abi, '0x18160ddd'
    ),
    totalSupplyAt: new Func<[_block: bigint], {_block: bigint}, bigint>(
        abi, '0x981b24d0'
    ),
    totalSupplyAtT: new Func<[t: bigint], {t: bigint}, bigint>(
        abi, '0x7116c60c'
    ),
    transferFrom: new Func<[_from: string, _to: string, _tokenId: bigint], {_from: string, _to: string, _tokenId: bigint}, []>(
        abi, '0x23b872dd'
    ),
    user_point_epoch: new Func<[_: bigint], {}, bigint>(
        abi, '0xe441135c'
    ),
    user_point_history: new Func<[_: bigint, _: bigint], {}, ([bias: bigint, slope: bigint, ts: bigint, blk: bigint] & {bias: bigint, slope: bigint, ts: bigint, blk: bigint})>(
        abi, '0x1376f3da'
    ),
    user_point_history__ts: new Func<[_tokenId: bigint, _idx: bigint], {_tokenId: bigint, _idx: bigint}, bigint>(
        abi, '0x1c984bc3'
    ),
    version: new Func<[], {}, string>(
        abi, '0x54fd4d50'
    ),
    voted: new Func<[_: bigint], {}, boolean>(
        abi, '0x8fbb38ff'
    ),
    voter: new Func<[], {}, string>(
        abi, '0x46c96aac'
    ),
    voting: new Func<[_tokenId: bigint], {_tokenId: bigint}, []>(
        abi, '0xfd4a77f1'
    ),
    withdraw: new Func<[_tokenId: bigint], {_tokenId: bigint}, []>(
        abi, '0x2e1a7d4d'
    ),
}

export class Contract extends ContractBase {

    DELEGATION_TYPEHASH(): Promise<string> {
        return this.eth_call(functions.DELEGATION_TYPEHASH, [])
    }

    DOMAIN_TYPEHASH(): Promise<string> {
        return this.eth_call(functions.DOMAIN_TYPEHASH, [])
    }

    MAX_DELEGATES(): Promise<bigint> {
        return this.eth_call(functions.MAX_DELEGATES, [])
    }

    artProxy(): Promise<string> {
        return this.eth_call(functions.artProxy, [])
    }

    attachments(arg0: bigint): Promise<bigint> {
        return this.eth_call(functions.attachments, [arg0])
    }

    balanceOf(_owner: string): Promise<bigint> {
        return this.eth_call(functions.balanceOf, [_owner])
    }

    balanceOfAtNFT(_tokenId: bigint, _block: bigint): Promise<bigint> {
        return this.eth_call(functions.balanceOfAtNFT, [_tokenId, _block])
    }

    balanceOfNFT(_tokenId: bigint): Promise<bigint> {
        return this.eth_call(functions.balanceOfNFT, [_tokenId])
    }

    balanceOfNFTAt(_tokenId: bigint, _t: bigint): Promise<bigint> {
        return this.eth_call(functions.balanceOfNFTAt, [_tokenId, _t])
    }

    block_number(): Promise<bigint> {
        return this.eth_call(functions.block_number, [])
    }

    checkpoints(arg0: string, arg1: number): Promise<bigint> {
        return this.eth_call(functions.checkpoints, [arg0, arg1])
    }

    decimals(): Promise<number> {
        return this.eth_call(functions.decimals, [])
    }

    delegates(delegator: string): Promise<string> {
        return this.eth_call(functions.delegates, [delegator])
    }

    epoch(): Promise<bigint> {
        return this.eth_call(functions.epoch, [])
    }

    getApproved(_tokenId: bigint): Promise<string> {
        return this.eth_call(functions.getApproved, [_tokenId])
    }

    getPastTotalSupply(timestamp: bigint): Promise<bigint> {
        return this.eth_call(functions.getPastTotalSupply, [timestamp])
    }

    getPastVotes(account: string, timestamp: bigint): Promise<bigint> {
        return this.eth_call(functions.getPastVotes, [account, timestamp])
    }

    getPastVotesIndex(account: string, timestamp: bigint): Promise<number> {
        return this.eth_call(functions.getPastVotesIndex, [account, timestamp])
    }

    getVotes(account: string): Promise<bigint> {
        return this.eth_call(functions.getVotes, [account])
    }

    get_last_user_slope(_tokenId: bigint): Promise<bigint> {
        return this.eth_call(functions.get_last_user_slope, [_tokenId])
    }

    isApprovedForAll(_owner: string, _operator: string): Promise<boolean> {
        return this.eth_call(functions.isApprovedForAll, [_owner, _operator])
    }

    isApprovedOrOwner(_spender: string, _tokenId: bigint): Promise<boolean> {
        return this.eth_call(functions.isApprovedOrOwner, [_spender, _tokenId])
    }

    locked(arg0: bigint): Promise<([amount: bigint, end: bigint] & {amount: bigint, end: bigint})> {
        return this.eth_call(functions.locked, [arg0])
    }

    locked__end(_tokenId: bigint): Promise<bigint> {
        return this.eth_call(functions.locked__end, [_tokenId])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    nonces(arg0: string): Promise<bigint> {
        return this.eth_call(functions.nonces, [arg0])
    }

    numCheckpoints(arg0: string): Promise<number> {
        return this.eth_call(functions.numCheckpoints, [arg0])
    }

    ownerOf(_tokenId: bigint): Promise<string> {
        return this.eth_call(functions.ownerOf, [_tokenId])
    }

    ownership_change(arg0: bigint): Promise<bigint> {
        return this.eth_call(functions.ownership_change, [arg0])
    }

    point_history(arg0: bigint): Promise<([bias: bigint, slope: bigint, ts: bigint, blk: bigint] & {bias: bigint, slope: bigint, ts: bigint, blk: bigint})> {
        return this.eth_call(functions.point_history, [arg0])
    }

    slope_changes(arg0: bigint): Promise<bigint> {
        return this.eth_call(functions.slope_changes, [arg0])
    }

    supply(): Promise<bigint> {
        return this.eth_call(functions.supply, [])
    }

    supportsInterface(_interfaceID: string): Promise<boolean> {
        return this.eth_call(functions.supportsInterface, [_interfaceID])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    team(): Promise<string> {
        return this.eth_call(functions.team, [])
    }

    token(): Promise<string> {
        return this.eth_call(functions.token, [])
    }

    tokenOfOwnerByIndex(_owner: string, _tokenIndex: bigint): Promise<bigint> {
        return this.eth_call(functions.tokenOfOwnerByIndex, [_owner, _tokenIndex])
    }

    tokenURI(_tokenId: bigint): Promise<string> {
        return this.eth_call(functions.tokenURI, [_tokenId])
    }

    totalSupply(): Promise<bigint> {
        return this.eth_call(functions.totalSupply, [])
    }

    totalSupplyAt(_block: bigint): Promise<bigint> {
        return this.eth_call(functions.totalSupplyAt, [_block])
    }

    totalSupplyAtT(t: bigint): Promise<bigint> {
        return this.eth_call(functions.totalSupplyAtT, [t])
    }

    user_point_epoch(arg0: bigint): Promise<bigint> {
        return this.eth_call(functions.user_point_epoch, [arg0])
    }

    user_point_history(arg0: bigint, arg1: bigint): Promise<([bias: bigint, slope: bigint, ts: bigint, blk: bigint] & {bias: bigint, slope: bigint, ts: bigint, blk: bigint})> {
        return this.eth_call(functions.user_point_history, [arg0, arg1])
    }

    user_point_history__ts(_tokenId: bigint, _idx: bigint): Promise<bigint> {
        return this.eth_call(functions.user_point_history__ts, [_tokenId, _idx])
    }

    version(): Promise<string> {
        return this.eth_call(functions.version, [])
    }

    voted(arg0: bigint): Promise<boolean> {
        return this.eth_call(functions.voted, [arg0])
    }

    voter(): Promise<string> {
        return this.eth_call(functions.voter, [])
    }
}
