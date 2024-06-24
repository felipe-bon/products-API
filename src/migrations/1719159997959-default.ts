import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1719159997959 implements MigrationInterface {
    name = 'Default1719159997959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departments" ADD CONSTRAINT "UQ_7772b894808a76fe3ac670f380b" UNIQUE ("department_name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departments" DROP CONSTRAINT "UQ_7772b894808a76fe3ac670f380b"`);
    }

}
