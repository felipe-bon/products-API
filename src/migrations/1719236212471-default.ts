import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1719236212471 implements MigrationInterface {
    name = 'Default1719236212471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_70b737f02e85b16ee274962cb32"`);
        await queryRunner.query(`CREATE TABLE "products_departments_departments" ("productsId" integer NOT NULL, "departmentsId" integer NOT NULL, CONSTRAINT "PK_ac4ce9f0d66406b5ca8f9aa2383" PRIMARY KEY ("productsId", "departmentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_abb45bc24ecfa199c7878abd63" ON "products_departments_departments" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c384a6a6e653775428c088766d" ON "products_departments_departments" ("departmentsId") `);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "department_id"`);
        await queryRunner.query(`ALTER TABLE "products_departments_departments" ADD CONSTRAINT "FK_abb45bc24ecfa199c7878abd634" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_departments_departments" ADD CONSTRAINT "FK_c384a6a6e653775428c088766d1" FOREIGN KEY ("departmentsId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_departments_departments" DROP CONSTRAINT "FK_c384a6a6e653775428c088766d1"`);
        await queryRunner.query(`ALTER TABLE "products_departments_departments" DROP CONSTRAINT "FK_abb45bc24ecfa199c7878abd634"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "department_id" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c384a6a6e653775428c088766d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_abb45bc24ecfa199c7878abd63"`);
        await queryRunner.query(`DROP TABLE "products_departments_departments"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_70b737f02e85b16ee274962cb32" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
