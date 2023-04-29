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

    @Column_("text", {nullable: false})
    userId!: string

    @Column_("text", {nullable: false})
    poolId!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    value!: bigint

    /**
     * @private Use userId instead
     */
    @Index_()
    @ManyToOne_(() => User, {nullable: true})
    user!: User

    /**
     * @private Use poolId instead
     */
    @Index_()
    @ManyToOne_(() => Pool, {nullable: true})
    pool!: Pool

    /**
     * @private Don't use
     */
    @OneToMany_(() => LiquidityPositionUpdate, e => e.position)
    updates!: LiquidityPositionUpdate[]
}
