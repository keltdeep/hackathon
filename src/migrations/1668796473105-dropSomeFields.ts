import { MigrationInterface, QueryRunner } from "typeorm";

export class dropSomeFields1668796473105 implements MigrationInterface {
    name = 'dropSomeFields1668796473105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verify"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "verify" boolean NOT NULL DEFAULT false`);
    }

}
