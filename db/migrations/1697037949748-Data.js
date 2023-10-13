module.exports = class Data1697037949748 {
    name = 'Data1697037949748'

    async up(db) {
        await db.query(`ALTER TABLE "tc_participant" ADD "win_token_price_in_usd" numeric NOT NULL`)
        await db.query(`ALTER TABLE "tc_participant" ADD "win_token_decimal" integer NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "tc_participant" DROP COLUMN "win_token_price_in_usd"`)
        await db.query(`ALTER TABLE "tc_participant" DROP COLUMN "win_token_decimal"`)
    }
}
