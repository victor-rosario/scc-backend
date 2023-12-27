import path from 'path'

export const ROOT_UPLOAD_DIR = path.join(__dirname, '../../uploads')

export const REQUEST_UPLOAD_DIR = path.join(ROOT_UPLOAD_DIR, "requests")

export const EXTENSION_MIME_TYPE: Record<string, string> = Object.freeze({
    "png": "image/png",
    "jpg": "image/jpeg",
    "gif": "image/gif",
    "jpeg": "image/jpeg",
    "webp": "image/webp",
    "json": "application/json",
    "pdf": "application/pdf",
    "doc": "application/msword",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "xls": "application/vnd.ms-excel",
    "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "txt": "text/plain",
    "csv": "text/csv",
    "xml": "application/xml",
    "zip": "application/zip",
    "tar": "application/x-tar",
    "gz": "application/gzip",
})