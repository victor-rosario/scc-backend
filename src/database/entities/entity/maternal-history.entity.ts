import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { Base } from "../base/basic.base";
import { BiomedicalEntity } from "./biomedical.entity";
import { DiseaseHistoryEntity } from "./disease-history.entity";

@Entity({ name: 'maternal-histories' })
export class MaternalHistoryEntity extends Base {
    @Column({ nullable: true })
    reason: string

    @Column()
    biomedicalId: number

    @OneToOne(() => (BiomedicalEntity), (biomedical) => biomedical.maternalHistory)
    @JoinColumn({ name: "biomedicalId", referencedColumnName: "id" })
    biomedical: BiomedicalEntity;

    @ManyToMany(() => DiseaseHistoryEntity)
    @JoinTable({
        name: 'maternal-disease-histories',
        joinColumn: {
            name: 'diseaseHistoryId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'maternalHistoryId',
            referencedColumnName: 'id'
        }
    })
    maternalDiseaseHistory: DiseaseHistoryEntity[];
}