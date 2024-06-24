import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1719158512341 implements MigrationInterface {
    name = 'Default1719158512341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "desription" TO "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "description" TO "desription"`);
    }

}
