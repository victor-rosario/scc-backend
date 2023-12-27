import { RequestEntity } from '@database/entities/entity/request.entity'
import { updateDocumentFileService } from './update-document-file.service'

export async function updateRequestService(
    uuid: string,
	files?:
		| Record<string, Express.Multer.File[]>
		| Express.Multer.File[]
		| undefined
) {
    const request = await RequestEntity.findOne({ where: { uuid } }).catch(e => {
        console.error('RequestEntity.findOne: ', e)
        return null
    })

    if(!request) return Promise.reject({ message: 'Request not found' })

	await updateDocumentFileService(request, files)

	return request
}
