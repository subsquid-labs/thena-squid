module.exports = class Data1694212947449 {
    name = 'Data1694212947449'

    async up(db) {
        await db.query(`CREATE TABLE "tc_participant" ("id" character varying NOT NULL, "win_amount" numeric NOT NULL, "is_fetched" boolean NOT NULL, "trading_competition_id" character varying, "participant_id" character varying, CONSTRAINT "PK_9753920a747192e78bce138662a" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_a3f189ed49fe6cfb862cb8e6e8" ON "tc_participant" ("trading_competition_id") `)
        await db.query(`CREATE INDEX "IDX_4654e01dc849f82d6df4e56d1f" ON "tc_participant" ("participant_id") `)
        await db.query(`ALTER TABLE "trading_competition" DROP COLUMN "owner"`)
        await db.query(`ALTER TABLE "trading_competition" DROP COLUMN "trading_competition"`)
        await db.query(`ALTER TABLE "trading_competition" ADD "trading_competition_spot" text NOT NULL`)
        await db.query(`ALTER TABLE "trading_competition" ADD "owner_id" character varying`)
        await db.query(`CREATE INDEX "IDX_03471998d1103123b15a4759d1" ON "trading_competition" ("owner_id") `)
        await db.query(`ALTER TABLE "tc_participant" ADD CONSTRAINT "FK_a3f189ed49fe6cfb862cb8e6e86" FOREIGN KEY ("trading_competition_id") REFERENCES "trading_competition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "tc_participant" ADD CONSTRAINT "FK_4654e01dc849f82d6df4e56d1fa" FOREIGN KEY ("participant_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "trading_competition" ADD CONSTRAINT "FK_03471998d1103123b15a4759d1f" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "tc_participant"`)
        await db.query(`DROP INDEX "public"."IDX_a3f189ed49fe6cfb862cb8e6e8"`)
        await db.query(`DROP INDEX "public"."IDX_4654e01dc849f82d6df4e56d1f"`)
        await db.query(`ALTER TABLE "trading_competition" ADD "owner" text NOT NULL`)
        await db.query(`ALTER TABLE "trading_competition" ADD "trading_competition" text NOT NULL`)
        await db.query(`ALTER TABLE "trading_competition" DROP COLUMN "trading_competition_spot"`)
        await db.query(`ALTER TABLE "trading_competition" DROP COLUMN "owner_id"`)
        await db.query(`DROP INDEX "public"."IDX_03471998d1103123b15a4759d1"`)
        await db.query(`ALTER TABLE "tc_participant" DROP CONSTRAINT "FK_a3f189ed49fe6cfb862cb8e6e86"`)
        await db.query(`ALTER TABLE "tc_participant" DROP CONSTRAINT "FK_4654e01dc849f82d6df4e56d1fa"`)
        await db.query(`ALTER TABLE "trading_competition" DROP CONSTRAINT "FK_03471998d1103123b15a4759d1f"`)
    }
}
