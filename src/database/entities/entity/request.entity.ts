import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { Base } from "../base/basic.base";
import { AnalysisCaseEntity } from "./analysis-case.entity";
import { AppointmentEntity } from "./appointment.entity";
import { BiomedicalEntity } from "./biomedical.entity";
import { CommunicationEntity } from "./communication.entity";
import { ContextualFactorEntity } from "./contextual-factor.entity";
import { FormRequestEntity } from "./form-request.entity";
import { MotiveRequestEntity } from "./motive-request.entity";
import { ReconsiderationRequestEntity } from "./reconsideration-request.entity";
import { RequestForecastEntity } from "./request-forecast.entity";
import { Exclude } from "class-transformer";
import { RequestContextEntity } from "./request-context.entity";

export enum RequestTypeEnum {
    INITIAL_EVALUATION = "INITIAL_EVALUATION",
    VALUATION_BY_CHANGE = "VALUATION_BY_CHANGE"
}

export enum StatusEnum {
    PROGRESS = "PROGRESS",
    CERTIFICATE = "CERTIFICATE",
    PAUSED = "PAUSED",
    DENIED = "DENIED"
}

export type RequestType = `${RequestTypeEnum}`;
export type StatusType = `${StatusEnum}`

@Entity({ name: 'requests' })
export class RequestEntity extends Base {
    @Column({ type: 'enum', enum: RequestTypeEnum })
    type: RequestType;

    @Column({ type: 'enum', enum: StatusEnum })
    status: StatusType;

    @Column()
    caseCode: string;

    @Column({ nullable: true })
    reason: string;

    @Exclude({ toPlainOnly: true })
    @ManyToMany(() => CommunicationEntity)
    @JoinTable({
        name: 'communication-requests',
        joinColumn: {
            name: 'communicationId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'requestId',
            referencedColumnName: 'id'
        }
    })
    communications: CommunicationEntity[];

    @Exclude({ toPlainOnly: true })
    @ManyToMany(() => MotiveRequestEntity)
    @JoinTable({
        name: 'reason-request',
        joinColumn: {
            name: 'motiveId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'requestId',
            referencedColumnName: 'id'
        }
    })
    motives: MotiveRequestEntity[];

    @Exclude({ toPlainOnly: true })
    @OneToOne(() => (BiomedicalEntity), (biomedical) => biomedical.request)
    biomedical: BiomedicalEntity; //form

    @Exclude({ toPlainOnly: true })
    @OneToMany(() => (FormRequestEntity), (formRequest) => formRequest.form)
    forms: FormRequestEntity[]; //form

    @Exclude({ toPlainOnly: true })
    @OneToOne(() => (RequestForecastEntity), (requestForecast) => requestForecast.request)
    forecast: RequestForecastEntity;

    @Exclude({ toPlainOnly: true })
    @OneToOne(() => (RequestContextEntity), (requestContext) => requestContext.request)
    context: RequestContextEntity;

    @Exclude({ toPlainOnly: true })
    @OneToOne(() => (AnalysisCaseEntity), (analysisCase) => analysisCase.request)
    analysisCase: AnalysisCaseEntity;

    @Exclude({ toPlainOnly: true })
    @OneToOne(() => (ReconsiderationRequestEntity), (reconsiderationRequest) => reconsiderationRequest.request)
    reconsideration: ReconsiderationRequestEntity;

    @Exclude({ toPlainOnly: true })
    @OneToOne(() => (ContextualFactorEntity), (contextualFactor) => contextualFactor.request)
    contextualFactor: ContextualFactorEntity; //form

    @Exclude({ toPlainOnly: true })
    @ManyToMany(() => AppointmentEntity)
    @JoinTable({
        name: 'request-appointments',
        joinColumn: {
            name: 'requestId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'appointmentId',
            referencedColumnName: 'id'
        }
    })
    appointments: AppointmentEntity[];
}