import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Pool} from "./pool.model"
import {LiquidityPosition} from "./liquidityPosition.model"

@Entity_()
export class Hypervisor {
    constructor(props?: Partial<Hypervisor>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Pool, {nullable: true})
    pool!: Pool

    @Index_()
    @ManyToOne_(() => LiquidityPosition, {nullable: true})
    basePosition!: LiquidityPosition | undefined | null

    @Index_()
    @ManyToOne_(() => LiquidityPosition, {nullable: true})
    limitPosition!: LiquidityPosition | undefined | null
}
