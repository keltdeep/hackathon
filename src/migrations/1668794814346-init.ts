import { MigrationInterface, QueryRunner } from "typeorm";

export class init1668794814346 implements MigrationInterface {
    name = 'init1668794814346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TYPE "public"."user_rights_enum" AS ENUM('mailgun', 'minDigDevelop', 'golovorez', 'editMoney', 'readMoney')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "login" character varying NOT NULL, "password" character varying, "verify" boolean NOT NULL DEFAULT false, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "rights" "public"."user_rights_enum" array, "name" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_rights_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
