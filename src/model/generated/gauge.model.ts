import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Pool} from "./pool.model"
import {Bribe} from "./bribe.model"
import {GaugeStake} from "./gaugeStake.model"

@Entity_()
export class Gauge {
    constructor(props?: Partial<Gauge>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Pool, {nullable: true})
    pool!: Pool | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalSupply!: bigint

    @Index_()
    @ManyToOne_(() => Bribe, {nullable: true})
    externalBribe!: Bribe

    @Index_()
    @ManyToOne_(() => Bribe, {nullable: true})
    internalBribe!: Bribe

    @Column_("bool", {nullable: false})
    isAlive!: boolean

    @OneToMany_(() => GaugeStake, e => e.gauge)
    stakes!: GaugeStake[]
}
