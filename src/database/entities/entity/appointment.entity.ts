import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "../base/basic.base";
import { BranchOfficeEntity } from "./branch-office.entity";
import { ServiceAppointmentEntity } from "./service-appointment.entity";

@Entity({ name: 'appointments' })
export class AppointmentEntity extends Base {
    @Column({ type: 'timestamp' })
    startAt: Date;

    @Column({ type: 'timestamp' })
    endAt: Date;

    @Column()
    branchOfficeId: number;

    @Column()
    serviceAppointmentId: number;
    
    @ManyToOne(() => (BranchOfficeEntity), (branchOffice) => branchOffice.appointments)
    @JoinColumn({ name: 'branchOfficeId', referencedColumnName: 'id' })
    branchOffice: BranchOfficeEntity;

    @ManyToOne(() => (ServiceAppointmentEntity), (serviceAppointment) => serviceAppointment.appointments)
    @JoinColumn({ name: 'serviceAppointmentId', referencedColumnName: 'id' })
    serviceAppointment: ServiceAppointmentEntity;
}