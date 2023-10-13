import "reflect-metadata";
import { Arg, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { Trade } from '../../model'
import { TradeLeaderboardItemEntity } from '../model/tradeLeaderboard.model'
import { tradeLeaderboardQuery, tradeRankByAddressQuery } from '../query/tradeLeaderboard'
import { makeQuery } from '../utils'

@Resolver()
export class TradeLeaderboardResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => [TradeLeaderboardItemEntity])
  async tradeLeaderboard( @Arg('period', { nullable: true, defaultValue: '1 DAY' }) period: string ): Promise<TradeLeaderboardItemEntity[]> {
    const result: TradeLeaderboardItemEntity[] = await makeQuery(this.tx, Trade, tradeLeaderboardQuery(period))
    return result
  }

  @Query(() => [TradeLeaderboardItemEntity])
  async tradeRankByAddress( @Arg('address', { nullable: false }) address: string, @Arg('period', { nullable: true, defaultValue: '1 DAY' }) period: string ): Promise<TradeLeaderboardItemEntity[]> {
    const result: TradeLeaderboardItemEntity[] = await makeQuery(this.tx, Trade, tradeRankByAddressQuery(period), [address])
    return result
  }
}