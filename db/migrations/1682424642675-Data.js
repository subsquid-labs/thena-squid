module.exports = class Data1682424642675 {
    name = 'Data1682424642675'

    async up(db) {
        await db.query(`CREATE TABLE "trade" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "tx_hash" text NOT NULL, "token_in" text NOT NULL, "amount_in" numeric NOT NULL, "token_out" text NOT NULL, "amount_out" numeric NOT NULL, "routes" text array NOT NULL, "user_id" character varying, CONSTRAINT "PK_d4097908741dc408f8274ebdc53" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_ac40608b8665839bcbb69ab510" ON "trade" ("user_id") `)
        await db.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "balance" numeric NOT NULL, "first_interact_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "pool" ("id" character varying NOT NULL, "factory" text NOT NULL, "token0" text NOT NULL, "token1" text NOT NULL, "reserve0" numeric NOT NULL, "reserve1" numeric NOT NULL, "liquidity" numeric NOT NULL, CONSTRAINT "PK_db1bfe411e1516c01120b85f8fe" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "liquidity_position_update" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "tx_hash" text NOT NULL, "amount" numeric NOT NULL, "liquidity_position_id" character varying, CONSTRAINT "PK_0587da67661b6f83eb6a1d72b67" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_b7c860c6c5296ea6e8c1fa0230" ON "liquidity_position_update" ("liquidity_position_id") `)
        await db.query(`CREATE TABLE "liquidity_position" ("id" character varying NOT NULL, "value" numeric NOT NULL, "user_id" character varying, "pool_id" character varying, CONSTRAINT "PK_db00d963c96b3914d26abe3c3d2" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_781470585a67fef4e215a59977" ON "liquidity_position" ("user_id") `)
        await db.query(`CREATE INDEX "IDX_1ea3a8c063d805618b13bc8a37" ON "liquidity_position" ("pool_id") `)
        await db.query(`ALTER TABLE "trade" ADD CONSTRAINT "FK_ac40608b8665839bcbb69ab510d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "liquidity_position_update" ADD CONSTRAINT "FK_b7c860c6c5296ea6e8c1fa02301" FOREIGN KEY ("liquidity_position_id") REFERENCES "liquidity_position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "liquidity_position" ADD CONSTRAINT "FK_781470585a67fef4e215a599773" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "liquidity_position" ADD CONSTRAINT "FK_1ea3a8c063d805618b13bc8a37b" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "trade"`)
        await db.query(`DROP INDEX "public"."IDX_ac40608b8665839bcbb69ab510"`)
        await db.query(`DROP TABLE "user"`)
        await db.query(`DROP TABLE "pool"`)
        await db.query(`DROP TABLE "liquidity_position_update"`)
        await db.query(`DROP INDEX "public"."IDX_b7c860c6c5296ea6e8c1fa0230"`)
        await db.query(`DROP TABLE "liquidity_position"`)
        await db.query(`DROP INDEX "public"."IDX_781470585a67fef4e215a59977"`)
        await db.query(`DROP INDEX "public"."IDX_1ea3a8c063d805618b13bc8a37"`)
        await db.query(`ALTER TABLE "trade" DROP CONSTRAINT "FK_ac40608b8665839bcbb69ab510d"`)
        await db.query(`ALTER TABLE "liquidity_position_update" DROP CONSTRAINT "FK_b7c860c6c5296ea6e8c1fa02301"`)
        await db.query(`ALTER TABLE "liquidity_position" DROP CONSTRAINT "FK_781470585a67fef4e215a599773"`)
        await db.query(`ALTER TABLE "liquidity_position" DROP CONSTRAINT "FK_1ea3a8c063d805618b13bc8a37b"`)
    }
}
