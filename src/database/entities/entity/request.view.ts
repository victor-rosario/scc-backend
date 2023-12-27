import { Exclude } from "class-transformer";
import { ViewColumn, ViewEntity } from "typeorm";
import { BaseView } from "../base/basic-view.base";
import { FileTypeEnum } from "./file.entity";
import { RequestType, StatusType } from "./request.entity";
import { GenderEnum } from "./user-info.entity";

interface IDocument {
    uuid: string
    fileName: string
    type: FileTypeEnum
}

@ViewEntity({
    name: "request-view",
    expression: `
    SELECT 
        r.id,
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
        ui."birthDate",
        ui.gender,
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
    `
})
export class RequestView extends BaseView {

    @Exclude({ toPlainOnly: true })
    @ViewColumn()
    id: number;

    @ViewColumn()
    uuid: string;

    @ViewColumn()
    type: RequestType;

    @ViewColumn()
    status: StatusType;

    @ViewColumn()
    caseCode: string;

    @ViewColumn()
    reason: string;

    @ViewColumn()
    fullName: string

    @ViewColumn()
    identification: string

    @ViewColumn()
    rnc: string

    @ViewColumn()
    institutionName: string

    @ViewColumn()
    birthDate: Date

    @ViewColumn()
    gender: GenderEnum

    @ViewColumn()
    scheduledAt: Date

    @Exclude({ toPlainOnly: true })
    @ViewColumn()
    documents: IDocument[]

    @Exclude({ toPlainOnly: true })
    @ViewColumn()
    userId: number

    @ViewColumn()
    createdAt: Date

    @Exclude({ toPlainOnly: true })
    @ViewColumn()
    updatedAt: Date

    @Exclude({ toPlainOnly: true })
    @ViewColumn()
    deletedAt: Date
}