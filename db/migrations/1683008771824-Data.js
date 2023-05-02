module.exports = class Data1683008771824 {
    name = 'Data1683008771824'

    async up(db) {
        await db.query(`CREATE TABLE "hypervisor" ("id" character varying NOT NULL, "pool_id" character varying NOT NULL, "base_position_id" character varying, "limit_position_id" character varying, CONSTRAINT "PK_414ac88713d783fbd387bca4f28" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_9afa0f453b22e11977200ff523" ON "hypervisor" ("base_position_id") `)
        await db.query(`CREATE INDEX "IDX_1b64f1190bd45c5755191f6607" ON "hypervisor" ("limit_position_id") `)
        await db.query(`CREATE INDEX "IDX_ab7f486800cc26f8156197e7d6" ON "hypervisor" ("pool_id") `)
        await db.query(`ALTER TABLE "token" ADD "symbol" text NOT NULL`)
        await db.query(`ALTER TABLE "hypervisor" ADD CONSTRAINT "FK_9afa0f453b22e11977200ff5239" FOREIGN KEY ("base_position_id") REFERENCES "liquidity_position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "hypervisor" ADD CONSTRAINT "FK_1b64f1190bd45c5755191f6607b" FOREIGN KEY ("limit_position_id") REFERENCES "liquidity_position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "hypervisor" ADD CONSTRAINT "FK_ab7f486800cc26f8156197e7d6d" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "hypervisor"`)
        await db.query(`DROP INDEX "public"."IDX_9afa0f453b22e11977200ff523"`)
        await db.query(`DROP INDEX "public"."IDX_1b64f1190bd45c5755191f6607"`)
        await db.query(`DROP INDEX "public"."IDX_ab7f486800cc26f8156197e7d6"`)
        await db.query(`ALTER TABLE "token" DROP COLUMN "symbol"`)
        await db.query(`ALTER TABLE "hypervisor" DROP CONSTRAINT "FK_9afa0f453b22e11977200ff5239"`)
        await db.query(`ALTER TABLE "hypervisor" DROP CONSTRAINT "FK_1b64f1190bd45c5755191f6607b"`)
        await db.query(`ALTER TABLE "hypervisor" DROP CONSTRAINT "FK_ab7f486800cc26f8156197e7d6d"`)
    }
}
