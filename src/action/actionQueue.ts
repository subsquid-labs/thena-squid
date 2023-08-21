import {withErrorContext} from '@subsquid/util-internal'
import assert from 'assert'
import {Action, ActionBlock, ActionConstructor, ActionContext, ActionData, ActionTransaction} from './base'
import * as Bribe from './bribe'
import * as Gauge from './gauge'
import * as Hypervisor from './hypervisor'
import * as LiquidityPosition from './liquidityPosition'
import * as Pool from './pool'
import * as Token from './token'
import * as User from './user'
import * as VeToken from './veToken'
import * as Vote from './vote'

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

    lp_create: LiquidityPosition.EnsureLiquidityPositionAction,
    lp_updateValue: LiquidityPosition.ValueUpdateLiquidityPositionAction,
    lp_adjustLastUpdate: LiquidityPosition.AdjustValueUpdateLiquidityPositionAction,

    pool_create: Pool.CreatePoolAction,
    pool_setReserves: Pool.SetBalancesPoolAction,
    pool_updateReserves: Pool.ChangeBalancesPoolAction,
    pool_setLiquidity: Pool.SetLiquidityPoolAction,
    pool_updateLiquidity: Pool.ChangeLiquidityPoolAction,
    pool_recalcPrices: Pool.RecalculatePricesPoolAction,
    pool_setSqrtPrice: Pool.SetSqrtPricePoolAction,

    token_create: Token.EnsureTokenAction,
    token_recalcPrice: Token.PriceUpdateTokenAction,

    veToken_create: VeToken.CreateVeTokenAction,
    veToken_transfer: VeToken.TransferVeTokenAction,
    veToken_reward: VeToken.RewardVeTokenAction,
    veToken_updateValue: VeToken.UpdateValueVeTokenAction,
    veToken_setLockTime: VeToken.UpdateLockTimeVeTokenAction,

    vote_create: Vote.EnsureVoteAction,
    vote_updateWeigth: Vote.UpdateVoteAction,
}

type CreateActionRegistry<T extends {[k: string]: ActionConstructor<Action<any>>}> = {
    [K in keyof T]: T[K] extends ActionConstructor<infer A> ? A : never
}
type ActionRegistry = CreateActionRegistry<typeof Actions>

export class ActionQueue {
    private actions: Action[] = []

    private block: ActionBlock | undefined
    private transaction: ActionTransaction | undefined

    setBlock(block: ActionBlock) {
        this.block = block

        return this
    }

    setTransaction(transaction: ActionTransaction | undefined) {
        this.transaction = transaction

        return this
    }

    add<A extends keyof ActionRegistry>(action: A, data: ActionData<ActionRegistry[A]>): this {
        assert(this.block != null)
        assert(this.transaction != null)

        const a = new Actions[action](this.block, this.transaction, data as any) // TODO: find if there is a proper way to pass typed parameter
        this.actions.push(a)

        return this
    }

    lazy(cb: () => void | PromiseLike<void>) {
        assert(this.block != null)
        assert(this.transaction != null)

        const a = new LazyAction(this.block, this.transaction, cb)
        this.actions.push(a)

        return this
    }

    async process(ctx: ActionContext) {
        return await this.processActions(ctx, this.actions)
    }

    private async processActions(ctx: ActionContext, actions: Action[]) {
        for (const action of actions) {
            action.prepare(ctx)
        }

        for (const action of actions) {
            const actionCtx = {
                ...ctx,
                log: ctx.log.child('action', {
                    block: action.block.height,
                    transaction: action.transaction?.hash,
                }),
            }

            await this.processAction(actionCtx, action).catch(
                withErrorContext({
                    block: action.block.height,
                    extrinsicHash: action.transaction?.hash,
                })
            )
        }
    }

    private async processAction(ctx: ActionContext, action: Action) {
        if (action instanceof LazyAction) {
            await this.processLazyAction(ctx, action)
        } else {
            await action.perform(ctx)
        }
    }

    private async processLazyAction(ctx: ActionContext, action: LazyAction) {
        const saved = {block: this.block, transaction: this.transaction, actions: this.actions}
        try {
            this.block = action.block
            this.transaction = action.transaction
            this.actions = []
            await action.perform()
            await this.processActions(ctx, this.actions)
        } finally {
            this.block = saved.block
            this.transaction = saved.transaction
            this.actions = saved.actions
        }
    }
}

class LazyAction extends Action<unknown> {
    constructor(
        readonly block: ActionBlock,
        readonly transaction: ActionTransaction,
        readonly cb: () => void | PromiseLike<void>
    ) {
        super(block, transaction, {})
    }

    async perform(): Promise<void> {
        await this.cb()
    }
}
