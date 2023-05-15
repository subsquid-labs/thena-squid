module.exports = class Data1684138231087 {
    name = 'Data1684138231087'

    async up(db) {
        await db.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_338531367ed63e3eb8e1939980f"`)
        await db.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_479321eabdd500587fddd0ee88b"`)
        await db.query(`ALTER TABLE "pool" ALTER COLUMN "token0_id" DROP NOT NULL`)
        await db.query(`ALTER TABLE "pool" ALTER COLUMN "token1_id" DROP NOT NULL`)
        await db.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_338531367ed63e3eb8e1939980f" FOREIGN KEY ("token0_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_479321eabdd500587fddd0ee88b" FOREIGN KEY ("token1_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_338531367ed63e3eb8e1939980f" FOREIGN KEY ("token0_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_479321eabdd500587fddd0ee88b" FOREIGN KEY ("token1_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "pool" ALTER COLUMN "token0_id" SET NOT NULL`)
        await db.query(`ALTER TABLE "pool" ALTER COLUMN "token1_id" SET NOT NULL`)
        await db.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_338531367ed63e3eb8e1939980f"`)
        await db.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_479321eabdd500587fddd0ee88b"`)
    }
}
