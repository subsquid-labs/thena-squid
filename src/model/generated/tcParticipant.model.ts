import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {TradingCompetition} from "./tradingCompetition.model"
import {User} from "./user.model"

@Entity_()
export class TCParticipant {
    constructor(props?: Partial<TCParticipant>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => TradingCompetition, {nullable: true})
    tradingCompetition!: TradingCompetition

    @Index_()
    @ManyToOne_(() => User, {nullable: true})
    participant!: User

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    winAmount!: bigint

    @Column_("bool", {nullable: false})
    isFetched!: boolean
}
