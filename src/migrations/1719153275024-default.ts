import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1719153275024 implements MigrationInterface {
    name = 'Default1719153275024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric(5,2)`);
    }

}
