import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFirstNameLastNameAndPhoneNumberToTreatingPhysiciansTable1702919910518 implements MigrationInterface {
    name = 'AddFirstNameLastNameAndPhoneNumberToTreatingPhysiciansTable1702919910518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "treating-physicians-requests"`);
        await queryRunner.query(`CREATE TABLE "treating-physicians-biomedical" ("treatingPhysicianId" integer NOT NULL, "biomedicalId" integer NOT NULL, CONSTRAINT "PK_afd5643a2ece9ccfadf8a8943e2" PRIMARY KEY ("treatingPhysicianId", "biomedicalId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_943974547a14b349b68a20b3b2" ON "treating-physicians-biomedical" ("treatingPhysicianId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e2b9dcb13391011955f8dd7267" ON "treating-physicians-biomedical" ("biomedicalId") `);
        await queryRunner.query(`ALTER TABLE "treating-physicians" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "treating-physicians" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "treating-physicians" ADD "phoneNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "treating-physicians-biomedical" ADD CONSTRAINT "FK_943974547a14b349b68a20b3b28" FOREIGN KEY ("treatingPhysicianId") REFERENCES "treating-physicians"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "treating-physicians-biomedical" ADD CONSTRAINT "FK_e2b9dcb13391011955f8dd7267f" FOREIGN KEY ("biomedicalId") REFERENCES "biomedicals"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "treating-physicians-biomedical" DROP CONSTRAINT "FK_e2b9dcb13391011955f8dd7267f"`);
        await queryRunner.query(`ALTER TABLE "treating-physicians-biomedical" DROP CONSTRAINT "FK_943974547a14b349b68a20b3b28"`);
        await queryRunner.query(`ALTER TABLE "treating-physicians" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "treating-physicians" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "treating-physicians" DROP COLUMN "firstName"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2b9dcb13391011955f8dd7267"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_943974547a14b349b68a20b3b2"`);
        await queryRunner.query(`DROP TABLE "treating-physicians-biomedical"`);
    }

}
