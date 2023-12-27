import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeToNullableMobileUser1701716470988 implements MigrationInterface {
    name = 'ChangeToNullableMobileUser1701716470988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-info" ALTER COLUMN "mobile" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-info" ALTER COLUMN "mobile" SET NOT NULL`);
    }

}
