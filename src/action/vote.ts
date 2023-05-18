import {DataHandlerContext} from '@subsquid/evm-processor'
import {LiquidityPosition, Pool, Token, Vote} from '../model'
import {StoreWithCache} from '../utils/store'
import {Action} from './base'
import {DeferredValue} from '../utils/deferred'
import assert from 'assert'

export interface EnsureVoteData {
    vote: DeferredValue<Vote, true>
    id: string
    token: DeferredValue<Token, true>
    pool: DeferredValue<Pool, true>
}

// export class EnsureVoteAction extends Action<EnsureVoteData> {
//     // async _perform(ctx: DataHandlerContext<StoreWithCache, {}>): Promise<void> {
//     //     let position = await this.data.position.get()
//     //     if (position != null) return

//     //     const user = await this.data.user.get()
//     //     assert(user != null)
//     //     const pool = await this.data.pool.get()
//     //     assert(pool != null)

//     //     position = new LiquidityPosition({
//     //         id: this.data.id,
//     //         user,
//     //         pool,
//     //         value: 0n,
//     //     })

//     //     await ctx.store.insert(position)
//     //     ctx.log.debug(`Created LiquidityPosition ${position.id}`)
//     // }
// }
