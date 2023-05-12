module.exports = class Data1683627340848 {
    name = 'Data1683627340848'

    async up(db) {
        await db.query(`ALTER TABLE "pool" ADD "sqrt_price_x96" numeric`)
        await db.query(`ALTER TABLE "pool" ALTER COLUMN "price0" DROP NOT NULL`)
        await db.query(`ALTER TABLE "pool" ALTER COLUMN "price1" DROP NOT NULL`)
        await db.query(`ALTER TABLE "pool" ALTER COLUMN "factory" DROP NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "pool" DROP COLUMN "sqrt_price_x96"`)
        await db.query(`ALTER TABLE "pool" ALTER COLUMN "price0" SET NOT NULL`)
        await db.query(`ALTER TABLE "pool" ALTER COLUMN "price1" SET NOT NULL`)
        await db.query(`ALTER TABLE "pool" ALTER COLUMN "factory" SET NOT NULL`)
    }
}
