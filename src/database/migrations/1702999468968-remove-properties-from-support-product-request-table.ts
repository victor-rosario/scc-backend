import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePropertiesFromSupportProductRequestTable1702999468968 implements MigrationInterface {
    name = 'RemovePropertiesFromSupportProductRequestTable1702999468968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "support-products-request" DROP COLUMN "needAndHave"`);
        await queryRunner.query(`ALTER TABLE "support-products-request" DROP COLUMN "needAndDoNotHave"`);
        await queryRunner.query(`ALTER TABLE "support-products-request" ADD "value" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "support-products-request" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "support-products-request" ADD "needAndDoNotHave" boolean`);
        await queryRunner.query(`ALTER TABLE "support-products-request" ADD "needAndHave" boolean`);
    }

}
