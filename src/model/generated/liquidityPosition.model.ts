import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {User} from "./user.model"
import {Pool} from "./pool.model"
import {LiquidityPositionUpdate} from "./liquidityPositionUpdate.model"

@Entity_()
export class LiquidityPosition {
    constructor(props?: Partial<LiquidityPosition>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => User, {nullable: true})
    user!: User

    @Index_()
    @ManyToOne_(() => Pool, {nullable: true})
    pool!: Pool

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    value!: bigint

    @OneToMany_(() => LiquidityPositionUpdate, e => e.position)
    updates!: LiquidityPositionUpdate[]
}
