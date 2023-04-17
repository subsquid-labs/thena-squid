module.exports = class Data1681743476811 {
    name = 'Data1681743476811'

    async up(db) {
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "balance" numeric NOT NULL, "first_interact_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "account"`)
    }
}
