import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Token} from "./token.model"

@Entity_()
export class Pool {
    constructor(props?: Partial<Pool>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: false})
    token0Id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    price0!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    reserve0!: bigint

    @Column_("text", {nullable: false})
    token1Id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    reserve1!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    price1!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    liquidity!: bigint

    @Column_("bool", {nullable: true})
    stable!: boolean | undefined | null

    @Column_("text", {nullable: false})
    factory!: string

    /**
     * @private Use token0Id instead
     */
    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    token0!: Token

    /**
     * @private Use token1Id instead
     */
    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    token1!: Token
}
