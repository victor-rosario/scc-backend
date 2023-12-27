import { ServiceAppointmentEntity } from "@database/entities/entity/service-appointment.entity"

const serviceAppointment = [
    { "service": "Solicitud de certificación de discapacidad" }
]

export const serviceAppointmentData: Partial<ServiceAppointmentEntity>[] = serviceAppointment.map(serviceAppointment => ({
    service: serviceAppointment.service
}))