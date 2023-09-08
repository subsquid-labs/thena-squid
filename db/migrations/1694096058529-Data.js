module.exports = class Data1694096058529 {
    name = 'Data1694096058529'

    async up(db) {
        await db.query(`ALTER TABLE "thenian_nft" DROP COLUMN "attributes"`)
        await db.query(`ALTER TABLE "thenian_nft" DROP COLUMN "image"`)
        await db.query(`ALTER TABLE "thenian_nft" ADD "index" numeric NOT NULL`)
        await db.query(`ALTER TABLE "thenian_nft" ADD "meatadata" jsonb`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "thenian_nft" ADD "attributes" jsonb`)
        await db.query(`ALTER TABLE "thenian_nft" ADD "image" text NOT NULL`)
        await db.query(`ALTER TABLE "thenian_nft" DROP COLUMN "index"`)
        await db.query(`ALTER TABLE "thenian_nft" DROP COLUMN "meatadata"`)
    }
}
