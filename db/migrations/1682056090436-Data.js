module.exports = class Data1682056090436 {
    name = 'Data1682056090436'

    async up(db) {
        await db.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "balance" numeric NOT NULL, "first_interact_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "swap" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "tx_hash" text NOT NULL, "token_in" text NOT NULL, "amount_in" numeric NOT NULL, "token_out" text NOT NULL, "amount_out" numeric NOT NULL, "routes" text array NOT NULL, "user_id" character varying, CONSTRAINT "PK_4a10d0f359339acef77e7f986d9" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_085918705c8c599cc361007ede" ON "swap" ("user_id") `)
        await db.query(`CREATE TABLE "solidly_pair" ("id" character varying NOT NULL, "token0" text NOT NULL, "token1" text NOT NULL, CONSTRAINT "PK_e69255d97c10b45bb50c62f459c" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "algebra_pool" ("id" character varying NOT NULL, "token0" text NOT NULL, "token1" text NOT NULL, CONSTRAINT "PK_ed59008d3b4632b71a294588250" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "swap" ADD CONSTRAINT "FK_085918705c8c599cc361007edee" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "user"`)
        await db.query(`DROP TABLE "swap"`)
        await db.query(`DROP INDEX "public"."IDX_085918705c8c599cc361007ede"`)
        await db.query(`DROP TABLE "solidly_pair"`)
        await db.query(`DROP TABLE "algebra_pool"`)
        await db.query(`ALTER TABLE "swap" DROP CONSTRAINT "FK_085918705c8c599cc361007edee"`)
    }
}
