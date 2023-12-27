import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablesRelatedToTerritorials1702305668126 implements MigrationInterface {
    name = 'CreateTablesRelatedToTerritorials1702305668126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "provinces" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_2e4260eedbcad036ec53222e0c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "municipalities" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "slug" character varying NOT NULL, "provinceId" integer NOT NULL, CONSTRAINT "PK_9c4573349577306f221dda4d924" PRIMARY KEY ("id"))`);
        // await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "failedLoginAttempts"`);
        // await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "availableAt"`);
        await queryRunner.query(`ALTER TABLE "municipalities" ADD CONSTRAINT "FK_e90c1897e449c65218c938fc2a9" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "municipalities" DROP CONSTRAINT "FK_e90c1897e449c65218c938fc2a9"`);
        // await queryRunner.query(`ALTER TABLE "users" ADD "availableAt" TIMESTAMP NOT NULL DEFAULT now()`);
        // await queryRunner.query(`ALTER TABLE "users" ADD "failedLoginAttempts" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE "municipalities"`);
        await queryRunner.query(`DROP TABLE "provinces"`);
    }

}
