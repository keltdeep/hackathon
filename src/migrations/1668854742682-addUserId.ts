import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserId1668854742682 implements MigrationInterface {
    name = 'addUserId1668854742682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_327e5a5890df4462edf4ac9fa30"`);
        await queryRunner.query(`ALTER TABLE "score" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_327e5a5890df4462edf4ac9fa30" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_327e5a5890df4462edf4ac9fa30"`);
        await queryRunner.query(`ALTER TABLE "score" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_327e5a5890df4462edf4ac9fa30" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
