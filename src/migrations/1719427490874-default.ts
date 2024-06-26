import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1719427490874 implements MigrationInterface {
    name = 'Default1719427490874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_departments_departments" DROP CONSTRAINT "FK_c384a6a6e653775428c088766d1"`);
        await queryRunner.query(`ALTER TABLE "products_departments_departments" ADD CONSTRAINT "FK_c384a6a6e653775428c088766d1" FOREIGN KEY ("departmentsId") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_departments_departments" DROP CONSTRAINT "FK_c384a6a6e653775428c088766d1"`);
        await queryRunner.query(`ALTER TABLE "products_departments_departments" ADD CONSTRAINT "FK_c384a6a6e653775428c088766d1" FOREIGN KEY ("departmentsId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
