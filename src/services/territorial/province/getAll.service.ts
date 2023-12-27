import { ProvincesEntity } from "@database/entities/entity/province.entity";
import { FindManyOptions } from "typeorm";

export async function getAllProvinces(options?: FindManyOptions<ProvincesEntity>) {
    const provinces = await ProvincesEntity.find(options).catch(e => {
        console.error('ProvincesEntity.find: ', e)
        return null
    })

    if (!provinces) return Promise.reject({ message: 'Something went wrong while trying to get all provinces' })

    return provinces;
}