import { FileEntity } from '@database/entities/entity/file.entity'
import { existsSync } from 'fs'
import fsPromise from 'fs/promises'
import path from 'path'
import { REQUEST_UPLOAD_DIR } from './upload.util'

export const buildDocumentRequestPath = (requestUUID: string, type: string, fileName: string) => {
	return path.join(REQUEST_UPLOAD_DIR, requestUUID, type, fileName)
}

export const checkAndCreateFolder = async (path: string) => {
	if (!existsSync(path)) {
		const creation = await fsPromise.mkdir(path, { recursive: true }).catch((error) => {
			console.error('ERROR checkFolderExistence', { error })
			return false
		})
		return Promise.resolve(Boolean(creation))
	}

	return Promise.resolve(true)
}

export const getExtensionByFileName = (fileName: string) =>
	fileName.match(/\.([^.]+)$/)?.[1]

export const generateUniqueFileName = async (extension: string): Promise<string> => {
	const fileName = `${new Date().getTime()}.${extension}`
	const exists = await FileEntity.findOne({
		where: {
			fileName
		}
	}).catch((error) => {
		console.error('ImageEntity.findOne', { error })
		return undefined
	})

	if (exists === undefined)
		return Promise.reject({ message: 'Something went wrong' })

	if (exists) return generateUniqueFileName(extension)

	return Promise.resolve(fileName)
}

export const checkAndFileExists = async (file: string): Promise<boolean> => {
	try {

		await fsPromise.access(file)

		return true

	} catch (error) {

		console.error("error checkAndFileExists: ", error)
		if (error.code === 'ENOENT') return false

		return false
	}
}