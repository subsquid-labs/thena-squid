module.exports = class Data1687187783448 {
    name = 'Data1687187783448'

    async up(db) {
        await db.query(`CREATE INDEX "IDX_7d1183b369af1d43037669ed55" ON "trade" ("block_number") `)
        await db.query(`CREATE INDEX "IDX_6e026735f2ca327c6b0e0a7250" ON "trade" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_167debcd55a8265fb06bfcc20d" ON "user" ("is_contract") `)
    }

    async down(db) {
        await db.query(`DROP INDEX "public"."IDX_7d1183b369af1d43037669ed55"`)
        await db.query(`DROP INDEX "public"."IDX_6e026735f2ca327c6b0e0a7250"`)
        await db.query(`DROP INDEX "public"."IDX_167debcd55a8265fb06bfcc20d"`)
    }
}
