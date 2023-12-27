import { permissionData } from "../permission.data"

export const superAdminPermissions = permissionData.map(permission => ({
    name: permission.name!,
    actions: {
        create: true,
        read: true,
        update: true,
        delete: true,
        page: true
    }
}))