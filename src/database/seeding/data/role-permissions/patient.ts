import { permissionData } from "../permission.data"

export const patientPermissions = permissionData.map((permission) => {
	const name = permission.name!

	switch (name) {
		case 'Requests':
			return {
				name,
				actions: {
					create: true,
					read: true,
					update: false,
					delete: false,
					page: true
				}
			}

		case 'Forms':
			return {
				name,
				actions: {
					create: false,
					read: false,
					update: false,
					delete: false,
					page: false
				}
			}

		default:
			return {
				name,
				actions: {
					create: false,
					read: false,
					update: false,
					delete: false,
					page: false
				}
			}
	}
})
