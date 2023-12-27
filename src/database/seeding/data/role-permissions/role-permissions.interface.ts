export interface PermissionDataI {
    name: string
    actions: {
        create: boolean
        read: boolean
        update: boolean
        delete: boolean
        page: boolean
    }
}