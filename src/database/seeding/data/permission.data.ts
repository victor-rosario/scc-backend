import { PermissionEntity } from '@database/entities/entity/permission.entity'

const permissions = [
	{
		name: 'Roles',
	},
	{
		name: 'Users',
	},
	{
		name: 'Requests',
	},
	{
		name: 'Forms',
	},
]

export const permissionData: Partial<PermissionEntity>[] = permissions.map(
	(permission): Partial<PermissionEntity> => ({
		name: permission.name,
		slug: permission.name.replace(/ /g, '-').toLowerCase()
	})
)
