import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedReportDateColumnToTreatingphysicianTable1702567343338 implements MigrationInterface {
    name = 'AddedReportDateColumnToTreatingphysicianTable1702567343338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "treating-physicians" DROP COLUMN "reportDate"`);
        await queryRunner.query(`ALTER TABLE "treating-physicians" ADD "reportDate" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "treating-physicians" DROP COLUMN "reportDate"`);
        await queryRunner.query(`ALTER TABLE "treating-physicians" ADD "reportDate" TIMESTAMP NOT NULL`);
    }

}
