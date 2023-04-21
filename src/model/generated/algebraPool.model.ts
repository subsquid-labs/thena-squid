import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class AlgebraPool {
    constructor(props?: Partial<AlgebraPool>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: false})
    token0!: string

    @Column_("text", {nullable: false})
    token1!: string
}
