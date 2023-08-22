import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class LeaderboardItemEntity {
    @Field(() => Number, { nullable: false })
    rank!: number

    @Field(() => String, { nullable: false})
    address!: string

    @Field(() => Number, { nullable: false})
    volume!: number
    
    constructor(props: Partial<LeaderboardItemEntity>) {
        Object.assign(this, props);
    }
}