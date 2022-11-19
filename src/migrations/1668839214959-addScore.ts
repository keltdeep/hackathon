import { MigrationInterface, QueryRunner } from "typeorm";

export class addScore1668839214959 implements MigrationInterface {
    name = 'addScore1668839214959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "score" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "currency" character varying NOT NULL DEFAULT 'RUB', "value" double precision, "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_cd660b9fdeb9d1c5ca5bd027b15" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_327e5a5890df4462edf4ac9fa30" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_327e5a5890df4462edf4ac9fa30"`);
        await queryRunner.query(`DROP TABLE "score"`);
    }

}
