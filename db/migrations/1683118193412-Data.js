module.exports = class Data1683118193412 {
    name = 'Data1683118193412'

    async up(db) {
        await db.query(`CREATE TABLE "token" ("id" character varying NOT NULL, "decimals" integer NOT NULL, "symbol" text NOT NULL, "bnb_price" numeric NOT NULL, "price_metadata" jsonb NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "trade" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "tx_hash" text NOT NULL, "token_in_id" character varying NOT NULL, "amount_in" numeric NOT NULL, "amount_in_usd" numeric NOT NULL, "token_out_id" character varying NOT NULL, "amount_out" numeric NOT NULL, "amount_out_usd" numeric NOT NULL, "user_id" character varying NOT NULL, "routes" text array NOT NULL, CONSTRAINT "PK_d4097908741dc408f8274ebdc53" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_0375572e2951b1d4bbcffba7a8" ON "trade" ("token_in_id") `)
        await db.query(`CREATE INDEX "IDX_97d1c649e05564aad9019dfd51" ON "trade" ("token_out_id") `)
        await db.query(`CREATE INDEX "IDX_ac40608b8665839bcbb69ab510" ON "trade" ("user_id") `)
        await db.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "balance" numeric NOT NULL, "first_interact_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "pool" ("id" character varying NOT NULL, "token0_id" character varying NOT NULL, "price0" numeric NOT NULL, "reserve0" numeric NOT NULL, "token1_id" character varying NOT NULL, "reserve1" numeric NOT NULL, "price1" numeric NOT NULL, "type" character varying(10) NOT NULL, "factory" text NOT NULL, "liquidity" numeric NOT NULL, "stable" boolean, CONSTRAINT "PK_db1bfe411e1516c01120b85f8fe" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_338531367ed63e3eb8e1939980" ON "pool" ("token0_id") `)
        await db.query(`CREATE INDEX "IDX_479321eabdd500587fddd0ee88" ON "pool" ("token1_id") `)
        await db.query(`CREATE TABLE "swap" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "tx_hash" text NOT NULL, "token_in_id" character varying NOT NULL, "amount_in" numeric NOT NULL, "amount_in_usd" numeric NOT NULL, "token_out_id" character varying NOT NULL, "amount_out" numeric NOT NULL, "amount_out_usd" numeric NOT NULL, "trade_id" character varying NOT NULL, "pool_id" character varying NOT NULL, CONSTRAINT "PK_4a10d0f359339acef77e7f986d9" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_852290ad0853e58d7420d9cb3b" ON "swap" ("token_in_id") `)
        await db.query(`CREATE INDEX "IDX_1382504cd8b45b062f1edd9f38" ON "swap" ("token_out_id") `)
        await db.query(`CREATE INDEX "IDX_430886e2ead1a1703463a9b7db" ON "swap" ("trade_id") `)
        await db.query(`CREATE INDEX "IDX_e78e7b899d2e3327494e5fe975" ON "swap" ("pool_id") `)
        await db.query(`CREATE TABLE "liquidity_position_update" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "tx_hash" text NOT NULL, "position_id" character varying NOT NULL, "amount" numeric NOT NULL, "amount0" numeric NOT NULL, "amount1" numeric NOT NULL, CONSTRAINT "PK_0587da67661b6f83eb6a1d72b67" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_918883c79f7dcfa9b5f145be1d" ON "liquidity_position_update" ("position_id") `)
        await db.query(`CREATE TABLE "liquidity_position" ("id" character varying NOT NULL, "user_id" character varying NOT NULL, "pool_id" character varying NOT NULL, "value" numeric NOT NULL, CONSTRAINT "PK_db00d963c96b3914d26abe3c3d2" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_781470585a67fef4e215a59977" ON "liquidity_position" ("user_id") `)
        await db.query(`CREATE INDEX "IDX_1ea3a8c063d805618b13bc8a37" ON "liquidity_position" ("pool_id") `)
        await db.query(`CREATE TABLE "hypervisor" ("id" character varying NOT NULL, "pool_id" character varying NOT NULL, "base_position_id" character varying, "limit_position_id" character varying, CONSTRAINT "PK_414ac88713d783fbd387bca4f28" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_9afa0f453b22e11977200ff523" ON "hypervisor" ("base_position_id") `)
        await db.query(`CREATE INDEX "IDX_1b64f1190bd45c5755191f6607" ON "hypervisor" ("limit_position_id") `)
        await db.query(`CREATE INDEX "IDX_ab7f486800cc26f8156197e7d6" ON "hypervisor" ("pool_id") `)
        await db.query(`ALTER TABLE "trade" ADD CONSTRAINT "FK_0375572e2951b1d4bbcffba7a8f" FOREIGN KEY ("token_in_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "trade" ADD CONSTRAINT "FK_97d1c649e05564aad9019dfd51d" FOREIGN KEY ("token_out_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "trade" ADD CONSTRAINT "FK_ac40608b8665839bcbb69ab510d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_338531367ed63e3eb8e1939980f" FOREIGN KEY ("token0_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_479321eabdd500587fddd0ee88b" FOREIGN KEY ("token1_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "swap" ADD CONSTRAINT "FK_852290ad0853e58d7420d9cb3b0" FOREIGN KEY ("token_in_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "swap" ADD CONSTRAINT "FK_1382504cd8b45b062f1edd9f386" FOREIGN KEY ("token_out_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "swap" ADD CONSTRAINT "FK_430886e2ead1a1703463a9b7dbb" FOREIGN KEY ("trade_id") REFERENCES "trade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "swap" ADD CONSTRAINT "FK_e78e7b899d2e3327494e5fe975d" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "liquidity_position_update" ADD CONSTRAINT "FK_918883c79f7dcfa9b5f145be1d7" FOREIGN KEY ("position_id") REFERENCES "liquidity_position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "liquidity_position" ADD CONSTRAINT "FK_781470585a67fef4e215a599773" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "liquidity_position" ADD CONSTRAINT "FK_1ea3a8c063d805618b13bc8a37b" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "hypervisor" ADD CONSTRAINT "FK_9afa0f453b22e11977200ff5239" FOREIGN KEY ("base_position_id") REFERENCES "liquidity_position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "hypervisor" ADD CONSTRAINT "FK_1b64f1190bd45c5755191f6607b" FOREIGN KEY ("limit_position_id") REFERENCES "liquidity_position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "hypervisor" ADD CONSTRAINT "FK_ab7f486800cc26f8156197e7d6d" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "token"`)
        await db.query(`DROP TABLE "trade"`)
        await db.query(`DROP INDEX "public"."IDX_0375572e2951b1d4bbcffba7a8"`)
        await db.query(`DROP INDEX "public"."IDX_97d1c649e05564aad9019dfd51"`)
        await db.query(`DROP INDEX "public"."IDX_ac40608b8665839bcbb69ab510"`)
        await db.query(`DROP TABLE "user"`)
        await db.query(`DROP TABLE "pool"`)
        await db.query(`DROP INDEX "public"."IDX_338531367ed63e3eb8e1939980"`)
        await db.query(`DROP INDEX "public"."IDX_479321eabdd500587fddd0ee88"`)
        await db.query(`DROP TABLE "swap"`)
        await db.query(`DROP INDEX "public"."IDX_852290ad0853e58d7420d9cb3b"`)
        await db.query(`DROP INDEX "public"."IDX_1382504cd8b45b062f1edd9f38"`)
        await db.query(`DROP INDEX "public"."IDX_430886e2ead1a1703463a9b7db"`)
        await db.query(`DROP INDEX "public"."IDX_e78e7b899d2e3327494e5fe975"`)
        await db.query(`DROP TABLE "liquidity_position_update"`)
        await db.query(`DROP INDEX "public"."IDX_918883c79f7dcfa9b5f145be1d"`)
        await db.query(`DROP TABLE "liquidity_position"`)
        await db.query(`DROP INDEX "public"."IDX_781470585a67fef4e215a59977"`)
        await db.query(`DROP INDEX "public"."IDX_1ea3a8c063d805618b13bc8a37"`)
        await db.query(`DROP TABLE "hypervisor"`)
        await db.query(`DROP INDEX "public"."IDX_9afa0f453b22e11977200ff523"`)
        await db.query(`DROP INDEX "public"."IDX_1b64f1190bd45c5755191f6607"`)
        await db.query(`DROP INDEX "public"."IDX_ab7f486800cc26f8156197e7d6"`)
        await db.query(`ALTER TABLE "trade" DROP CONSTRAINT "FK_0375572e2951b1d4bbcffba7a8f"`)
        await db.query(`ALTER TABLE "trade" DROP CONSTRAINT "FK_97d1c649e05564aad9019dfd51d"`)
        await db.query(`ALTER TABLE "trade" DROP CONSTRAINT "FK_ac40608b8665839bcbb69ab510d"`)
        await db.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_338531367ed63e3eb8e1939980f"`)
        await db.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_479321eabdd500587fddd0ee88b"`)
        await db.query(`ALTER TABLE "swap" DROP CONSTRAINT "FK_852290ad0853e58d7420d9cb3b0"`)
        await db.query(`ALTER TABLE "swap" DROP CONSTRAINT "FK_1382504cd8b45b062f1edd9f386"`)
        await db.query(`ALTER TABLE "swap" DROP CONSTRAINT "FK_430886e2ead1a1703463a9b7dbb"`)
        await db.query(`ALTER TABLE "swap" DROP CONSTRAINT "FK_e78e7b899d2e3327494e5fe975d"`)
        await db.query(`ALTER TABLE "liquidity_position_update" DROP CONSTRAINT "FK_918883c79f7dcfa9b5f145be1d7"`)
        await db.query(`ALTER TABLE "liquidity_position" DROP CONSTRAINT "FK_781470585a67fef4e215a599773"`)
        await db.query(`ALTER TABLE "liquidity_position" DROP CONSTRAINT "FK_1ea3a8c063d805618b13bc8a37b"`)
        await db.query(`ALTER TABLE "hypervisor" DROP CONSTRAINT "FK_9afa0f453b22e11977200ff5239"`)
        await db.query(`ALTER TABLE "hypervisor" DROP CONSTRAINT "FK_1b64f1190bd45c5755191f6607b"`)
        await db.query(`ALTER TABLE "hypervisor" DROP CONSTRAINT "FK_ab7f486800cc26f8156197e7d6d"`)
    }
}