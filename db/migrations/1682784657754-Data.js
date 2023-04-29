module.exports = class Data1682784657754 {
    name = 'Data1682784657754'

    async up(db) {
        await db.query(`ALTER TABLE "trade" DROP COLUMN "token_in"`)
        await db.query(`ALTER TABLE "trade" DROP COLUMN "token_out"`)
        await db.query(`ALTER TABLE "pool" DROP COLUMN "token0"`)
        await db.query(`ALTER TABLE "pool" DROP COLUMN "token1"`)
        await db.query(`ALTER TABLE "trade" ADD "token_in_id" character varying NOT NULL`)
        await db.query(`ALTER TABLE "trade" ADD "amount_in_usd" numeric NOT NULL`)
        await db.query(`ALTER TABLE "trade" ADD "token_out_id" character varying NOT NULL`)
        await db.query(`ALTER TABLE "trade" ADD "amount_out_usd" numeric NOT NULL`)
        await db.query(`ALTER TABLE "pool" ADD "token0_id" character varying NOT NULL`)
        await db.query(`ALTER TABLE "pool" ADD "token1_id" character varying NOT NULL`)
        await db.query(`ALTER TABLE "trade" DROP CONSTRAINT "FK_ac40608b8665839bcbb69ab510d"`)
        await db.query(`ALTER TABLE "trade" ALTER COLUMN "user_id" SET NOT NULL`)
        await db.query(`ALTER TABLE "liquidity_position_update" DROP CONSTRAINT "FK_918883c79f7dcfa9b5f145be1d7"`)
        await db.query(`ALTER TABLE "liquidity_position_update" ALTER COLUMN "position_id" SET NOT NULL`)
        await db.query(`ALTER TABLE "liquidity_position" DROP CONSTRAINT "FK_781470585a67fef4e215a599773"`)
        await db.query(`ALTER TABLE "liquidity_position" DROP CONSTRAINT "FK_1ea3a8c063d805618b13bc8a37b"`)
        await db.query(`ALTER TABLE "liquidity_position" ALTER COLUMN "user_id" SET NOT NULL`)
        await db.query(`ALTER TABLE "liquidity_position" ALTER COLUMN "pool_id" SET NOT NULL`)
        await db.query(`CREATE INDEX "IDX_0375572e2951b1d4bbcffba7a8" ON "trade" ("token_in_id") `)
        await db.query(`CREATE INDEX "IDX_97d1c649e05564aad9019dfd51" ON "trade" ("token_out_id") `)
        await db.query(`CREATE INDEX "IDX_338531367ed63e3eb8e1939980" ON "pool" ("token0_id") `)
        await db.query(`CREATE INDEX "IDX_479321eabdd500587fddd0ee88" ON "pool" ("token1_id") `)
        await db.query(`ALTER TABLE "trade" ADD CONSTRAINT "FK_0375572e2951b1d4bbcffba7a8f" FOREIGN KEY ("token_in_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "trade" ADD CONSTRAINT "FK_97d1c649e05564aad9019dfd51d" FOREIGN KEY ("token_out_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "trade" ADD CONSTRAINT "FK_ac40608b8665839bcbb69ab510d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_338531367ed63e3eb8e1939980f" FOREIGN KEY ("token0_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_479321eabdd500587fddd0ee88b" FOREIGN KEY ("token1_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "liquidity_position_update" ADD CONSTRAINT "FK_918883c79f7dcfa9b5f145be1d7" FOREIGN KEY ("position_id") REFERENCES "liquidity_position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "liquidity_position" ADD CONSTRAINT "FK_781470585a67fef4e215a599773" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "liquidity_position" ADD CONSTRAINT "FK_1ea3a8c063d805618b13bc8a37b" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "trade" ADD "token_in" text NOT NULL`)
        await db.query(`ALTER TABLE "trade" ADD "token_out" text NOT NULL`)
        await db.query(`ALTER TABLE "pool" ADD "token0" text NOT NULL`)
        await db.query(`ALTER TABLE "pool" ADD "token1" text NOT NULL`)
        await db.query(`ALTER TABLE "trade" DROP COLUMN "token_in_id"`)
        await db.query(`ALTER TABLE "trade" DROP COLUMN "amount_in_usd"`)
        await db.query(`ALTER TABLE "trade" DROP COLUMN "token_out_id"`)
        await db.query(`ALTER TABLE "trade" DROP COLUMN "amount_out_usd"`)
        await db.query(`ALTER TABLE "pool" DROP COLUMN "token0_id"`)
        await db.query(`ALTER TABLE "pool" DROP COLUMN "token1_id"`)
        await db.query(`ALTER TABLE "trade" ADD CONSTRAINT "FK_ac40608b8665839bcbb69ab510d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "trade" ALTER COLUMN "user_id" DROP NOT NULL`)
        await db.query(`ALTER TABLE "liquidity_position_update" ADD CONSTRAINT "FK_918883c79f7dcfa9b5f145be1d7" FOREIGN KEY ("position_id") REFERENCES "liquidity_position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "liquidity_position_update" ALTER COLUMN "position_id" DROP NOT NULL`)
        await db.query(`ALTER TABLE "liquidity_position" ADD CONSTRAINT "FK_781470585a67fef4e215a599773" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "liquidity_position" ADD CONSTRAINT "FK_1ea3a8c063d805618b13bc8a37b" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "liquidity_position" ALTER COLUMN "user_id" DROP NOT NULL`)
        await db.query(`ALTER TABLE "liquidity_position" ALTER COLUMN "pool_id" DROP NOT NULL`)
        await db.query(`DROP INDEX "public"."IDX_0375572e2951b1d4bbcffba7a8"`)
        await db.query(`DROP INDEX "public"."IDX_97d1c649e05564aad9019dfd51"`)
        await db.query(`DROP INDEX "public"."IDX_338531367ed63e3eb8e1939980"`)
        await db.query(`DROP INDEX "public"."IDX_479321eabdd500587fddd0ee88"`)
        await db.query(`ALTER TABLE "trade" DROP CONSTRAINT "FK_0375572e2951b1d4bbcffba7a8f"`)
        await db.query(`ALTER TABLE "trade" DROP CONSTRAINT "FK_97d1c649e05564aad9019dfd51d"`)
        await db.query(`ALTER TABLE "trade" DROP CONSTRAINT "FK_ac40608b8665839bcbb69ab510d"`)
        await db.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_338531367ed63e3eb8e1939980f"`)
        await db.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_479321eabdd500587fddd0ee88b"`)
        await db.query(`ALTER TABLE "liquidity_position_update" DROP CONSTRAINT "FK_918883c79f7dcfa9b5f145be1d7"`)
        await db.query(`ALTER TABLE "liquidity_position" DROP CONSTRAINT "FK_781470585a67fef4e215a599773"`)
        await db.query(`ALTER TABLE "liquidity_position" DROP CONSTRAINT "FK_1ea3a8c063d805618b13bc8a37b"`)
    }
}
