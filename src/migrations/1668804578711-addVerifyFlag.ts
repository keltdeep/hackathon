import { MigrationInterface, QueryRunner } from "typeorm";

export class addVerifyFlag1668804578711 implements MigrationInterface {
    name = 'addVerifyFlag1668804578711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "verify" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verify"`);
    }

}
