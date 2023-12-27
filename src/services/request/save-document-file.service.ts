import { ALLOWED_EXTENSION, MAX_BYTES_SIZE, MAX_MB } from "@constants";
import connection from "@database/connections";
import { FileEntity, FileTypeEnum } from "@database/entities/entity/file.entity";
import { RequestEntity } from "@database/entities/entity/request.entity";
import { checkAndCreateFolder, generateUniqueFileName, getExtensionByFileName } from "@utils/dir.util";
import { REQUEST_UPLOAD_DIR } from "@utils/upload.util";
import path from 'path'
import fs from 'fs/promises'

export const saveDocumentFileService = async (request: RequestEntity, files: Record<string, Express.Multer.File[]> | Express.Multer.File[] | undefined) => {

    if (!files) {
        return Promise.reject({ message: "Document Files are required" })
    }

    const isFileArray = Array.isArray(files)
    if (isFileArray) {
        return Promise.reject({ message: "Document Files are not compatible" })
    }

    const identificationDocument = files['identificationDocument']?.[0]
    if (!identificationDocument) return Promise.reject({ message: "Identification Document is required" })

    const biomedicalEvaluation = files['biomedicalEvaluation']?.[0]
    if (!biomedicalEvaluation) return Promise.reject({ message: "Biomedical Evaluation is required" })

    const complementaryStudy = files['complementaryStudy']?.[0]
    if (!complementaryStudy) return Promise.reject({ message: "Complementary Study is required" })

    const identificationDocumentFile = await saveDocumentFunc(request, FileTypeEnum.IDENTIFICATION_DOCUMENT, identificationDocument)
    const biomedicalEvaluationFile = await saveDocumentFunc(request, FileTypeEnum.BIOMEDICAL_EVALUATION, biomedicalEvaluation)
    const complementaryStudyFile = await saveDocumentFunc(request, FileTypeEnum.COMPLEMENTARY_STUDY, complementaryStudy)

    return {
        identificationDocumentFile,
        biomedicalEvaluationFile,
        complementaryStudyFile
    }
}

async function saveDocumentFunc(request: RequestEntity, type: FileTypeEnum,file: Express.Multer.File) {

    if (file.size > MAX_BYTES_SIZE) {
        return Promise.reject({ message: `File size limit is ${MAX_MB} MB.` })
    }

    const extension = getExtensionByFileName(file.originalname)
    if (!extension || !ALLOWED_EXTENSION.includes(extension)) {
        return Promise.reject({
            message: `Invalid file extension. Valid extensions are the following: ${ALLOWED_EXTENSION.join(
                ', '
            )}`
        })
    }

    const pathBuilt = path.join(REQUEST_UPLOAD_DIR, request.uuid, "documents")
    await checkAndCreateFolder(pathBuilt)

    const currentRequestFiles = await FileEntity.find({
        relations: {
            requests: true
        },
        where: {
            type,
            requests: {
                id: request.id
            }
        }
    }).catch((error) => {
        console.error('ERROR await ImageEntity.find', { error })
        return []
    })

    let fileName = ""

    connection.manager.transaction(async (entityManager) => {

        try {
            fileName = await generateUniqueFileName(extension)

            const fileInstance = FileEntity.create({
                fileName,
                type,
                requests: [request]
            })

            const newFile = await entityManager.save(fileInstance)

            const filePath = path.join(pathBuilt, newFile.fileName)

            await fs.writeFile(filePath, file.buffer)

            await Promise.all(currentRequestFiles.map(async file => {
                await fs
                    .unlink(path.join(pathBuilt, file.fileName))
                    .catch(console.error)
                await entityManager.remove(file)
            }))

            return Promise.resolve()
        } catch (error) {
            console.error('connection.manager.transaction', { error })
            return Promise.reject({ message: 'Something went wrong' })
        }
    })

    return fileName
}