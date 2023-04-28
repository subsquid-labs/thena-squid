module.exports = class Data1682680000257 {
    name = 'Data1682680000257'

    async up(db) {
        await db.query(`ALTER TABLE "pool" ADD "price0" numeric NOT NULL`)
        await db.query(`ALTER TABLE "pool" ADD "price1" numeric NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "pool" DROP COLUMN "price0"`)
        await db.query(`ALTER TABLE "pool" DROP COLUMN "price1"`)
    }
}
