import {MigrationInterface, QueryRunner} from "typeorm";

export class addedExperience1659422954369 implements MigrationInterface {
    name = 'addedExperience1659422954369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
    }

}
