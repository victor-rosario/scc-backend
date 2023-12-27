import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { Base } from "../base/basic.base";
import { BiomedicalEntity } from "./biomedical.entity";
import { HealthIssueEntity } from "./health-issue.entity";

@Entity({ name: 'origin-medical-conditions' })
export class OriginMedicalConditionEntity extends Base {
    @Column({ nullable: true })
    relevantFamilyHistory: string;

    @Column()
    biomedicalId: number;

    @OneToOne(() => (BiomedicalEntity), (biomedical) => biomedical.originMedicalCondition)
    @JoinColumn({ name: "biomedicalId", referencedColumnName: "id" })
    biomedical: BiomedicalEntity;

    @ManyToMany(() => HealthIssueEntity)
    @JoinTable({
        name: 'origin-medical-health-issues',
        joinColumn: {
            name: 'healthIssueId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'originMedicalConditionId',
            referencedColumnName: 'id'
        }
    })
    healthIssue: HealthIssueEntity[];
}