import { UserPermissionEntity } from '@database/entities/entity/user-permission.entity'
import { RolePermissionEntity } from '@database/entities/entity/role-permission.entity'
import { NextFunction, Request, Response } from 'express'

interface PermissionI {
	permission: string
	actions: {
		create?: boolean
		read?: boolean
		update?: boolean
		delete?: boolean
	}
}

export const permissionMiddleware = ({ permission, actions }: PermissionI) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		let hasPermission = false
		const isSuperAdmin = req.user?.role.slug == 'super-admin'
		if (isSuperAdmin) {
			hasPermission = Boolean(
				await RolePermissionEntity.findOne({
					where: {
						roleId: req.user!.role.id,
						permission: {
							slug: permission
						},
						...(actions.create && { create: true }),
						...(actions.read && { read: true }),
						...(actions.update && { update: true }),
						...(actions.delete && { delete: true })
					}
				}).catch(() => null)
			)
		} else {
			hasPermission = Boolean(
				await UserPermissionEntity.findOne({
					where: {
						userId: req.user!.id,
						permission: {
							slug: permission
						},
						...(actions.create && { create: true }),
						...(actions.read && { read: true }),
						...(actions.update && { update: true }),
						...(actions.delete && { delete: true })
					}
				}).catch(() => null)
			)
		}

		if (!hasPermission) {
			return res.status(403).json({ error: { message: 'Forbidden' } })
		}

		return next()
	}
}
