import { MotiveRequestEntity } from "@database/entities/entity/motive-request.entity"

const motives = [
    "Accesos a beneficios educativos",
    "Accesos a beneficios de seguridad social",
    "Accesos a beneficios de protección social",
    "Cuota laboral",
    "Exoneración impuestos",
    "Solicitud dispositivos de apoyo",
    "Fines bancarios",
    "No sabe/ No responde"
]

export const motiveData: Partial<MotiveRequestEntity>[] = motives.map(motive => ({
    motive
}))