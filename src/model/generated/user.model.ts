import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Trade} from "./trade.model"

@Entity_()
export class User {
    constructor(props?: Partial<User>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    balance!: bigint

    @Column_("timestamp with time zone", {nullable: false})
    firstInteractAt!: Date

    @OneToMany_(() => Trade, e => e.user)
    trades!: Trade[]
}
