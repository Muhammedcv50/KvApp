import {MigrationInterface, QueryRunner} from "typeorm";

export class mydb1659353619264 implements MigrationInterface {
    name = 'mydb1659353619264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "department_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "department_dept_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_e9412a33eb827c0e7d9b0ec2210" FOREIGN KEY ("department_dept_id") REFERENCES "department"("dept_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_e9412a33eb827c0e7d9b0ec2210"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_dept_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "created_at"`);
    }

}
