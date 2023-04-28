module.exports = class Data1682681866851 {
    name = 'Data1682681866851'

    async up(db) {
        await db.query(`ALTER TABLE "pool" ADD "stable" boolean`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "pool" DROP COLUMN "stable"`)
    }
}
