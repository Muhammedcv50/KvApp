import {MigrationInterface, QueryRunner} from "typeorm";

export class mydb1659350767482 implements MigrationInterface {
    name = 'mydb1659350767482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "department" ("dept_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dept_name" character varying NOT NULL, CONSTRAINT "PK_dd43bcc4c4d26f5efeb47d19e79" PRIMARY KEY ("dept_id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "department"`);
    }

}
