import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './thena.abi'

export const abi = new ethers.utils.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, spender: string, value: ethers.BigNumber] & {owner: string, spender: string, value: ethers.BigNumber})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    Transfer: new LogEvent<([from: string, to: string, value: ethers.BigNumber] & {from: string, to: string, value: ethers.BigNumber})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
}

export const functions = {
    allowance: new Func<[_: string, _: string], {}, ethers.BigNumber>(
        abi, '0xdd62ed3e'
    ),
    approve: new Func<[_spender: string, _value: ethers.BigNumber], {_spender: string, _value: ethers.BigNumber}, boolean>(
        abi, '0x095ea7b3'
    ),
    balanceOf: new Func<[_: string], {}, ethers.BigNumber>(
        abi, '0x70a08231'
    ),
    decimals: new Func<[], {}, number>(
        abi, '0x313ce567'
    ),
    initialMint: new Func<[_recipient: string], {_recipient: string}, []>(
        abi, '0xc268f9ba'
    ),
    initialMinted: new Func<[], {}, boolean>(
        abi, '0xca1c4de9'
    ),
    merkleClaim: new Func<[], {}, string>(
        abi, '0xe752c44a'
    ),
    mint: new Func<[account: string, amount: ethers.BigNumber], {account: string, amount: ethers.BigNumber}, boolean>(
        abi, '0x40c10f19'
    ),
    minter: new Func<[], {}, string>(
        abi, '0x07546172'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    redemptionReceiver: new Func<[], {}, string>(
        abi, '0x5e05fe50'
    ),
    setMinter: new Func<[_minter: string], {_minter: string}, []>(
        abi, '0xfca3b5aa'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    totalSupply: new Func<[], {}, ethers.BigNumber>(
        abi, '0x18160ddd'
    ),
    transfer: new Func<[_to: string, _value: ethers.BigNumber], {_to: string, _value: ethers.BigNumber}, boolean>(
        abi, '0xa9059cbb'
    ),
    transferFrom: new Func<[_from: string, _to: string, _value: ethers.BigNumber], {_from: string, _to: string, _value: ethers.BigNumber}, boolean>(
        abi, '0x23b872dd'
    ),
}

export class Contract extends ContractBase {

    allowance(arg0: string, arg1: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.allowance, [arg0, arg1])
    }

    balanceOf(arg0: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.balanceOf, [arg0])
    }

    decimals(): Promise<number> {
        return this.eth_call(functions.decimals, [])
    }

    initialMinted(): Promise<boolean> {
        return this.eth_call(functions.initialMinted, [])
    }

    merkleClaim(): Promise<string> {
        return this.eth_call(functions.merkleClaim, [])
    }

    minter(): Promise<string> {
        return this.eth_call(functions.minter, [])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    redemptionReceiver(): Promise<string> {
        return this.eth_call(functions.redemptionReceiver, [])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    totalSupply(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.totalSupply, [])
    }
}
