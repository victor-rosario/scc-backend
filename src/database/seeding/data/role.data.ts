import { RoleEntity } from '@database/entities/entity/role.entity'

const roles = [
	{
		name: 'Super Admin',
	},
	{
		name: 'Admin',
	},
	{
		name: 'Evaluator',
	},
	{
		name: 'Patient',
	},
	{
		name: 'Institution',
	},
	{
		name: 'Representative',
	},
	{
		name: 'Receptionist',
	}
]

export const roleData: Partial<RoleEntity>[] = roles.map(
	(role): Partial<RoleEntity> => ({
		name: role.name,
		slug: role.name.replace(/ /g, '-').toLowerCase(),
	})
)
