import { MigrationInterface, QueryRunner } from "typeorm";

export class addAssets1668846782805 implements MigrationInterface {
    name = 'addAssets1668846782805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" ADD "assets" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" DROP COLUMN "assets"`);
    }

}
