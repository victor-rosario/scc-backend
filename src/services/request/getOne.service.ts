import {RequestView } from "@database/entities/entity/request.view";
import { FindOneOptions } from "typeorm";

export async function getAOneRequestService(options: FindOneOptions<RequestView>) {
    const requests = await RequestView.findOne(options).catch(e => {
        console.error("RequestView.findOne: ", e)
        return null
    });
    
    if(!requests) return Promise.reject({ message: "Request not found" })

    return requests;
}