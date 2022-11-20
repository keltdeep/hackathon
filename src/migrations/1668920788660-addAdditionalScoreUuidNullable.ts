import { MigrationInterface, QueryRunner } from "typeorm";

export class addAdditionalScoreUuidNullable1668920788660 implements MigrationInterface {
    name = 'addAdditionalScoreUuidNullable1668920788660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_history" ADD "additionalScoreUuid" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_history" DROP COLUMN "additionalScoreUuid"`);
    }

}
