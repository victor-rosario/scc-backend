import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "../base/basic.base";
import { AppointmentEntity } from "./appointment.entity";

@Entity({ name: 'branch-offices' })
export class BranchOfficeEntity extends Base {
    @Column()
    name: string

    @Column()
    province: string

    @Column()
    municipality: string

    @Column()
    street: string

    @Column()
    noStreet: string

    @OneToMany(() => (AppointmentEntity), (appointment) => appointment.branchOffice)
    appointments: AppointmentEntity[];
}