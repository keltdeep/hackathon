import { MigrationInterface, QueryRunner } from "typeorm";

export class additionalFieldsUser1668806995091 implements MigrationInterface {
    name = 'additionalFieldsUser1668806995091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_additional_fields_entity" ("id" SERIAL NOT NULL, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "lastName" character varying NOT NULL, "firstName" character varying NOT NULL, "secondName" character varying, "codeWord" character varying NOT NULL, CONSTRAINT "PK_65f4049c1818df97bc2feb46eb8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "additionalFieldsId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_5a600f1dfe0c8c8ea005b8cd428" UNIQUE ("additionalFieldsId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5a600f1dfe0c8c8ea005b8cd428" FOREIGN KEY ("additionalFieldsId") REFERENCES "user_additional_fields_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5a600f1dfe0c8c8ea005b8cd428"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_5a600f1dfe0c8c8ea005b8cd428"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "additionalFieldsId"`);
        await queryRunner.query(`DROP TABLE "user_additional_fields_entity"`);
    }

}
