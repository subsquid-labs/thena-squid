import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {LiquidityPosition} from "./liquidityPosition.model"

@Entity_()
export class LiquidityPositionUpdate {
    constructor(props?: Partial<LiquidityPositionUpdate>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("int4", {nullable: false})
    blockNumber!: number

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Column_("text", {nullable: false})
    txHash!: string

    @Index_()
    @ManyToOne_(() => LiquidityPosition, {nullable: true})
    position!: LiquidityPosition

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amount!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amount0!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amount1!: bigint
}
