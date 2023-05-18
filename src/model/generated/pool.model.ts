import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {PoolType} from "./_poolType"
import {Token} from "./token.model"
import {Gauge} from "./gauge.model"
import {Bribe} from "./bribe.model"
import {LiquidityPosition} from "./liquidityPosition.model"

@Entity_()
export class Pool {
    constructor(props?: Partial<Pool>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("varchar", {length: 10, nullable: false})
    type!: PoolType

    @Column_("text", {nullable: true})
    factory!: string | undefined | null

    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    token0!: Token

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    reserve0!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    price0!: bigint | undefined | null

    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    token1!: Token

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    reserve1!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    price1!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    liquidity!: bigint

    @Column_("bool", {nullable: true})
    stable!: boolean | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    sqrtPriceX96!: bigint | undefined | null


    @OneToMany_(() => Bribe, e => e.pool)
    bribes!: Bribe[]

    @OneToMany_(() => LiquidityPosition, e => e.pool)
    liquidityPositions!: LiquidityPosition[]
}
