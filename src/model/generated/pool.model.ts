import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Pool {
    constructor(props?: Partial<Pool>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: false})
    factory!: string

    @Column_("text", {nullable: false})
    token0!: string

    @Column_("text", {nullable: false})
    token1!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    reserve0!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    reserve1!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    price0!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    price1!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    liquidity!: bigint

    @Column_("bool", {nullable: true})
    stable!: boolean | undefined | null
}
