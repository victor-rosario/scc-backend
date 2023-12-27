import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { Base } from "../base/basic.base";
import { BiomedicalEntity } from "./biomedical.entity";
import { DiseaseHistoryEntity } from "./disease-history.entity";

@Entity({ name: 'perinatal-histories' })
export class PerinatalHistoryEntity extends Base {
    @Column()
    ageGestional: string;

    @Column()
    birthWeightPoundsLb: number;

    @Column()
    headCircumferenceCm: number;

    @Column()
    revival: boolean;

    @Column({ nullable: true })
    apgar: number;

    @Column({ nullable: true })
    reason: string;

    @Column()
    biomedicalId: number
    
    @OneToOne(() => (BiomedicalEntity), (biomedical) => biomedical.perinatalHistory)
    @JoinColumn({ name: "biomedicalId", referencedColumnName: "id" })
    biomedical: BiomedicalEntity;

    @ManyToMany(() => DiseaseHistoryEntity)
    @JoinTable({
        name: 'perinatal-disease-histories',
        joinColumn: {
            name: 'diseaseHistoryId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'perinatalHistoryId',
            referencedColumnName: 'id'
        }
    })
    perinatalDiseaseHistory: DiseaseHistoryEntity[];
}