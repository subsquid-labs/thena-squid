import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class TCLeaderboardItemEntity {
    @Field(() => Number, { nullable: false })
    rank!: number

    @Field(() => String, { nullable: false})
    address!: string

    @Field(() => Number, { nullable: false})
    prize!: number
    
    constructor(props: Partial<TCLeaderboardItemEntity>) {
        Object.assign(this, props);
    }
}