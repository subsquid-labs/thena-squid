module.exports = class Data1695359188675 {
    name = 'Data1695359188675'

    async up(db) {
        await db.query(`ALTER TABLE "trading_competition" ADD "participant_count" integer NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "trading_competition" DROP COLUMN "participant_count"`)
    }
}
