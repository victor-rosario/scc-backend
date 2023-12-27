import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { Base } from "../base/basic.base";
import { MaternalHistoryEntity } from "./maternal-history.entity";
import { OriginMedicalConditionEntity } from "./origin-medical-condition.entity";
import { PerinatalHistoryEntity } from "./perinatal-history.entity";
import { RequestEntity } from "./request.entity";
import { InternationalClassificationDiseaseEntity } from "./international-classification-of-diseases.entity";

@Entity({ name: 'biomedicals' })
export class BiomedicalEntity extends Base {

    @Column()
    requestId: number

    @OneToOne(() => (RequestEntity), (request) => request.biomedical)
    @JoinColumn({ name: "requestId", referencedColumnName: "id" })
    request: RequestEntity;

    @ManyToMany(() => InternationalClassificationDiseaseEntity)
    @JoinTable({
        name: 'biomedical-international-classification-of-diseases',
        joinColumn: {
            name: 'biomedicalId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'classificationDiseaseId',
            referencedColumnName: 'id'
        }
    })
    classificationDiseases: InternationalClassificationDiseaseEntity[];

    @OneToOne(() => (OriginMedicalConditionEntity), (originMedicalCondition) => originMedicalCondition.biomedical)
    originMedicalCondition: OriginMedicalConditionEntity;

    @OneToOne(() => (PerinatalHistoryEntity), (perinatalHistory) => perinatalHistory.biomedical)
    perinatalHistory: PerinatalHistoryEntity;

    @OneToOne(() => (MaternalHistoryEntity), (maternalHistory) => maternalHistory.biomedical)
    maternalHistory: MaternalHistoryEntity;
}