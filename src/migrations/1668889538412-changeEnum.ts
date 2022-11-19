import { MigrationInterface, QueryRunner } from "typeorm";

export class changeEnum1668889538412 implements MigrationInterface {
    name = 'changeEnum1668889538412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."transaction_history_type_enum" RENAME TO "transaction_history_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_history_type_enum" AS ENUM('buy', 'replenishment')`);
        await queryRunner.query(`ALTER TABLE "transaction_history" ALTER COLUMN "type" TYPE "public"."transaction_history_type_enum" USING "type"::"text"::"public"."transaction_history_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_history_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transaction_history_type_enum_old" AS ENUM('convert', 'replenishment')`);
        await queryRunner.query(`ALTER TABLE "transaction_history" ALTER COLUMN "type" TYPE "public"."transaction_history_type_enum_old" USING "type"::"text"::"public"."transaction_history_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_history_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."transaction_history_type_enum_old" RENAME TO "transaction_history_type_enum"`);
    }

}
