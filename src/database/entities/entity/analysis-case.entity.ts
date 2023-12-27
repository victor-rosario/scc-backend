import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { Base } from "../base/basic.base";
import { RequestEntity } from "./request.entity";
import { DisabilityAssessmentEntity } from "./disability-assessment.entity";

@Entity({ name: 'analysis-cases' })
export class AnalysisCaseEntity extends Base {
    @Column({ default: false })
    coherence: boolean;

    @Column()
    hypothesis: string;

    @Column()
    justification: string;

    @Column()
    observations: string;

    @OneToOne(() => (RequestEntity), (request) => request.analysisCase)
    @JoinColumn()
    request: RequestEntity;

    @ManyToMany(() => DisabilityAssessmentEntity)
    @JoinTable({
        name: 'disability',
        joinColumn: {
            name: 'analysisCaseId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'disabilityAssessmentId',
            referencedColumnName: 'id'
        }
    })
    disabilityAssessments: DisabilityAssessmentEntity[];
}