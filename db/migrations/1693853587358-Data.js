module.exports = class Data1693853587358 {
    name = 'Data1693853587358'

    async up(db) {
        await db.query(`CREATE TABLE "thenian_nft" ("id" character varying NOT NULL, "image" text NOT NULL, "attributes" jsonb, "timestamp" numeric NOT NULL, "owner_id" character varying, CONSTRAINT "PK_4e8220a1108e68451416446a799" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d55f44089cdbcc54c275a67108" ON "thenian_nft" ("owner_id") `)
        await db.query(`ALTER TABLE "thenian_nft" ADD CONSTRAINT "FK_d55f44089cdbcc54c275a67108e" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "thenian_nft"`)
        await db.query(`DROP INDEX "public"."IDX_d55f44089cdbcc54c275a67108"`)
        await db.query(`ALTER TABLE "thenian_nft" DROP CONSTRAINT "FK_d55f44089cdbcc54c275a67108e"`)
    }
}
