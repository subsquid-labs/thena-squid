import assert from 'assert'
import * as hypervisorAbi from '../abi/hypervisor'
import {Hypervisor, LiquidityPosition, Pool, PoolType, Token} from '../model'
import {CallCache} from '../utils/callCache'
import {Action} from './base'
import {CreatePoolAction} from './pool'
import {EnsureTokenAction} from './token'

export interface BaseHypervisorActionData {
    hypervisorId: string
}

export abstract class BaseHypervisorAction<
    T extends BaseHypervisorActionData = BaseHypervisorActionData
> extends Action<T> {}

export interface CreateHypervisorActionData extends BaseHypervisorActionData {
    hypervisorId: string
    address: string
    poolId: string
    hypervisorPoolId: string
    token0Id: string
    token1Id: string
}

export class CreateHypervisorAction extends BaseHypervisorAction<CreateHypervisorActionData> {
    async perform(): Promise<void> {
        const callCache = CallCache.get(this.config)

        const token0 = await this.store.get(Token, this.data.token0Id)
        if (token0 == null) {
            const token0Address = this.data.token0Id
            const token0Decimals = callCache.defer(this.block, [hypervisorAbi.functions.decimals, token0Address, []])
            const token0Symbol = callCache.defer(this.block, [hypervisorAbi.functions.symbol, token0Address, []])
            const ensureToken0 = new EnsureTokenAction(
                {
                    ...this.config,
                    block: this.block,
                    transaction: this.transaction,
                },
                {
                    tokenId: token0Address,
                    address: token0Address,
                    decimals: await token0Decimals.get(),
                    symbol: await token0Symbol.get(),
                }
            )

            await ensureToken0.perform()
        }

        const token1 = await this.store.get(Token, this.data.token1Id)
        if (token1 == null) {
            const token1Address = this.data.token1Id
            const token1Decimals = callCache.defer(this.block, [hypervisorAbi.functions.decimals, token1Address, []])
            const token1Symbol = callCache.defer(this.block, [hypervisorAbi.functions.symbol, token1Address, []])
            const ensureToken1 = new EnsureTokenAction(
                {
                    ...this.config,
                    block: this.block,
                    transaction: this.transaction,
                },
                {
                    tokenId: token1Address,
                    address: token1Address,
                    decimals: await token1Decimals.get(),
                    symbol: await token1Symbol.get(),
                }
            )
            await ensureToken1.perform()
        }

        const poolCreation = new CreatePoolAction(
            {
                ...this.config,
                block: this.block,
                transaction: this.transaction,
            },
            {
                poolId: this.data.address,
                address: this.data.address,
                factory: this.data.address,
                type: PoolType.Hypervisor,
                token0Id: this.data.token0Id,
                token1Id: this.data.token1Id,
            }
        )
        await poolCreation.perform()

        const pool = await this.store.getOrFail(Pool, this.data.poolId)

        const hypervisor = new Hypervisor({
            id: this.data.address,
            pool,
            basePosition: undefined,
            limitPosition: undefined,
        })

        await this.store.insert(hypervisor)
        this.log.debug(`Hypervisor ${hypervisor.id} created`)
    }
}

export interface SetPositionHypervisorActionData extends BaseHypervisorActionData {
    positionId: string
}

export class SetPositionHypervisorAction extends BaseHypervisorAction<SetPositionHypervisorActionData> {
    async perform(): Promise<void> {
        const hypervisor = await this.store.getOrFail(Hypervisor, this.data.hypervisorId)

        const position = await this.store.getOrFail(LiquidityPosition, this.data.positionId)
        assert(position != null, 'Missing position')

        if (hypervisor.basePosition == null) {
            hypervisor.basePosition = position
            this.log.debug(`Base position of Hypervisor ${hypervisor.id} set to ${position.id}`)
        } else if (hypervisor.limitPosition == null) {
            hypervisor.limitPosition = position
            this.log.debug(`Limit position of Hypervisor ${hypervisor.id} set to ${position.id}`)
        } else {
            // throw new Error(`Unexpected case`)
            return
        }

        await this.store.upsert(hypervisor)
    }
}

export interface RemovePositionHypervisorActionData extends BaseHypervisorActionData {
    positionId: string
}

export class RemovePositionHypervisorAction extends BaseHypervisorAction<RemovePositionHypervisorActionData> {
    async perform(): Promise<void> {
        const hypervisor = await this.store.getOrFail(Hypervisor, this.data.hypervisorId)
        const position = await this.store.getOrFail(LiquidityPosition, this.data.positionId)

        if (hypervisor.basePosition?.id === position.id) {
            hypervisor.basePosition = null
            this.log.debug(`Base position of Hypervisor ${hypervisor.id} removed`)
        } else if (hypervisor.limitPosition?.id == position.id) {
            hypervisor.limitPosition = null
            this.log.debug(`Limit position of Hypervisor ${hypervisor.id} removed`)
        } else {
            // throw new Error(`Unexpected case`)
            return
        }

        await this.store.upsert(hypervisor)
    }
}
