import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserFileTable1701694588860 implements MigrationInterface {
    name = 'RemoveUserFileTable1701694588860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."files_type_enum" RENAME TO "files_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."files_type_enum" AS ENUM('DOCUMENT', 'IDENTIFICATION_DOCUMENT', 'BIOMEDICAL_EVALUATION', 'COMPLEMENTARY_STUDY')`);
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "type" TYPE "public"."files_type_enum" USING "type"::"text"::"public"."files_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."files_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."files_type_enum_old" AS ENUM('DOCUMENT')`);
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "type" TYPE "public"."files_type_enum_old" USING "type"::"text"::"public"."files_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."files_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."files_type_enum_old" RENAME TO "files_type_enum"`);
    }

}
