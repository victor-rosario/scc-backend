import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeEmailUserToNullable1701870639522 implements MigrationInterface {
    name = 'ChangeEmailUserToNullable1701870639522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`);
    }

}
