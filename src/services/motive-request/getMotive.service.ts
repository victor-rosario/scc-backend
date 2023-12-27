import { MotiveRequestEntity } from "@database/entities/entity/motive-request.entity";
import { FindManyOptions } from "typeorm";

export async function getAllMotiveService(options?: FindManyOptions<MotiveRequestEntity>) {
    const motives = await MotiveRequestEntity.find(options).catch((e) => {
        console.error("getAllRequestService error: ", e) 
        return null
    });

    if(!motives) return Promise.reject({ message: "Something went wrong" })

    return motives;
}