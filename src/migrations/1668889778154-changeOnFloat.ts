import { MigrationInterface, QueryRunner } from "typeorm";

export class changeOnFloat1668889778154 implements MigrationInterface {
    name = 'changeOnFloat1668889778154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_history" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "transaction_history" ADD "value" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_history" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "transaction_history" ADD "value" integer NOT NULL`);
    }

}
