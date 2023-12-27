import { MunicipalitiesEntity } from "@database/entities/entity/municipality.entity";
import { FindManyOptions } from "typeorm";

export async function getAllMunicipalities(options: FindManyOptions<MunicipalitiesEntity>) {
    const data = await MunicipalitiesEntity.find(options).catch(e => {
        console.error('MunicipalitiesEntity.find error: ', e)
        return null
    })

    if (!data) return Promise.reject({ message: 'Something went wrong while trying to get the province' })

    return data
}