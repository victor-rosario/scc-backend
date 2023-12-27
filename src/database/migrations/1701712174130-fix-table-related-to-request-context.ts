import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableRelatedToRequestContext1701712174130 implements MigrationInterface {
    name = 'CreateTableRelatedToRequestContext1701712174130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "request-forecasts" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "description" character varying NOT NULL, "requestId" integer NOT NULL, CONSTRAINT "REL_1c68d5357601f8adf31a7b83b2" UNIQUE ("requestId"), CONSTRAINT "PK_70471e3621243a7379a17d5578d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "request-forecasts" ADD CONSTRAINT "FK_1c68d5357601f8adf31a7b83b20" FOREIGN KEY ("requestId") REFERENCES "requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request-forecasts" DROP CONSTRAINT "FK_1c68d5357601f8adf31a7b83b20"`);
        await queryRunner.query(`DROP TABLE "request-forecasts"`);
    }

}
