import { DiseaseHistoryEntity } from "@database/entities/entity/disease-history.entity";
import { FindManyOptions } from "typeorm";

export const getAllDiseaseHistoryService = async (options: FindManyOptions<DiseaseHistoryEntity>) => {

    const data = await DiseaseHistoryEntity.find(options).catch(e => {
        console.error('DiseaseHistoryEntity.find error: ', e)
        return null
    })
    if (!data) {
        return Promise.reject({ message: 'Something went wrong' })
    }

    return data

}