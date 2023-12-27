import { TherapeuticInterventionEntity } from "@database/entities/entity/therapeutic-intervention.entity"
import { DeepPartial } from "typeorm"

export const createTherapeuticInterventionService = async (payload: DeepPartial<TherapeuticInterventionEntity>) => {

    const therapeuticIntervention = await TherapeuticInterventionEntity.create(payload).save().catch((e) => {
        console.error('TherapeuticInterventionEntity.create: ', e)
        return null
    })

    if (!therapeuticIntervention) {
        return Promise.reject({ message: 'Invalid Therapeutic intervention' })
    }

    return therapeuticIntervention
}