import { evaluatorPermissions } from './role-permissions/evaluator'
import { receptionistPermissions } from './role-permissions/receptionist'
import { PermissionDataI } from './role-permissions/role-permissions.interface'
import { superAdminPermissions } from './role-permissions/super-admin'
import { patientPermissions } from './role-permissions/patient'
import { institutionPermissions } from './role-permissions/institution'
import { representativePermissions } from './role-permissions/representative'

interface RolePermissionDataI {
	name: string
	permissions: PermissionDataI[]
}

export const rolePermissionData: RolePermissionDataI[] = [
	{
		name: 'Super Admin',
		permissions: superAdminPermissions
	},
	{
		name: 'Evaluator',
		permissions: evaluatorPermissions
	},
	{
		name: 'Receptionist',
		permissions: receptionistPermissions
	},
	{
		name: 'Patient',
		permissions: patientPermissions
	},
	{
		name: 'Institution',
		permissions: institutionPermissions
	},
	{
		name: 'Representative',
		permissions: representativePermissions
	},
]
