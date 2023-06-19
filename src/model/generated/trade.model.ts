import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {User} from "./user.model"
import {Token} from "./token.model"

@Entity_()
export class Trade {
    constructor(props?: Partial<Trade>) {
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
    @ManyToOne_(() => User, {nullable: true})
    user!: User

    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    tokenIn!: Token

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amountIn!: bigint

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    amountInUSD!: number | undefined | null

    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    tokenOut!: Token

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amountOut!: bigint

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    amountOutUSD!: number | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: false})
    amountUSD!: number

    @Column_("text", {array: true, nullable: false})
    routes!: (string)[]
}
