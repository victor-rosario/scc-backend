import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUserAddressStreetTerritorial1702308650493 implements MigrationInterface {
    name = 'AlterTableUserAddressStreetTerritorial1702308650493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-address-streets" DROP COLUMN "municipality"`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" DROP COLUMN "province"`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" ADD "provinceId" integer`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" ADD "municipalityId" integer`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" ADD CONSTRAINT "FK_c4aaab59cdad9058bc0594b09de" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" ADD CONSTRAINT "FK_f6aba71d4d13955cadbfd921072" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-address-streets" DROP CONSTRAINT "FK_f6aba71d4d13955cadbfd921072"`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" DROP CONSTRAINT "FK_c4aaab59cdad9058bc0594b09de"`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" DROP COLUMN "municipalityId"`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" DROP COLUMN "provinceId"`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" ADD "province" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" ADD "municipality" character varying NOT NULL`);
    }

}
