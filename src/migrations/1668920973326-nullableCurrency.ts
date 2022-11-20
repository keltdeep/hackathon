import { MigrationInterface, QueryRunner } from "typeorm";

export class nullableCurrency1668920973326 implements MigrationInterface {
    name = 'nullableCurrency1668920973326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_history" ALTER COLUMN "fromCurrency" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction_history" ALTER COLUMN "toCurrency" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_history" ALTER COLUMN "toCurrency" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction_history" ALTER COLUMN "fromCurrency" SET NOT NULL`);
    }

}
