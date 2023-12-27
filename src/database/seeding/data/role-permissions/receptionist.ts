import { permissionData } from '../permission.data'

export const receptionistPermissions = permissionData.map((permission) => {
	const name = permission.name!

	switch (name) {
		case 'Requests':
			return {
				name,
				actions: {
					create: true,
					read: true,
					update: true,
					delete: false,
					page: true
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
