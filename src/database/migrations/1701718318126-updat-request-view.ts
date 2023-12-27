import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatRequestView1701718318126 implements MigrationInterface {
    name = 'UpdatRequestView1701718318126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "public"."typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","request-view","public"]);
        await queryRunner.query(`DROP VIEW "request-view"`);
        await queryRunner.query(`CREATE VIEW "request-view" AS 
    select
        r.*,
        concat(u."firstName", ' ', u."lastName") AS "fullName",
        ui.identification,
        ui.rnc,
        ui."institutionName",
        ur."userId",
        COALESCE(
            (SELECT array_agg(json_build_object('uuid', i_1.uuid, 'fileName', i_1."fileName", 'type', i_1.type)) AS array_agg
            FROM "request-files" pi1_1
                LEFT JOIN files i_1 ON i_1.id = pi1_1."fileId"
            WHERE pi1_1."requestId" = r.id), ARRAY[]::json[]
        ) AS documents
    FROM requests r
        JOIN "user-requests" ur ON r.id = ur."requestId"
        LEFT JOIN users u ON u.id = ur."userId"
        LEFT JOIN "user-info" ui ON ui."userId" = u.id
    `);
        await queryRunner.query(`INSERT INTO "public"."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","request-view","select\n        r.*,\n        concat(u.\"firstName\", ' ', u.\"lastName\") AS \"fullName\",\n        ui.identification,\n        ui.rnc,\n        ui.\"institutionName\",\n        ur.\"userId\",\n        COALESCE(\n            (SELECT array_agg(json_build_object('uuid', i_1.uuid, 'fileName', i_1.\"fileName\", 'type', i_1.type)) AS array_agg\n            FROM \"request-files\" pi1_1\n                LEFT JOIN files i_1 ON i_1.id = pi1_1.\"fileId\"\n            WHERE pi1_1.\"requestId\" = r.id), ARRAY[]::json[]\n        ) AS documents\n    FROM requests r\n        JOIN \"user-requests\" ur ON r.id = ur.\"requestId\"\n        LEFT JOIN users u ON u.id = ur.\"userId\"\n        LEFT JOIN \"user-info\" ui ON ui.\"userId\" = u.id"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "public"."typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","request-view","public"]);
        await queryRunner.query(`DROP VIEW "request-view"`);
        await queryRunner.query(`CREATE VIEW "request-view" AS select
        r.*,
        CONCAT(u."firstName", ' ', u."lastName") as "fullName",
        ui.identification,
        ui.rnc,
        ui."institutionName",
        ur."userId" 
    from requests r 
    join "user-requests" ur ON r.id = ur."requestId" 
    left join users u on u.id = ur."userId"
    left join "user-info" ui on ui."userId" = u.id`);
        await queryRunner.query(`INSERT INTO "public"."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","request-view","select\n        r.*,\n        CONCAT(u.\"firstName\", ' ', u.\"lastName\") as \"fullName\",\n        ui.identification,\n        ui.rnc,\n        ui.\"institutionName\",\n        ur.\"userId\" \n    from requests r \n    join \"user-requests\" ur ON r.id = ur.\"requestId\" \n    left join users u on u.id = ur.\"userId\"\n    left join \"user-info\" ui on ui.\"userId\" = u.id"]);
    }

}
