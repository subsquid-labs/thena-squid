module.exports = class Data1684341021939 {
    name = 'Data1684341021939'

    async up(db) {
        await db.query(`ALTER TABLE "bribe" RENAME COLUMN "total_supply" TO "pool_id"`)
        await db.query(`ALTER TABLE "gauge_stake" RENAME COLUMN "collected_reward" TO "total_reward"`)
        await db.query(`ALTER TABLE "vote" DROP COLUMN "block_number"`)
        await db.query(`ALTER TABLE "vote" DROP COLUMN "timestamp"`)
        await db.query(`ALTER TABLE "vote" DROP COLUMN "tx_hash"`)
        await db.query(`ALTER TABLE "ve_token" ADD "value" numeric NOT NULL`)
        await db.query(`ALTER TABLE "ve_token" ADD "locked_until" TIMESTAMP WITH TIME ZONE NOT NULL`)
        await db.query(`ALTER TABLE "ve_token" ADD "total_reward" numeric NOT NULL`)
        await db.query(`ALTER TABLE "bribe" DROP COLUMN "pool_id"`)
        await db.query(`ALTER TABLE "bribe" ADD "pool_id" character varying`)
        await db.query(`CREATE INDEX "IDX_6b1b1e1b708920c078a289184f" ON "bribe" ("pool_id") `)
        await db.query(`ALTER TABLE "bribe" ADD CONSTRAINT "FK_6b1b1e1b708920c078a289184f7" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "bribe" RENAME COLUMN "pool_id" TO "total_supply"`)
        await db.query(`ALTER TABLE "gauge_stake" RENAME COLUMN "total_reward" TO "collected_reward"`)
        await db.query(`ALTER TABLE "vote" ADD "block_number" integer NOT NULL`)
        await db.query(`ALTER TABLE "vote" ADD "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL`)
        await db.query(`ALTER TABLE "vote" ADD "tx_hash" text NOT NULL`)
        await db.query(`ALTER TABLE "ve_token" DROP COLUMN "value"`)
        await db.query(`ALTER TABLE "ve_token" DROP COLUMN "locked_until"`)
        await db.query(`ALTER TABLE "ve_token" DROP COLUMN "total_reward"`)
        await db.query(`ALTER TABLE "bribe" ADD "pool_id" numeric NOT NULL`)
        await db.query(`ALTER TABLE "bribe" DROP COLUMN "pool_id"`)
        await db.query(`DROP INDEX "public"."IDX_6b1b1e1b708920c078a289184f"`)
        await db.query(`ALTER TABLE "bribe" DROP CONSTRAINT "FK_6b1b1e1b708920c078a289184f7"`)
    }
}
