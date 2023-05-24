module.exports = class Data1684446414786 {
    name = 'Data1684446414786'

    async up(db) {
        await db.query(`DROP INDEX "public"."IDX_cfd2faba81ea3bd54ff0bc4c7b"`)
        await db.query(`ALTER TABLE "gauge" DROP CONSTRAINT "FK_cfd2faba81ea3bd54ff0bc4c7be"`)
        await db.query(`ALTER TABLE "gauge" ALTER COLUMN "pool_id" DROP NOT NULL`)
        await db.query(`ALTER TABLE "gauge" DROP CONSTRAINT "UQ_cfd2faba81ea3bd54ff0bc4c7be"`)
        await db.query(`CREATE INDEX "IDX_cfd2faba81ea3bd54ff0bc4c7b" ON "gauge" ("pool_id") `)
        await db.query(`ALTER TABLE "gauge" ADD CONSTRAINT "FK_cfd2faba81ea3bd54ff0bc4c7be" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`CREATE UNIQUE INDEX "IDX_cfd2faba81ea3bd54ff0bc4c7b" ON "gauge" ("pool_id") `)
        await db.query(`ALTER TABLE "gauge" ADD CONSTRAINT "FK_cfd2faba81ea3bd54ff0bc4c7be" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "gauge" ALTER COLUMN "pool_id" SET NOT NULL`)
        await db.query(`ALTER TABLE "gauge" ADD CONSTRAINT "UQ_cfd2faba81ea3bd54ff0bc4c7be" UNIQUE ("pool_id")`)
        await db.query(`DROP INDEX "public"."IDX_cfd2faba81ea3bd54ff0bc4c7b"`)
        await db.query(`ALTER TABLE "gauge" DROP CONSTRAINT "FK_cfd2faba81ea3bd54ff0bc4c7be"`)
    }
}
