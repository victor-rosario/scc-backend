import { REQUEST_UPLOAD_DIR } from "@utils/upload.util"
import { checkAndCreateFolder } from '@utils/dir.util'

export default async () => {
    await checkAndCreateFolder(REQUEST_UPLOAD_DIR)
}