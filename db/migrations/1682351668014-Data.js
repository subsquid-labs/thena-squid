module.exports = class Data1682351668014 {
    name = 'Data1682351668014'

    async up(db) {
        await db.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "balance" numeric NOT NULL, "first_interact_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "trade" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "tx_hash" text NOT NULL, "token_in" text NOT NULL, "amount_in" numeric NOT NULL, "token_out" text NOT NULL, "amount_out" numeric NOT NULL, "routes" text array NOT NULL, "user_id" character varying, CONSTRAINT "PK_d4097908741dc408f8274ebdc53" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_ac40608b8665839bcbb69ab510" ON "trade" ("user_id") `)
        await db.query(`CREATE TABLE "pool" ("id" character varying NOT NULL, "factory" text NOT NULL, "token0" text NOT NULL, "reserved0" numeric NOT NULL, "token1" text NOT NULL, "reserved1" numeric NOT NULL, "liquidity" numeric NOT NULL, CONSTRAINT "PK_db1bfe411e1516c01120b85f8fe" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "trade" ADD CONSTRAINT "FK_ac40608b8665839bcbb69ab510d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "user"`)
        await db.query(`DROP TABLE "trade"`)
        await db.query(`DROP INDEX "public"."IDX_ac40608b8665839bcbb69ab510"`)
        await db.query(`DROP TABLE "pool"`)
        await db.query(`ALTER TABLE "trade" DROP CONSTRAINT "FK_ac40608b8665839bcbb69ab510d"`)
    }
}
