import { RequestView } from "@database/entities/entity/request.view";
import { FindManyOptions } from "typeorm";

export async function getAllRequestService(options?: FindManyOptions<RequestView>) {
    const requests = await RequestView.findAndCount(options).catch(e => {
        console.error("getAllRequestService error: ", e)
        return null
    });

    if(!requests) return Promise.reject({ message: "Something went wrong" })

    return requests;
}