import { AppointmentEntity } from "@database/entities/entity/appointment.entity";
import { BranchOfficeEntity } from "@database/entities/entity/branch-office.entity";
import { ServiceAppointmentEntity } from "@database/entities/entity/service-appointment.entity";

interface ICreateAppointmentPayload {
    schedule: string
}

export async function createAppointmentService({ schedule }: ICreateAppointmentPayload) {
    const branchOffice = await BranchOfficeEntity.findOneBy({ id: 1 }).catch(e => {
        console.error("BranchOfficeEntity.findOneBy: ", e)
        return null
    })
    if(!branchOffice) return Promise.reject({ message: "Branch office not found" })

    
    const serviceAppointment = await ServiceAppointmentEntity.findOneBy({ id: 1 }).catch(e => {
        console.error("ServiceAppointmentEntity.findOneBy: ", e)
        return null
    })
    if(!serviceAppointment) return Promise.reject({ message: "Service appointment not found" })

    const appointment = await AppointmentEntity.create({ 
        startAt: new Date(schedule),
        branchOfficeId: branchOffice.id,
        serviceAppointmentId: serviceAppointment.id,
    }).save().catch(e => {
        console.error("AppointmentEntity.create: ", e)
        return null
    });

    if(!appointment) return Promise.reject({ message: "Something went wrong while creating the appointment" })

    return appointment
}
