import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './usernameNft.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, approved: string, tokenId: bigint] & {owner: string, approved: string, tokenId: bigint})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    ApprovalForAll: new LogEvent<([owner: string, operator: string, approved: boolean] & {owner: string, operator: string, approved: boolean})>(
        abi, '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31'
    ),
    ArtProxyUpdated: new LogEvent<([oldArtProxy: string, newArtProxy: string] & {oldArtProxy: string, newArtProxy: string})>(
        abi, '0xbd012c7a727960e1ce9737f23a96ac31aecb2024db9ebf04b626eef5c611a19c'
    ),
    BatchMetadataUpdate: new LogEvent<([_fromTokenId: bigint, _toTokenId: bigint] & {_fromTokenId: bigint, _toTokenId: bigint})>(
        abi, '0x6bd5c950a8d8df17f772f5af37cb3655737899cbf903264b9795592da439661c'
    ),
    CostsSet: new LogEvent<([token: string, costs: Array<bigint>] & {token: string, costs: Array<bigint>})>(
        abi, '0x4ad52a2238e0334e9b060cd9294496ccfc30941558f8b3e5efed03bc244bc697'
    ),
    EmojiUtilsUpdated: new LogEvent<([emojIUtils: string, newEmojiUtils: string] & {emojIUtils: string, newEmojiUtils: string})>(
        abi, '0x8e0474ca62d2fdcb553f2a3552c3df0e18dd39bb3e55fe8af6c1e540d634b354'
    ),
    ForbiddenCharAdded: new LogEvent<([s: string] & {s: string})>(
        abi, '0xeea2db653a097b680e5cff7a7489125b0cebc8606c48ff2b6e99df0059f2e037'
    ),
    ForbiddenCharRemoved: new LogEvent<([s: string] & {s: string})>(
        abi, '0xce041c5837576a620e2aaef63db0c9439be58dcf6fe53b027626eed31a8fb043'
    ),
    MaxLengthSet: new LogEvent<([newMaxLength: bigint] & {newMaxLength: bigint})>(
        abi, '0xa9fc8fa068aa625926a4986bebfffd55ab24dc196e47766403a0ca92dd2ff2ba'
    ),
    MetadataUpdate: new LogEvent<([tokenId: bigint] & {tokenId: bigint})>(
        abi, '0xf8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce7'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    PaymentTokenAdded: new LogEvent<([token: string] & {token: string})>(
        abi, '0xa317c10673baf4f03b3c1041bd5ddbb537d0333a86fec3607c75f9dbb630f48f'
    ),
    PaymentTokenRemoved: new LogEvent<([token: string] & {token: string})>(
        abi, '0x85a3e72f8dd6db3794f93109c3c5f5b79d6112f6979431c45f98b26134b42af2'
    ),
    TokensWithdrawn: new LogEvent<([token: string, recipient: string, amount: bigint] & {token: string, recipient: string, amount: bigint})>(
        abi, '0x6337ed398c0e8467698c581374fdce4db14922df487b5a39483079f5f59b60a4'
    ),
    TraitAdded: new LogEvent<([traitCheckerContract: string, traitName: string] & {traitCheckerContract: string, traitName: string})>(
        abi, '0xb9bb8c47919a97a618c9fc4e48892e44ae574085553d6e91bd91f6c82e0e1d91'
    ),
    TraitEdited: new LogEvent<([traitName: string, oldTraitCheckerContract: string, newTraitCheckerContract: string] & {traitName: string, oldTraitCheckerContract: string, newTraitCheckerContract: string})>(
        abi, '0x05e2c6a1fa7ec74de0025c7a9af6eac3f1e3efd0e5057efd75ed8bfd28273c98'
    ),
    TraitRemoved: new LogEvent<([raitName: string, oldTraitCheckerContract: string] & {raitName: string, oldTraitCheckerContract: string})>(
        abi, '0x8fbd90efdee168453bf8aefbe9f7f6790d9f9d9e2d88b56e057d10e1a10f3524'
    ),
    Transfer: new LogEvent<([from: string, to: string, tokenId: bigint] & {from: string, to: string, tokenId: bigint})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
    UsernameMinted: new LogEvent<([tokenId: bigint, username: string, minter: string] & {tokenId: bigint, username: string, minter: string})>(
        abi, '0x35ef44ecc86d6e7d5921e033a1a467be5596b3f41f8b61fd0e0dc8f363747ea7'
    ),
}

export const functions = {
    MAX_LENGTH: new Func<[], {}, bigint>(
        abi, '0xa6f9885c'
    ),
    MAX_LENGTH_FLAG: new Func<[], {}, boolean>(
        abi, '0xe4952409'
    ),
    addPaymentToken: new Func<[token: string], {token: string}, []>(
        abi, '0x4a7dc8e0'
    ),
    addTrait: new Func<[_traitCheckerContract: string, _traitName: string], {_traitCheckerContract: string, _traitName: string}, []>(
        abi, '0xbf4e0a01'
    ),
    addTraits: new Func<[_traitCheckerContracts: Array<string>, _traitNames: Array<string>], {_traitCheckerContracts: Array<string>, _traitNames: Array<string>}, []>(
        abi, '0xdcee2722'
    ),
    admins: new Func<[_: string], {}, boolean>(
        abi, '0x429b62e5'
    ),
    allowedTokens: new Func<[_: string], {}, boolean>(
        abi, '0xe744092e'
    ),
    allowedTokensList: new Func<[_: bigint], {}, string>(
        abi, '0xc36dd739'
    ),
    approve: new Func<[to: string, tokenId: bigint], {to: string, tokenId: bigint}, []>(
        abi, '0x095ea7b3'
    ),
    artProxy: new Func<[], {}, string>(
        abi, '0x5594a045'
    ),
    balanceOf: new Func<[owner: string], {owner: string}, bigint>(
        abi, '0x70a08231'
    ),
    batchMintUsername: new Func<[_usernames: Array<string>, _paymentToken: string, _rawTraits: Array<Array<string>>, _proofs: Array<Array<Array<string>>>], {_usernames: Array<string>, _paymentToken: string, _rawTraits: Array<Array<string>>, _proofs: Array<Array<Array<string>>>}, []>(
        abi, '0xbaf5404e'
    ),
    batchMintUsernameFor: new Func<[_to: string, _usernames: Array<string>, _paymentToken: string, _rawTraits: Array<Array<string>>, _proofs: Array<Array<Array<string>>>], {_to: string, _usernames: Array<string>, _paymentToken: string, _rawTraits: Array<Array<string>>, _proofs: Array<Array<Array<string>>>}, []>(
        abi, '0x5a5d8348'
    ),
    costPerToken: new Func<[_token: string], {_token: string}, Array<bigint>>(
        abi, '0xf5006f33'
    ),
    editTrait: new Func<[_traitName: string, newTraitCheckerContract: string], {_traitName: string, newTraitCheckerContract: string}, []>(
        abi, '0x0e43baff'
    ),
    emojiUtils: new Func<[], {}, string>(
        abi, '0xec12fe19'
    ),
    forbiddenChar: new Func<[], {}, Array<string>>(
        abi, '0xe4ec48a8'
    ),
    getApproved: new Func<[tokenId: bigint], {tokenId: bigint}, string>(
        abi, '0x081812fc'
    ),
    getLength: new Func<[_username: string], {_username: string}, bigint>(
        abi, '0x6981b5f4'
    ),
    isApprovedForAll: new Func<[owner: string, operator: string], {owner: string, operator: string}, boolean>(
        abi, '0xe985e9c5'
    ),
    isUsernameAvailable: new Func<[username: string], {username: string}, boolean>(
        abi, '0xf69c6dec'
    ),
    mintUsername: new Func<[_username: string, _paymentToken: string, _rawTraits: Array<string>, _proofs: Array<Array<string>>], {_username: string, _paymentToken: string, _rawTraits: Array<string>, _proofs: Array<Array<string>>}, []>(
        abi, '0xbb880d1a'
    ),
    mintUsernameFor: new Func<[_to: string, _username: string, _paymentToken: string, _rawTraits: Array<string>, _proofs: Array<Array<string>>], {_to: string, _username: string, _paymentToken: string, _rawTraits: Array<string>, _proofs: Array<Array<string>>}, []>(
        abi, '0x55368400'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    ownerOf: new Func<[tokenId: bigint], {tokenId: bigint}, string>(
        abi, '0x6352211e'
    ),
    pushForbiddenChar: new Func<[_str: string], {_str: string}, []>(
        abi, '0xc82867df'
    ),
    removeForbiddenChar: new Func<[_str: string], {_str: string}, []>(
        abi, '0x144ce438'
    ),
    removePaymentToken: new Func<[token: string], {token: string}, []>(
        abi, '0xa5125421'
    ),
    removeTrait: new Func<[_traitName: string], {_traitName: string}, []>(
        abi, '0x7a8360d3'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    'safeTransferFrom(address,address,uint256)': new Func<[from: string, to: string, tokenId: bigint], {from: string, to: string, tokenId: bigint}, []>(
        abi, '0x42842e0e'
    ),
    'safeTransferFrom(address,address,uint256,bytes)': new Func<[from: string, to: string, tokenId: bigint, data: string], {from: string, to: string, tokenId: bigint, data: string}, []>(
        abi, '0xb88d4fde'
    ),
    setAdmins: new Func<[_admin: string, _what: boolean], {_admin: string, _what: boolean}, []>(
        abi, '0x31cd5c09'
    ),
    setApprovalForAll: new Func<[operator: string, approved: boolean], {operator: string, approved: boolean}, []>(
        abi, '0xa22cb465'
    ),
    setCosts: new Func<[_token: string, costs: Array<bigint>], {_token: string, costs: Array<bigint>}, []>(
        abi, '0xf38ec86c'
    ),
    setMaxLength: new Func<[_newMaxLength: bigint], {_newMaxLength: bigint}, []>(
        abi, '0xdc2f7867'
    ),
    supportsInterface: new Func<[interfaceId: string], {interfaceId: string}, boolean>(
        abi, '0x01ffc9a7'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    toLower: new Func<[_str: string], {_str: string}, string>(
        abi, '0x9416b423'
    ),
    tokenByIndex: new Func<[index: bigint], {index: bigint}, bigint>(
        abi, '0x4f6ccce7'
    ),
    tokenIdCounter: new Func<[], {}, bigint>(
        abi, '0x98bdf6f5'
    ),
    tokenOfOwnerByIndex: new Func<[owner: string, index: bigint], {owner: string, index: bigint}, bigint>(
        abi, '0x2f745c59'
    ),
    tokenURI: new Func<[_tokenId: bigint], {_tokenId: bigint}, string>(
        abi, '0xc87b56dd'
    ),
    totalSupply: new Func<[], {}, bigint>(
        abi, '0x18160ddd'
    ),
    traitToTraitChecker: new Func<[_: string], {}, string>(
        abi, '0xfe909add'
    ),
    traits: new Func<[_: bigint, _: bigint], {}, string>(
        abi, '0x79d3cd00'
    ),
    traitsCategories: new Func<[_: bigint, _: bigint], {}, string>(
        abi, '0x39c98490'
    ),
    transferFrom: new Func<[from: string, to: string, tokenId: bigint], {from: string, to: string, tokenId: bigint}, []>(
        abi, '0x23b872dd'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    updateArtProxy: new Func<[_newArtProxy: string], {_newArtProxy: string}, []>(
        abi, '0xcfcc40e2'
    ),
    updateEmojiUtils: new Func<[_newEmojiUtils: string], {_newEmojiUtils: string}, []>(
        abi, '0x28227c7b'
    ),
    updateTraits: new Func<[tokenId: bigint, _rawTraits: Array<string>, _proofs: Array<Array<string>>], {tokenId: bigint, _rawTraits: Array<string>, _proofs: Array<Array<string>>}, []>(
        abi, '0x67871c16'
    ),
    usernameToTokenId: new Func<[_: string], {}, bigint>(
        abi, '0x0477d41b'
    ),
    usernames: new Func<[_: bigint], {}, string>(
        abi, '0x136dd963'
    ),
    validateUsername: new Func<[username: string], {username: string}, boolean>(
        abi, '0x7f797103'
    ),
    withdrawTokens: new Func<[token: string, amount: bigint], {token: string, amount: bigint}, []>(
        abi, '0x06b091f9'
    ),
}

export class Contract extends ContractBase {

    MAX_LENGTH(): Promise<bigint> {
        return this.eth_call(functions.MAX_LENGTH, [])
    }

    MAX_LENGTH_FLAG(): Promise<boolean> {
        return this.eth_call(functions.MAX_LENGTH_FLAG, [])
    }

    admins(arg0: string): Promise<boolean> {
        return this.eth_call(functions.admins, [arg0])
    }

    allowedTokens(arg0: string): Promise<boolean> {
        return this.eth_call(functions.allowedTokens, [arg0])
    }

    allowedTokensList(arg0: bigint): Promise<string> {
        return this.eth_call(functions.allowedTokensList, [arg0])
    }

    artProxy(): Promise<string> {
        return this.eth_call(functions.artProxy, [])
    }

    balanceOf(owner: string): Promise<bigint> {
        return this.eth_call(functions.balanceOf, [owner])
    }

    costPerToken(_token: string): Promise<Array<bigint>> {
        return this.eth_call(functions.costPerToken, [_token])
    }

    emojiUtils(): Promise<string> {
        return this.eth_call(functions.emojiUtils, [])
    }

    forbiddenChar(): Promise<Array<string>> {
        return this.eth_call(functions.forbiddenChar, [])
    }

    getApproved(tokenId: bigint): Promise<string> {
        return this.eth_call(functions.getApproved, [tokenId])
    }

    getLength(_username: string): Promise<bigint> {
        return this.eth_call(functions.getLength, [_username])
    }

    isApprovedForAll(owner: string, operator: string): Promise<boolean> {
        return this.eth_call(functions.isApprovedForAll, [owner, operator])
    }

    isUsernameAvailable(username: string): Promise<boolean> {
        return this.eth_call(functions.isUsernameAvailable, [username])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    ownerOf(tokenId: bigint): Promise<string> {
        return this.eth_call(functions.ownerOf, [tokenId])
    }

    supportsInterface(interfaceId: string): Promise<boolean> {
        return this.eth_call(functions.supportsInterface, [interfaceId])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    toLower(_str: string): Promise<string> {
        return this.eth_call(functions.toLower, [_str])
    }

    tokenByIndex(index: bigint): Promise<bigint> {
        return this.eth_call(functions.tokenByIndex, [index])
    }

    tokenIdCounter(): Promise<bigint> {
        return this.eth_call(functions.tokenIdCounter, [])
    }

    tokenOfOwnerByIndex(owner: string, index: bigint): Promise<bigint> {
        return this.eth_call(functions.tokenOfOwnerByIndex, [owner, index])
    }

    tokenURI(_tokenId: bigint): Promise<string> {
        return this.eth_call(functions.tokenURI, [_tokenId])
    }

    totalSupply(): Promise<bigint> {
        return this.eth_call(functions.totalSupply, [])
    }

    traitToTraitChecker(arg0: string): Promise<string> {
        return this.eth_call(functions.traitToTraitChecker, [arg0])
    }

    traits(arg0: bigint, arg1: bigint): Promise<string> {
        return this.eth_call(functions.traits, [arg0, arg1])
    }

    traitsCategories(arg0: bigint, arg1: bigint): Promise<string> {
        return this.eth_call(functions.traitsCategories, [arg0, arg1])
    }

    usernameToTokenId(arg0: string): Promise<bigint> {
        return this.eth_call(functions.usernameToTokenId, [arg0])
    }

    usernames(arg0: bigint): Promise<string> {
        return this.eth_call(functions.usernames, [arg0])
    }

    validateUsername(username: string): Promise<boolean> {
        return this.eth_call(functions.validateUsername, [username])
    }
}
