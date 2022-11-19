import { MigrationInterface, QueryRunner } from "typeorm";

export class addVerifyFlagfix1668805642145 implements MigrationInterface {
    name = 'addVerifyFlagfix1668805642145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verify"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "verify" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verify"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "verify" boolean NOT NULL DEFAULT false`);
    }

}
