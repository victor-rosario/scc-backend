import { RequestEntity } from "@database/entities/entity/request.entity";

export async function deleteRequestService(id: number) {
    const request = await RequestEntity.findOneBy({ id });
    if(!request) return request; 
    return await RequestEntity.softRemove(request);
}