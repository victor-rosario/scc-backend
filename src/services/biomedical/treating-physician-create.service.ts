import { BiomedicalEntity } from "@database/entities/entity/biomedical.entity";
import { TherapeuticInterventionEntity } from "@database/entities/entity/therapeutic-intervention.entity";
import { TreatingPhysicianEntity } from "@database/entities/entity/treating-physician.entity";
import { TreatingPhysicianInfoDTO } from "@dto/biomedical";

export const createTreatingPhysicianService = async (
    treatingPhysicianInfo: TreatingPhysicianInfoDTO,
    therapeuticIntervention: TherapeuticInterventionEntity,
    biomedical: BiomedicalEntity
) => {

    const treatingPhysician = await TreatingPhysicianEntity.create({
        ...treatingPhysicianInfo,
        therapeuticInterventions: [therapeuticIntervention],
        biomedicals: [biomedical]
    }).save().catch((e) => {
        console.error('TreatingPhysicianEntity.create: ', e)
        return null
    })

    if (!treatingPhysician) {
        return Promise.reject({ message: 'Invalid Treating physician' })
    }

    return treatingPhysician
}