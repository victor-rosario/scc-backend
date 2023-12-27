import { Column, Entity } from "typeorm";
import { Base } from "../base/basic.base";

@Entity({ name: 'disability-assessments' })
export class DisabilityAssessmentEntity extends Base {
    @Column({ default: false })
    hasADisability: boolean;
    
    @Column()
    originDisability: string;
}