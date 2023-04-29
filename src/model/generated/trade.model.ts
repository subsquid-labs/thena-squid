import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Token} from "./token.model"
import {User} from "./user.model"

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

    @Column_("text", {nullable: false})
    tokenInId!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amountIn!: bigint

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: false})
    amountInUSD!: number

    @Column_("text", {nullable: false})
    tokenOutId!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amountOut!: bigint

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: false})
    amountOutUSD!: number

    @Column_("text", {nullable: false})
    userId!: string

    @Column_("text", {array: true, nullable: false})
    routes!: (string)[]

    /**
     * @private Use tokenInId instead
     */
    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    tokenIn!: Token

    /**
     * @private Use tokenOutId instead
     */
    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    tokenOut!: Token

    /**
     * @private Use userId instead
     */
    @Index_()
    @ManyToOne_(() => User, {nullable: true})
    user!: User
}
