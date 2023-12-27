import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "../base/basic.base";
import { AppointmentEntity } from "./appointment.entity";

@Entity({ name: 'service-appointments' })
export class ServiceAppointmentEntity extends Base {
    @Column()
    service: string;

    @OneToMany(() => (AppointmentEntity), (appointment) => appointment.branchOffice)
    appointments: AppointmentEntity[];
}