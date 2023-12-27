import { CommunicationEntity } from "@database/entities/entity/communication.entity";
import { FindManyOptions } from "typeorm";

export async function getAllCommunicationService(options?: FindManyOptions<CommunicationEntity>) {
    const communications = await CommunicationEntity.find(options).catch(e => {
        console.error("getCommunicationService error: ", e) 
        return null
    })

    if(!communications) return Promise.reject({ message: 'Something went wrong' });

    return communications;
}