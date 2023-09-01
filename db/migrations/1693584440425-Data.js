module.exports = class Data1693584440425 {
    name = 'Data1693584440425'

    async up(db) {
        await db.query(`CREATE TABLE "trading_competition" ("id" character varying NOT NULL, "entry_fee" numeric NOT NULL, "max_participants" numeric NOT NULL, "owner" text NOT NULL, "trading_competition" text NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "timestamp" jsonb NOT NULL, "market" character varying(10) NOT NULL, "prize" jsonb NOT NULL, "competition_rules" jsonb NOT NULL, CONSTRAINT "PK_5513275d9d459339033d6b5b6e8" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "trading_competition"`)
    }
}
