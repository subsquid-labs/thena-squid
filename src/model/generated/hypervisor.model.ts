import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {LiquidityPosition} from "./liquidityPosition.model"
import {Pool} from "./pool.model"

@Entity_()
export class Hypervisor {
    constructor(props?: Partial<Hypervisor>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: false})
    poolId!: string

    @Column_("text", {nullable: true})
    basePositionId!: string | undefined | null

    @Column_("text", {nullable: true})
    limitPositionId!: string | undefined | null

    @Index_()
    @ManyToOne_(() => LiquidityPosition, {nullable: true})
    basePosition!: LiquidityPosition | undefined | null

    @Index_()
    @ManyToOne_(() => LiquidityPosition, {nullable: true})
    limitPosition!: LiquidityPosition | undefined | null

    /**
     * Use poolId instead
     */
    @Index_()
    @ManyToOne_(() => Pool, {nullable: true})
    pool!: Pool
}
