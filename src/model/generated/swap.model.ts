import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Token} from "./token.model"
import {Trade} from "./trade.model"
import {Pool} from "./pool.model"

@Entity_()
export class Swap {
    constructor(props?: Partial<Swap>) {
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
    @ManyToOne_(() => Token, {nullable: true})
    tokenIn!: Token

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amountIn!: bigint

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: false})
    amountInUSD!: number

    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    tokenOut!: Token

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amountOut!: bigint

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: false})
    amountOutUSD!: number

    @Index_()
    @ManyToOne_(() => Trade, {nullable: true})
    trade!: Trade

    @Index_()
    @ManyToOne_(() => Pool, {nullable: true})
    pool!: Pool
}
