import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './thenianNft.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, approved: string, tokenId: bigint] & {owner: string, approved: string, tokenId: bigint})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    ApprovalForAll: new LogEvent<([owner: string, operator: string, approved: boolean] & {owner: string, operator: string, approved: boolean})>(
        abi, '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    Transfer: new LogEvent<([from: string, to: string, tokenId: bigint] & {from: string, to: string, tokenId: bigint})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
}

export const functions = {
    MAX_PER_MINT: new Func<[], {}, bigint>(
        abi, '0x09d42b30'
    ),
    MAX_RESERVE: new Func<[], {}, bigint>(
        abi, '0xeff31e9e'
    ),
    MAX_SUPPLY: new Func<[], {}, bigint>(
        abi, '0x32cb6b0c'
    ),
    NFT_PRICE: new Func<[], {}, bigint>(
        abi, '0x676dd563'
    ),
    SALE_START_TIMESTAMP: new Func<[], {}, bigint>(
        abi, '0x946807fd'
    ),
    approve: new Func<[to: string, tokenId: bigint], {to: string, tokenId: bigint}, []>(
        abi, '0x095ea7b3'
    ),
    balanceOf: new Func<[owner: string], {owner: string}, bigint>(
        abi, '0x70a08231'
    ),
    baseURI: new Func<[], {}, string>(
        abi, '0x6c0360eb'
    ),
    firstMint: new Func<[_: string], {}, boolean>(
        abi, '0x05afb3a4'
    ),
    getApproved: new Func<[tokenId: bigint], {tokenId: bigint}, string>(
        abi, '0x081812fc'
    ),
    isApprovedForAll: new Func<[owner: string, operator: string], {owner: string, operator: string}, boolean>(
        abi, '0xe985e9c5'
    ),
    mintFirst: new Func<[proof: Array<string>], {proof: Array<string>}, []>(
        abi, '0x8afbc96b'
    ),
    mintPublic: new Func<[amount: bigint], {amount: bigint}, []>(
        abi, '0xefd0cbf9'
    ),
    mintSecond: new Func<[amount: bigint, proof: Array<string>], {amount: bigint, proof: Array<string>}, []>(
        abi, '0xa16c31fc'
    ),
    multiSig: new Func<[], {}, string>(
        abi, '0x36e0004a'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    originalMinters: new Func<[_: string], {}, bigint>(
        abi, '0xd113d59d'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    ownerOf: new Func<[tokenId: bigint], {tokenId: bigint}, string>(
        abi, '0x6352211e'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    reserveNFTs: new Func<[_to: string, _amount: bigint], {_to: string, _amount: bigint}, []>(
        abi, '0x70a8de86'
    ),
    reservedAmount: new Func<[], {}, bigint>(
        abi, '0xf92c45b7'
    ),
    root: new Func<[], {}, string>(
        abi, '0xebf0c717'
    ),
    'safeTransferFrom(address,address,uint256)': new Func<[from: string, to: string, tokenId: bigint], {from: string, to: string, tokenId: bigint}, []>(
        abi, '0x42842e0e'
    ),
    'safeTransferFrom(address,address,uint256,bytes)': new Func<[from: string, to: string, tokenId: bigint, data: string], {from: string, to: string, tokenId: bigint, data: string}, []>(
        abi, '0xb88d4fde'
    ),
    secondMint: new Func<[_: string], {}, bigint>(
        abi, '0x83ea85d7'
    ),
    setApprovalForAll: new Func<[operator: string, approved: boolean], {operator: string, approved: boolean}, []>(
        abi, '0xa22cb465'
    ),
    setBaseURI: new Func<[baseURI_: string], {baseURI_: string}, []>(
        abi, '0x55f804b3'
    ),
    setNftPrice: new Func<[_nftPrice: bigint], {_nftPrice: bigint}, []>(
        abi, '0x7d9a7a4c'
    ),
    setRoot: new Func<[_root: string], {_root: string}, []>(
        abi, '0xdab5f340'
    ),
    supportsInterface: new Func<[interfaceId: string], {interfaceId: string}, boolean>(
        abi, '0x01ffc9a7'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    tokenByIndex: new Func<[index: bigint], {index: bigint}, bigint>(
        abi, '0x4f6ccce7'
    ),
    tokenOfOwnerByIndex: new Func<[owner: string, index: bigint], {owner: string, index: bigint}, bigint>(
        abi, '0x2f745c59'
    ),
    tokenURI: new Func<[tokenId: bigint], {tokenId: bigint}, string>(
        abi, '0xc87b56dd'
    ),
    tokensOfOwner: new Func<[_owner: string], {_owner: string}, Array<bigint>>(
        abi, '0x8462151c'
    ),
    totalSupply: new Func<[], {}, bigint>(
        abi, '0x18160ddd'
    ),
    transferFrom: new Func<[from: string, to: string, tokenId: bigint], {from: string, to: string, tokenId: bigint}, []>(
        abi, '0x23b872dd'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    withdraw: new Func<[], {}, []>(
        abi, '0x3ccfd60b'
    ),
}

export class Contract extends ContractBase {

    MAX_PER_MINT(): Promise<bigint> {
        return this.eth_call(functions.MAX_PER_MINT, [])
    }

    MAX_RESERVE(): Promise<bigint> {
        return this.eth_call(functions.MAX_RESERVE, [])
    }

    MAX_SUPPLY(): Promise<bigint> {
        return this.eth_call(functions.MAX_SUPPLY, [])
    }

    NFT_PRICE(): Promise<bigint> {
        return this.eth_call(functions.NFT_PRICE, [])
    }

    SALE_START_TIMESTAMP(): Promise<bigint> {
        return this.eth_call(functions.SALE_START_TIMESTAMP, [])
    }

    balanceOf(owner: string): Promise<bigint> {
        return this.eth_call(functions.balanceOf, [owner])
    }

    baseURI(): Promise<string> {
        return this.eth_call(functions.baseURI, [])
    }

    firstMint(arg0: string): Promise<boolean> {
        return this.eth_call(functions.firstMint, [arg0])
    }

    getApproved(tokenId: bigint): Promise<string> {
        return this.eth_call(functions.getApproved, [tokenId])
    }

    isApprovedForAll(owner: string, operator: string): Promise<boolean> {
        return this.eth_call(functions.isApprovedForAll, [owner, operator])
    }

    multiSig(): Promise<string> {
        return this.eth_call(functions.multiSig, [])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    originalMinters(arg0: string): Promise<bigint> {
        return this.eth_call(functions.originalMinters, [arg0])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    ownerOf(tokenId: bigint): Promise<string> {
        return this.eth_call(functions.ownerOf, [tokenId])
    }

    reservedAmount(): Promise<bigint> {
        return this.eth_call(functions.reservedAmount, [])
    }

    root(): Promise<string> {
        return this.eth_call(functions.root, [])
    }

    secondMint(arg0: string): Promise<bigint> {
        return this.eth_call(functions.secondMint, [arg0])
    }

    supportsInterface(interfaceId: string): Promise<boolean> {
        return this.eth_call(functions.supportsInterface, [interfaceId])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    tokenByIndex(index: bigint): Promise<bigint> {
        return this.eth_call(functions.tokenByIndex, [index])
    }

    tokenOfOwnerByIndex(owner: string, index: bigint): Promise<bigint> {
        return this.eth_call(functions.tokenOfOwnerByIndex, [owner, index])
    }

    tokenURI(tokenId: bigint): Promise<string> {
        return this.eth_call(functions.tokenURI, [tokenId])
    }

    tokensOfOwner(_owner: string): Promise<Array<bigint>> {
        return this.eth_call(functions.tokensOfOwner, [_owner])
    }

    totalSupply(): Promise<bigint> {
        return this.eth_call(functions.totalSupply, [])
    }
}
