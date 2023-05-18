import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {User} from "./user.model"
import {Vote} from "./vote.model"

@Entity_()
export class VeToken {
    constructor(props?: Partial<VeToken>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => User, {nullable: true})
    owner!: User

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    value!: bigint

    @Column_("timestamp with time zone", {nullable: false})
    lockedUntil!: Date

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalReward!: bigint

    @OneToMany_(() => Vote, e => e.token)
    votes!: Vote[]
}
