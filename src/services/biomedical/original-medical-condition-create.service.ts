import { OriginMedicalConditionEntity } from "@database/entities/entity/origin-medical-condition.entity";
import { DeepPartial } from "typeorm";

export const createOriginalMedicalConditionService = async (payload: DeepPartial<OriginMedicalConditionEntity>) => {

    const originMedicalCondition = await OriginMedicalConditionEntity.create(payload).save().catch((e) => {
        console.error('OriginMedicalConditionEntity.create: ', e)
        return null
    })

    if (!originMedicalCondition) {
        return Promise.reject({ message: 'Original Medical Condition not found' })
    }

    return originMedicalCondition

}