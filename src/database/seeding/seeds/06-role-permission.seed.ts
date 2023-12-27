import { PermissionEntity } from '@database/entities/entity/permission.entity'
import { RolePermissionEntity } from '@database/entities/entity/role-permission.entity'
import { RoleEntity } from '@database/entities/entity/role.entity'
import { DataSource, In } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { rolePermissionData } from '../data/role-permission.data'

export class RolePermissionSeeder implements Seeder {
	async run(_factory: Factory, dataSource: DataSource): Promise<void> {
		const roleRepository = dataSource.getRepository(RoleEntity)
		const permissionRepository = dataSource.getRepository(PermissionEntity)
		const rolePermissionRepository =
			dataSource.getRepository(RolePermissionEntity)
		try {
			await Promise.all(
				rolePermissionData.map(async (roleData) => {
					const role = await roleRepository
						.findOne({
							where: {
								name: roleData.name
							}
						})
						.catch(() => null)


					if (!role) return

					const permissionNames = roleData.permissions.map(
						(p) => p.name
					)

					const permissions = await permissionRepository
						.find({
							where: {
								name: In(permissionNames)
							}
						})
						.catch(() => null)

					if (!permissions) return

					await Promise.all(
						permissions.map(async (permission) => {
							const actions = roleData.permissions.find(
								(p) => p.name === permission.name
							)!.actions

							await rolePermissionRepository
								.create({
									roleId: role.id,
									permissionId: permission.id,
									...actions
								})
								.save()
						})
					)
				})
			)
		} catch (error) {
			return console.error(
				`❌ ~ file: role-permission.seed.ts ~ RolePermissionSeeder ~ run ~ error: `,
				error
			)
		}
	}
}
