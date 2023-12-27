import { RequestEntity } from "@database/entities/entity/request.entity";

export async function getAllFormDoneService(requestUUID: string) {

    const request = await RequestEntity.findOne({
        where: {
            uuid: requestUUID
        },
        relations: {
            biomedical: true,
            contextualFactor:true,
            reconsideration: true,
            forms: true
        }
    }).catch(e => {
        console.error("RequestEntity.findOne: ", e)
        return null
    });

    if (!request) return Promise.reject({ message: "Request not found" })

    const isBiomedical = Boolean(request?.biomedical?.id);
    const isContextualFactors = Boolean(request?.contextualFactor?.id);
    const isWhodas = request?.forms?.length > 0;
    const reconsiderationRequest = request?.reconsideration;

    return {
        biomedical: (!reconsiderationRequest) ? false : isBiomedical,
        contextual: (!reconsiderationRequest) ? false : isContextualFactors,
        whodas: (!reconsiderationRequest) ? false : isWhodas,
    };
}