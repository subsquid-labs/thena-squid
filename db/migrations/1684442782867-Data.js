module.exports = class Data1684442782867 {
    name = 'Data1684442782867'

    async up(db) {
        await db.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_af8728cf605f1988d2007d094f5"`)
        await db.query(`DROP INDEX "public"."IDX_af8728cf605f1988d2007d094f"`)
        await db.query(`DROP INDEX "public"."IDX_cfd2faba81ea3bd54ff0bc4c7b"`)
        await db.query(`ALTER TABLE "vote" DROP COLUMN "user_id"`)
        await db.query(`ALTER TABLE "gauge" DROP CONSTRAINT "FK_cfd2faba81ea3bd54ff0bc4c7be"`)
        await db.query(`ALTER TABLE "gauge" ALTER COLUMN "pool_id" SET NOT NULL`)
        await db.query(`ALTER TABLE "gauge" ADD CONSTRAINT "UQ_cfd2faba81ea3bd54ff0bc4c7be" UNIQUE ("pool_id")`)
        await db.query(`CREATE UNIQUE INDEX "IDX_cfd2faba81ea3bd54ff0bc4c7b" ON "gauge" ("pool_id") `)
        await db.query(`ALTER TABLE "gauge" ADD CONSTRAINT "FK_cfd2faba81ea3bd54ff0bc4c7be" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_af8728cf605f1988d2007d094f5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`CREATE INDEX "IDX_af8728cf605f1988d2007d094f" ON "vote" ("user_id") `)
        await db.query(`CREATE INDEX "IDX_cfd2faba81ea3bd54ff0bc4c7b" ON "gauge" ("pool_id") `)
        await db.query(`ALTER TABLE "vote" ADD "user_id" character varying`)
        await db.query(`ALTER TABLE "gauge" ADD CONSTRAINT "FK_cfd2faba81ea3bd54ff0bc4c7be" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "gauge" ALTER COLUMN "pool_id" DROP NOT NULL`)
        await db.query(`ALTER TABLE "gauge" DROP CONSTRAINT "UQ_cfd2faba81ea3bd54ff0bc4c7be"`)
        await db.query(`DROP INDEX "public"."IDX_cfd2faba81ea3bd54ff0bc4c7b"`)
        await db.query(`ALTER TABLE "gauge" DROP CONSTRAINT "FK_cfd2faba81ea3bd54ff0bc4c7be"`)
    }
}
