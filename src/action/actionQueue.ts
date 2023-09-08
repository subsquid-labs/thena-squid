import {StoreWithCache} from '@belopash/typeorm-store'
import {Chain} from '@subsquid/evm-processor/lib/interfaces/chain'
import {Logger} from '@subsquid/logger'
import {withErrorContext} from '@subsquid/util-internal'
import assert from 'assert'
import {Action, ActionBlock, ActionConfig, ActionConstructor, ActionTransaction, BaseActionRegistry} from './base'
import * as Bribe from './bribe'
import * as Gauge from './gauge'
import * as Hypervisor from './hypervisor'
import * as LiquidityPosition from './liquidityPosition'
import * as Pool from './pool'
import * as Token from './token'
import * as User from './user'
import * as VeToken from './veToken'
import * as Vote from './vote'
import * as TC from './tradingCompetition'
import * as ThenianNft from './thenianNft'

const Actions = {
    user_create: User.CreateUserAction,
    user_updateBalance: User.BalanceUserAction,

    swap: User.SwapAction,

    bribe_create: Bribe.CreateBribeAction,
    bribe_updateStake: Bribe.UpdateStakeBribeAction,

    gauge_create: Gauge.CreateGaugeAction,
    gauge_updateTotalSupply: Gauge.UpdateTotalSupplyGaugeAction,
    gauge_createStake: Gauge.CreateStakeGaugeAction,
    gauge_rewardStake: Gauge.RewardStakeGaugeAction,
    gauge_updateStake: Gauge.UpdateStakeGaugeAction,

    hypervisor_create: Hypervisor.CreateHypervisorAction,
    hypervisor_setPosition: Hypervisor.SetPositionHypervisorAction,
    hypervisor_removePosition: Hypervisor.RemovePositionHypervisorAction,

    lp_create: LiquidityPosition.CreateLiquidityPositionAction,
    lp_updateValue: LiquidityPosition.ValueUpdateLiquidityPositionAction,
    lp_adjustLastUpdate: LiquidityPosition.AdjustValueUpdateLiquidityPositionAction,

    pool_create: Pool.CreatePoolAction,
    pool_setReserves: Pool.SetBalancesPoolAction,
    pool_updateReserves: Pool.ChangeBalancesPoolAction,
    pool_setLiquidity: Pool.SetLiquidityPoolAction,
    pool_updateLiquidity: Pool.ChangeLiquidityPoolAction,
    pool_recalcPrices: Pool.RecalculatePricesPoolAction,
    pool_setSqrtPrice: Pool.SetSqrtPricePoolAction,

    token_create: Token.CreateTokenAction,
    token_recalcPrice: Token.PriceUpdateTokenAction,

    veToken_create: VeToken.CreateVeTokenAction,
    veToken_transfer: VeToken.TransferVeTokenAction,
    veToken_reward: VeToken.RewardVeTokenAction,
    veToken_updateValue: VeToken.UpdateValueVeTokenAction,
    veToken_setLockTime: VeToken.UpdateLockTimeVeTokenAction,

    vote_create: Vote.CreateVoteAction,
    vote_updateWeigth: Vote.UpdateVoteAction,

    tc_create: TC.CreateTradingCompetitionAction,

    thenianNft_create: ThenianNft.CreateThenianNftAction,
    thenianNft_updateOwner: ThenianNft.UpdateOwnerThenianNftAction,
    thenianNft_setMetadata: ThenianNft.SetMetadataAction,
} satisfies BaseActionRegistry

type ActionRegistry = typeof Actions

export class ActionQueue {
    private actions: Action<any>[] = []

    private block: ActionBlock | undefined
    private transaction: ActionTransaction | undefined

    constructor(private config: {_chain: Chain; store: StoreWithCache; log: Logger}) {}

    get size() {
        return this.actions.length
    }

    setBlock(block: ActionBlock) {
        this.block = block

        return this
    }

    setTransaction(transaction: ActionTransaction | undefined) {
        this.transaction = transaction

        return this
    }

    add<A extends keyof ActionRegistry>(
        action: A,
        data: ActionRegistry[A] extends ActionConstructor<infer R> ? R : never
    ): this {
        assert(this.block != null)

        const ActionConstructor = Actions[action] as ActionConstructor<typeof data>
        if (ActionConstructor == null) {
            throw new Error(`Action '${action}' is not registered.`)
        }

        const a = new ActionConstructor(
            {
                ...this.config,
                block: this.block,
                transaction: this.transaction,
            },
            data
        )
        this.actions.push(a)

        return this
    }

    lazy(cb: () => void | PromiseLike<void>) {
        assert(this.block != null)

        const a = new LazyAction(
            {
                ...this.config,
                block: this.block,
                transaction: this.transaction,
            },
            cb
        )
        this.actions.push(a)

        return this
    }

    async process() {
        await this.processActions(this.actions)
        this.actions = []
    }

    private async processActions(actions: Action<any>[]) {
        for (const action of actions) {
            await this.processAction(action).catch(
                withErrorContext({
                    block: action.block.height,
                    extrinsicHash: action.transaction?.hash,
                })
            )
        }
    }

    private async processAction(action: Action<any>) {
        if (action instanceof LazyAction) {
            await this.processLazyAction(action)
        } else {
            await action.perform()
        }
    }

    private async processLazyAction(action: LazyAction) {
        const saved = {block: this.block, transaction: this.transaction, actions: this.actions}
        try {
            this.block = action.block
            this.transaction = action.transaction
            this.actions = []
            await action.perform()
            await this.processActions(this.actions)
        } finally {
            this.block = saved.block
            this.transaction = saved.transaction
            this.actions = saved.actions
        }
    }
}

class LazyAction extends Action<unknown> {
    constructor(protected config: ActionConfig, readonly cb: () => void | PromiseLike<void>) {
        super(config, {})
    }

    async perform(): Promise<void> {
        await this.cb()
    }
}
