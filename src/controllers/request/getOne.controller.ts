import { FileTypeEnum } from '@database/entities/entity/file.entity';
import { getAOneRequestService } from '@services/request/getOne.service';
import { generateRequestPictureUtil } from '@utils/url.util';
import { Request, Response } from 'express'

export const getOneRequestController = async (req: Request, res: Response) => {

    const uuid = req.params.uuid as string

    getAOneRequestService({
        where: { uuid },
    }).then((request) => {

        const documentData = request.documents

        const documentFileFilter = documentData.filter(x => x.type === FileTypeEnum.DOCUMENT)
        const documents = documentFileFilter.map(item => generateRequestPictureUtil({ uuid: request.uuid, filename: item.fileName }))

        const idDocument = documentData.find(item => item.type === FileTypeEnum.IDENTIFICATION_DOCUMENT)
        const beDocument = documentData.find(item => item.type === FileTypeEnum.BIOMEDICAL_EVALUATION)
        const csDocument = documentData.find(item => item.type === FileTypeEnum.COMPLEMENTARY_STUDY)

        const data = {
            ...request.toJSON(),
            files: {
                ...(documents.length && { documents }),
                ...(idDocument && { identificationDocument: generateRequestPictureUtil({ uuid: request.uuid, filename: idDocument.fileName }) }),
                ...(beDocument && { biomedicalEvaluation: generateRequestPictureUtil({ uuid: request.uuid, filename: beDocument.fileName }) }),
                ...(csDocument && { complementaryStudy: generateRequestPictureUtil({ uuid: request.uuid, filename: csDocument.fileName }) }),
            }
        }

        return res.json(data)
    }).catch((e) => {
        res.status(500).json({ error: { message: e.message } })
    })
}