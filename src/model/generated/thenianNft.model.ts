import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {ThenianNftMetadata} from "./_thenianNftMetadata"
import {User} from "./user.model"

@Entity_()
export class ThenianNft {
    constructor(props?: Partial<ThenianNft>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    index!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    timestamp!: bigint

    @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new ThenianNftMetadata(undefined, obj)}, nullable: true})
    meatadata!: ThenianNftMetadata | undefined | null

    @Index_()
    @ManyToOne_(() => User, {nullable: true})
    owner!: User
}
