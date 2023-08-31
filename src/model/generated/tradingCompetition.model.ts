import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"
import {TimestampInfo} from "./_timestampInfo"
import {MarketType} from "./_marketType"
import {Prize} from "./_prize"
import {CompetitionRules} from "./_competitionRules"

@Entity_()
export class TradingCompetition {
    constructor(props?: Partial<TradingCompetition>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    entryFee!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    maxParticipants!: bigint

    @Column_("text", {nullable: false})
    owner!: string

    @Column_("text", {nullable: false})
    tradingCompetition!: string

    @Column_("text", {nullable: false})
    name!: string

    @Column_("text", {nullable: false})
    description!: string

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : new TimestampInfo(undefined, obj)}, nullable: false})
    timestamp!: TimestampInfo

    @Column_("varchar", {length: 10, nullable: false})
    market!: MarketType

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : new Prize(undefined, obj)}, nullable: false})
    prize!: Prize

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : new CompetitionRules(undefined, obj)}, nullable: false})
    competitionRules!: CompetitionRules
}
