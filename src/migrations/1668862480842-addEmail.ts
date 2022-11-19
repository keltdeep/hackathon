import { MigrationInterface, QueryRunner } from "typeorm";

export class addEmail1668862480842 implements MigrationInterface {
    name = 'addEmail1668862480842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_additional_fields_entity" ADD "email" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_additional_fields_entity" DROP COLUMN "email"`);
    }

}
