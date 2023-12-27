import { Column, Entity } from "typeorm";
import { Base } from "../base/basic.base";

@Entity({ name: 'therapeutic-interventions' })
export class TherapeuticInterventionEntity extends Base {
    @Column({ nullable: true })
    description: string

    @Column({ default: false })
    optionsExhausted: boolean
    
    @Column({ default: false })
    permanentOrLongTerm: boolean
    
    @Column({ default: false })
    degenerativeCondition: boolean
    
    @Column({ default: false })
    anosognosia: boolean
    
    @Column({ default: false })
    deafblindnessDiagnosis: boolean
    
    @Column({ default: false })
    dementiaDiagnosis: boolean
    
    @Column({ default: false })
    emotionalLability: boolean
}