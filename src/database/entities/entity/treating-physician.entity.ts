import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Base } from "../base/basic.base";
import { TherapeuticInterventionEntity } from "./therapeutic-intervention.entity";
import { BiomedicalEntity } from "./biomedical.entity";

@Entity({ name: 'treating-physicians' })
export class TreatingPhysicianEntity extends Base {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phoneNumber: string;

    @Column()
    exequatur: string;

    @Column()
    specialty: string;

    @Column()
    pss: string;

    @Column()
    healthRegion: string;

    @Column()
    healthArea: string;

    @Column()
    healthZone: string;

    @Column({ type: 'date' })
    reportDate: Date;

    @ManyToMany(() => TherapeuticInterventionEntity)
    @JoinTable({
        name: 'treating-physician-therapeutic-interventions',
        joinColumn: {
            name: 'treatingPhysicianId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'therapeuticInterventionId',
            referencedColumnName: 'id'
        }
    })
    therapeuticInterventions: TherapeuticInterventionEntity[];

    @ManyToMany(() => BiomedicalEntity)
    @JoinTable({
        name: 'treating-physicians-biomedical',
        joinColumn: {
            name: 'treatingPhysicianId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'biomedicalId',
            referencedColumnName: 'id'
        }
    })
    biomedicals: BiomedicalEntity[];

}