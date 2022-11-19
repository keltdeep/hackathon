import { MigrationInterface, QueryRunner } from "typeorm";

export class addHistoryValue1668888145644 implements MigrationInterface {
    name = 'addHistoryValue1668888145644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transaction_history_type_enum" AS ENUM('convert', 'replenishment')`);
        await queryRunner.query(`CREATE TABLE "transaction_history" ("id" SERIAL NOT NULL, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fromCurrency" character varying NOT NULL, "toCurrency" character varying NOT NULL, "type" "public"."transaction_history_type_enum" NOT NULL, "value" integer NOT NULL, "scoreUuid" character varying NOT NULL, CONSTRAINT "PK_1e2444ea77f6b5952b4ab7cb9a2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transaction_history"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_history_type_enum"`);
    }

}
