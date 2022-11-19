import { MigrationInterface, QueryRunner } from "typeorm";

export class dropAssets1668854674486 implements MigrationInterface {
    name = 'dropAssets1668854674486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" DROP COLUMN "assets"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" ADD "assets" jsonb`);
    }

}
