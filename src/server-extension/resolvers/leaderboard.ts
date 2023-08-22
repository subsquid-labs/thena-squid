import "reflect-metadata";
import { Arg, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { Trade } from '../../model'
import { LeaderboardItemEntity } from '../model/leaderboard.model'
import { leaderboardQuery, rankByAddressQuery } from '../query/leaderboard'
import { makeQuery } from '../utils'

@Resolver()
export class LeaderboardResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => [LeaderboardItemEntity])
  async leaderboard( @Arg('period', { nullable: true, defaultValue: '1 DAY' }) period: string ): Promise<LeaderboardItemEntity[]> {
    const result: LeaderboardItemEntity[] = await makeQuery(this.tx, Trade, leaderboardQuery(period))
    return result
  }

  @Query(() => [LeaderboardItemEntity])
  async rankByAddress( @Arg('address', { nullable: false }) address: string, @Arg('period', { nullable: true, defaultValue: '1 DAY' }) period: string ): Promise<LeaderboardItemEntity[]> {
    const result: LeaderboardItemEntity[] = await makeQuery(this.tx, Trade, rankByAddressQuery(period), [address])
    return result
  }
}