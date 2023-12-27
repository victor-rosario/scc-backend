import { serverConfig } from "@config";

interface IGeneratePictureUtil {
    uuid: string
    filename: string
}

export const generateRequestPictureUtil = (payload: IGeneratePictureUtil) => {
    return `${serverConfig.appUrl}/api/requests/view/${payload.uuid}/documents/${payload.filename}`
}