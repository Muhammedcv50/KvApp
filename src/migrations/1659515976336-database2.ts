import {MigrationInterface, QueryRunner} from "typeorm";

export class database21659515976336 implements MigrationInterface {
    name = 'database21659515976336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address_line1" character varying NOT NULL, "address_line2" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "zip" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "dept_name"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "joining_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "department" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" ADD "number_of_employees" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "role" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "role" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "number_of_employees"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "joining_date"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "department" ADD "dept_name" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
