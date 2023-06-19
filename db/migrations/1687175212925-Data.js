module.exports = class Data1687175212925 {
    name = 'Data1687175212925'

    async up(db) {
        await db.query(`ALTER TABLE "trade" ADD "amount_usd" numeric NOT NULL`)
        await db.query(`ALTER TABLE "user" ADD "is_contract" boolean NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "trade" DROP COLUMN "amount_usd"`)
        await db.query(`ALTER TABLE "user" DROP COLUMN "is_contract"`)
    }
}
