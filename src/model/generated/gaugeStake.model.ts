import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Gauge} from "./gauge.model"
import {User} from "./user.model"

@Entity_()
export class GaugeStake {
    constructor(props?: Partial<GaugeStake>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Gauge, {nullable: true})
    gauge!: Gauge

    @Index_()
    @ManyToOne_(() => User, {nullable: true})
    user!: User

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    value!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    collectedReward!: bigint
}
