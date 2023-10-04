module.exports = class Data1696438900984 {
    name = 'Data1696438900984'

    async up(db) {
        await db.query(`ALTER TABLE "tc_participant" DROP COLUMN "is_fetched"`)
        await db.query(`ALTER TABLE "tc_participant" ADD "start_balance" numeric NOT NULL`)
        await db.query(`ALTER TABLE "tc_participant" ADD "pnl" numeric NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "tc_participant" ADD "is_fetched" boolean NOT NULL`)
        await db.query(`ALTER TABLE "tc_participant" DROP COLUMN "start_balance"`)
        await db.query(`ALTER TABLE "tc_participant" DROP COLUMN "pnl"`)
    }
}
