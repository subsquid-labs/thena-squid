import "reflect-metadata";
import { Arg, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { Trade } from '../../model'
import { TCLeaderboardItemEntity } from '../model/tcLeaderboard.model'
import { tcLeaderboardQuery, tcRankByAddressQuery } from '../query/tcLeaderboard'
import { makeQuery } from '../utils'

@Resolver()
export class LeaderboardResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => [TCLeaderboardItemEntity])
  async tcLeaderboard(): Promise<TCLeaderboardItemEntity[]> {
    const result: TCLeaderboardItemEntity[] = await makeQuery(this.tx, Trade, tcLeaderboardQuery())
    return result
  }

  @Query(() => [TCLeaderboardItemEntity])
  async tcRankByAddress( @Arg('address', { nullable: false }) address: string): Promise<TCLeaderboardItemEntity[]> {
    const result: TCLeaderboardItemEntity[] = await makeQuery(this.tx, Trade, tcRankByAddressQuery(), [address])
    return result
  }
}