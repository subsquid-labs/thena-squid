module.exports = class Data1695306427435 {
    name = 'Data1695306427435'

    async up(db) {
        await db.query(`CREATE TABLE "username_nft" ("id" character varying NOT NULL, "index" numeric NOT NULL, "name" text NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "owner_id" character varying, CONSTRAINT "PK_1e44b0a8cbd1070db0728175f0e" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_eb55808fe2d8a210e3aeddc2cd" ON "username_nft" ("owner_id") `)
        await db.query(`ALTER TABLE "username_nft" ADD CONSTRAINT "FK_eb55808fe2d8a210e3aeddc2cd2" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "username_nft"`)
        await db.query(`DROP INDEX "public"."IDX_eb55808fe2d8a210e3aeddc2cd"`)
        await db.query(`ALTER TABLE "username_nft" DROP CONSTRAINT "FK_eb55808fe2d8a210e3aeddc2cd2"`)
    }
}
