import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './algebraFactory.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    FarmingAddress: new LogEvent<([newFarmingAddress: string] & {newFarmingAddress: string})>(
        abi, '0x56b9e8342f530796ceed0d5529abdcdeae6e4f2ac1dc456ceb73bbda898e0cd3'
    ),
    FeeConfiguration: new LogEvent<([alpha1: number, alpha2: number, beta1: number, beta2: number, gamma1: number, gamma2: number, volumeBeta: number, volumeGamma: number, baseFee: number] & {alpha1: number, alpha2: number, beta1: number, beta2: number, gamma1: number, gamma2: number, volumeBeta: number, volumeGamma: number, baseFee: number})>(
        abi, '0x4035ab409f15e202f9f114632e1fb14a0552325955722be18503403e7f98730c'
    ),
    Owner: new LogEvent<([newOwner: string] & {newOwner: string})>(
        abi, '0xa5e220c2c27d986cc8efeafa8f34ba6ea6bf96a34e146b29b6bdd8587771b130'
    ),
    Pool: new LogEvent<([token0: string, token1: string, pool: string] & {token0: string, token1: string, pool: string})>(
        abi, '0x91ccaa7a278130b65168c3a0c8d3bcae84cf5e43704342bd3ec0b59e59c036db'
    ),
    VaultAddress: new LogEvent<([newVaultAddress: string] & {newVaultAddress: string})>(
        abi, '0xb9c265ae4414f501736ec5d4961edc3309e4385eb2ff3feeecb30fb36621dd83'
    ),
}

export const functions = {
    baseFeeConfiguration: new Func<[], {}, ([alpha1: number, alpha2: number, beta1: number, beta2: number, gamma1: number, gamma2: number, volumeBeta: number, volumeGamma: number, baseFee: number] & {alpha1: number, alpha2: number, beta1: number, beta2: number, gamma1: number, gamma2: number, volumeBeta: number, volumeGamma: number, baseFee: number})>(
        abi, '0x9832853a'
    ),
    createPool: new Func<[tokenA: string, tokenB: string], {tokenA: string, tokenB: string}, string>(
        abi, '0xe3433615'
    ),
    farmingAddress: new Func<[], {}, string>(
        abi, '0x8a2ade58'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    poolByPair: new Func<[_: string, _: string], {}, string>(
        abi, '0xd9a641e1'
    ),
    poolDeployer: new Func<[], {}, string>(
        abi, '0x3119049a'
    ),
    setBaseFeeConfiguration: new Func<[alpha1: number, alpha2: number, beta1: number, beta2: number, gamma1: number, gamma2: number, volumeBeta: number, volumeGamma: number, baseFee: number], {alpha1: number, alpha2: number, beta1: number, beta2: number, gamma1: number, gamma2: number, volumeBeta: number, volumeGamma: number, baseFee: number}, []>(
        abi, '0x5d6d7e93'
    ),
    setFarmingAddress: new Func<[_farmingAddress: string], {_farmingAddress: string}, []>(
        abi, '0xb001f618'
    ),
    setOwner: new Func<[_owner: string], {_owner: string}, []>(
        abi, '0x13af4035'
    ),
    setVaultAddress: new Func<[_vaultAddress: string], {_vaultAddress: string}, []>(
        abi, '0x85535cc5'
    ),
    vaultAddress: new Func<[], {}, string>(
        abi, '0x430bf08a'
    ),
}

export class Contract extends ContractBase {

    baseFeeConfiguration(): Promise<([alpha1: number, alpha2: number, beta1: number, beta2: number, gamma1: number, gamma2: number, volumeBeta: number, volumeGamma: number, baseFee: number] & {alpha1: number, alpha2: number, beta1: number, beta2: number, gamma1: number, gamma2: number, volumeBeta: number, volumeGamma: number, baseFee: number})> {
        return this.eth_call(functions.baseFeeConfiguration, [])
    }

    farmingAddress(): Promise<string> {
        return this.eth_call(functions.farmingAddress, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    poolByPair(arg0: string, arg1: string): Promise<string> {
        return this.eth_call(functions.poolByPair, [arg0, arg1])
    }

    poolDeployer(): Promise<string> {
        return this.eth_call(functions.poolDeployer, [])
    }

    vaultAddress(): Promise<string> {
        return this.eth_call(functions.vaultAddress, [])
    }
}
