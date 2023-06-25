import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Trade} from "./trade.model"
import {LiquidityPosition} from "./liquidityPosition.model"
import {VeToken} from "./veToken.model"
import {GaugeStake} from "./gaugeStake.model"

@Entity_()
export class User {
    constructor(props?: Partial<User>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    balance!: bigint

    @Column_("timestamp with time zone", {nullable: false})
    firstInteractAt!: Date

    @Index_()
    @Column_("bool", {nullable: false})
    isContract!: boolean

    @OneToMany_(() => Trade, e => e.user)
    trades!: Trade[]

    @OneToMany_(() => LiquidityPosition, e => e.user)
    liquidityPositions!: LiquidityPosition[]

    @OneToMany_(() => VeToken, e => e.owner)
    veTokens!: VeToken[]

    @OneToMany_(() => GaugeStake, e => e.user)
    stakes!: GaugeStake[]
}
