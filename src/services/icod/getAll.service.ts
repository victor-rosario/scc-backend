import { InternationalClassificationDiseaseEntity } from "@database/entities/entity/international-classification-of-diseases.entity";
import { FindManyOptions } from "typeorm";

export async function getAllIcodService(options?: FindManyOptions<InternationalClassificationDiseaseEntity>) {
    const data =  await InternationalClassificationDiseaseEntity.find(options).catch((e) => {
        console.error("InternationalClassificationEntity.find: error", e)
        return null
    });

    if(!data) return Promise.reject({ message: "Something went wrong" })

    return data
}