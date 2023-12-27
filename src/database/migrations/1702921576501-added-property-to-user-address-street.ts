import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedPropertyToUserAddressStreet1702921576501 implements MigrationInterface {
    name = 'AddedPropertyToUserAddressStreet1702921576501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-address-streets" ADD "neighborhood" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-address-streets" DROP COLUMN "neighborhood"`);
    }

}
