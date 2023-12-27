import { CommunicationEntity } from "@database/entities/entity/communication.entity"

const communications = [
    "Lenguaje hablado",
    "Lectoescritura",
    "Lengua de señas",
    "Posee Intérprete",
    "Braille",
    "Audio"
]

export const communicationData: Partial<CommunicationEntity>[] = communications.map(communication => ({
    method: communication,
}))