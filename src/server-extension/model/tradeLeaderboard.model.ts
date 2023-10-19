import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class TradeLeaderboardItemEntity {
    @Field(() => Number, { nullable: false })
    rank!: number

    @Field(() => String, { nullable: false})
    address!: string

    @Field(() => Number, { nullable: false})
    volume!: number
    
    constructor(props: Partial<TradeLeaderboardItemEntity>) {
        Object.assign(this, props);
    }
}