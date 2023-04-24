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

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    reserved0!: bigint

    @Column_("text", {nullable: false})
    token1!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    reserved1!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    liquidity!: bigint
}
