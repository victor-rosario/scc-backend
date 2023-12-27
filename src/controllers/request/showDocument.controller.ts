import path from 'path'
import { Request, Response } from 'express'
import { EXTENSION_MIME_TYPE, REQUEST_UPLOAD_DIR, ROOT_UPLOAD_DIR } from '@utils/upload.util'
import { checkAndFileExists } from '@utils/dir.util'

export const showDocumentRequestController = async (req: Request, res: Response) => {

    const { reference, folder, name } = req.params

    const pathRoot = path.join(REQUEST_UPLOAD_DIR, reference, folder, name)

    console.log("pathRoot: ", pathRoot)

    const fileExists = await checkAndFileExists(pathRoot)

    if (!fileExists) {
        const pathRootImageDefault = path.join(ROOT_UPLOAD_DIR, "default.pdf")

        const fileExistImageDefault = await checkAndFileExists(pathRootImageDefault)
        if (!fileExistImageDefault) return res.status(404).json({ error: { message: 'Content not exist' } })

        const contentType = EXTENSION_MIME_TYPE['pdf']
        if (!contentType) return res.status(400).json({ error: { message: 'Extension not compatible' } })


        res.setHeader('Pragma-directive', 'no-cache')
        res.setHeader('Cache-directive', 'no-cache')
        res.setHeader('Cache-control', 'no-cache')
        res.setHeader('Pragma', 'no-cache')
        res.setHeader('Expires', '0')

        res.contentType(contentType)

        return res.sendFile(pathRootImageDefault)
    }

    const extension = name.split('.').pop()
    if (!extension) {
        return res.status(400).json({ error: { message: 'Extension not compatible' } })
    }

    const contentType = EXTENSION_MIME_TYPE[extension]
    if (!contentType) {
        return res.status(400).json({ error: { message: 'Extension not compatible' } })
    }

    res.setHeader('Pragma-directive', 'no-cache')
    res.setHeader('Cache-directive', 'no-cache')
    res.setHeader('Cache-control', 'no-cache')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')

    res.contentType(contentType)

    return res.sendFile(pathRoot)
}