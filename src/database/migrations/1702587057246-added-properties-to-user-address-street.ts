import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedPropertiesToUserAddressStreet1702587057246 implements MigrationInterface {
    name = 'AddedPropertiesToUserAddressStreet1702587057246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-address-streets" DROP CONSTRAINT "FK_c4aaab59cdad9058bc0594b09de"`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" DROP CONSTRAINT "FK_f6aba71d4d13955cadbfd921072"`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" ALTER COLUMN "provinceId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" ALTER COLUMN "municipalityId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" ADD CONSTRAINT "FK_c4aaab59cdad9058bc0594b09de" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" ADD CONSTRAINT "FK_f6aba71d4d13955cadbfd921072" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-address-streets" DROP CONSTRAINT "FK_f6aba71d4d13955cadbfd921072"`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" DROP CONSTRAINT "FK_c4aaab59cdad9058bc0594b09de"`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" ALTER COLUMN "municipalityId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" ALTER COLUMN "provinceId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" ADD CONSTRAINT "FK_f6aba71d4d13955cadbfd921072" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-address-streets" ADD CONSTRAINT "FK_c4aaab59cdad9058bc0594b09de" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
