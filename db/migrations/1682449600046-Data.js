module.exports = class Data1682449600046 {
    name = 'Data1682449600046'

    async up(db) {
        await db.query(`ALTER TABLE "liquidity_position_update" DROP CONSTRAINT "FK_b7c860c6c5296ea6e8c1fa02301"`)
        await db.query(`DROP INDEX "public"."IDX_b7c860c6c5296ea6e8c1fa0230"`)
        await db.query(`ALTER TABLE "liquidity_position_update" DROP COLUMN "liquidity_position_id"`)
        await db.query(`ALTER TABLE "liquidity_position_update" ADD "amount0" numeric NOT NULL`)
        await db.query(`ALTER TABLE "liquidity_position_update" ADD "amount1" numeric NOT NULL`)
        await db.query(`ALTER TABLE "liquidity_position_update" ADD "position_id" character varying`)
        await db.query(`CREATE INDEX "IDX_918883c79f7dcfa9b5f145be1d" ON "liquidity_position_update" ("position_id") `)
        await db.query(`ALTER TABLE "liquidity_position_update" ADD CONSTRAINT "FK_918883c79f7dcfa9b5f145be1d7" FOREIGN KEY ("position_id") REFERENCES "liquidity_position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "liquidity_position_update" ADD CONSTRAINT "FK_b7c860c6c5296ea6e8c1fa02301" FOREIGN KEY ("liquidity_position_id") REFERENCES "liquidity_position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`CREATE INDEX "IDX_b7c860c6c5296ea6e8c1fa0230" ON "liquidity_position_update" ("liquidity_position_id") `)
        await db.query(`ALTER TABLE "liquidity_position_update" ADD "liquidity_position_id" character varying`)
        await db.query(`ALTER TABLE "liquidity_position_update" DROP COLUMN "amount0"`)
        await db.query(`ALTER TABLE "liquidity_position_update" DROP COLUMN "amount1"`)
        await db.query(`ALTER TABLE "liquidity_position_update" DROP COLUMN "position_id"`)
        await db.query(`DROP INDEX "public"."IDX_918883c79f7dcfa9b5f145be1d"`)
        await db.query(`ALTER TABLE "liquidity_position_update" DROP CONSTRAINT "FK_918883c79f7dcfa9b5f145be1d7"`)
    }
}
