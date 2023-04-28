import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"
import {TokenPriceMetadata} from "./_tokenPriceMetadata"

@Entity_()
export class Token {
    constructor(props?: Partial<Token>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("int4", {nullable: false})
    decimals!: number

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    bnbPrice!: bigint

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : new TokenPriceMetadata(undefined, obj)}, nullable: false})
    priceMetadata!: TokenPriceMetadata
}
