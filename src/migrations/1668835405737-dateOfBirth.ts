import { MigrationInterface, QueryRunner } from "typeorm";

export class dateOfBirth1668835405737 implements MigrationInterface {
    name = 'dateOfBirth1668835405737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_additional_fields_entity" ADD "dateOfBirth" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_additional_fields_entity" DROP COLUMN "dateOfBirth"`);
    }

}
