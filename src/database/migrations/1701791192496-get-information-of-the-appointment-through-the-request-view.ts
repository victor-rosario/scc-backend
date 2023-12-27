import { MigrationInterface, QueryRunner } from "typeorm";

export class GetInformationOfTheAppointmentThroughTheRequestView1701791192496 implements MigrationInterface {
    name = 'GetInformationOfTheAppointmentThroughTheRequestView1701791192496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "public"."typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","request-view","public"]);
        await queryRunner.query(`DROP VIEW "request-view"`);
        await queryRunner.query(`CREATE VIEW "request-view" AS 
    SELECT r.id,
    r.uuid,
    r."createdAt",
    r."updatedAt",
    r."deletedAt",
    r.type,
    r.status,
    r."caseCode",
    r.reason,
    concat(u."firstName", ' ', u."lastName") AS "fullName",
    ui.identification,
    ui.rnc,
    ui."institutionName",
    ur."userId",
    a."startAt" as "scheduledAt",
    COALESCE(( SELECT array_agg(json_build_object('uuid', i_1.uuid, 'fileName', i_1."fileName", 'type', i_1.type)) AS array_agg
           FROM "request-files" pi1_1
             LEFT JOIN files i_1 ON i_1.id = pi1_1."fileId"
          WHERE pi1_1."requestId" = r.id), ARRAY[]::json[]) AS documents
   FROM requests r
     JOIN "user-requests" ur ON r.id = ur."requestId"
     LEFT JOIN users u ON u.id = ur."userId"
     LEFT JOIN "user-info" ui ON ui."userId" = u.id
     left join "request-appointments" ra on ra."requestId" = r.id
     left join appointments a on a.id = ra."appointmentId"
    `);
        await queryRunner.query(`INSERT INTO "public"."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","request-view","SELECT r.id,\n    r.uuid,\n    r.\"createdAt\",\n    r.\"updatedAt\",\n    r.\"deletedAt\",\n    r.type,\n    r.status,\n    r.\"caseCode\",\n    r.reason,\n    concat(u.\"firstName\", ' ', u.\"lastName\") AS \"fullName\",\n    ui.identification,\n    ui.rnc,\n    ui.\"institutionName\",\n    ur.\"userId\",\n    a.\"startAt\" as \"scheduledAt\",\n    COALESCE(( SELECT array_agg(json_build_object('uuid', i_1.uuid, 'fileName', i_1.\"fileName\", 'type', i_1.type)) AS array_agg\n           FROM \"request-files\" pi1_1\n             LEFT JOIN files i_1 ON i_1.id = pi1_1.\"fileId\"\n          WHERE pi1_1.\"requestId\" = r.id), ARRAY[]::json[]) AS documents\n   FROM requests r\n     JOIN \"user-requests\" ur ON r.id = ur.\"requestId\"\n     LEFT JOIN users u ON u.id = ur.\"userId\"\n     LEFT JOIN \"user-info\" ui ON ui.\"userId\" = u.id\n     left join \"request-appointments\" ra on ra.\"requestId\" = r.id\n     left join appointments a on a.id = ra.\"appointmentId\""]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "public"."typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","request-view","public"]);
        await queryRunner.query(`DROP VIEW "request-view"`);
        await queryRunner.query(`CREATE VIEW "request-view" AS select
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
        LEFT JOIN "user-info" ui ON ui."userId" = u.id`);
        await queryRunner.query(`INSERT INTO "public"."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","request-view","select\n        r.*,\n        concat(u.\"firstName\", ' ', u.\"lastName\") AS \"fullName\",\n        ui.identification,\n        ui.rnc,\n        ui.\"institutionName\",\n        ur.\"userId\",\n        COALESCE(\n            (SELECT array_agg(json_build_object('uuid', i_1.uuid, 'fileName', i_1.\"fileName\", 'type', i_1.type)) AS array_agg\n            FROM \"request-files\" pi1_1\n                LEFT JOIN files i_1 ON i_1.id = pi1_1.\"fileId\"\n            WHERE pi1_1.\"requestId\" = r.id), ARRAY[]::json[]\n        ) AS documents\n    FROM requests r\n        JOIN \"user-requests\" ur ON r.id = ur.\"requestId\"\n        LEFT JOIN users u ON u.id = ur.\"userId\"\n        LEFT JOIN \"user-info\" ui ON ui.\"userId\" = u.id"]);
    }

}
