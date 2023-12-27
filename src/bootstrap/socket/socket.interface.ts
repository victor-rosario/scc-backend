import { ExtendedError } from "socket.io/dist/namespace"

export interface NextSocketI {
    (error?: ExtendedError): void
}

export enum NamespacesEnum {
    NOTIFICATIONS = "/notifications"
}

export type NamespacesType = `${NamespacesEnum}`