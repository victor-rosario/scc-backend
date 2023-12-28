import { cookieConfig } from '@config'
import userMemory from '@memory/user.memory'
import { UserEntity } from '@database/entities/entity/user.entity'
import { NextFunction, Request, Response } from 'express'

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken =
		//@ts-ignore
		req.session[cookieConfig.names.public]?.user?.decrypt()

	console.log("accessToken: ", accessToken)

	if (!accessToken) {
		return res.status(401).json({ error: { message: 'Unauthorized' } })
	}

	const userDataMemory = userMemory.get(accessToken)
	if (userDataMemory) {
		req.user = userDataMemory
		req.isSuperAdmin = req.user?.role?.slug == 'super-admin'
		return next()
	}

	const user = await UserEntity.findOne({
		where: {
			uuid: accessToken,
			active: true
		},
		relations: {
			role: true,
			info: true
		}
	})

	if (!user) {
		return res.status(401).json({ error: { message: 'Unauthorized' } })
	}

	userMemory.set(accessToken, user)

	req.user = user as UserEntity
	req.isSuperAdmin = req.user?.role?.slug == 'super-admin'

	return next()
}
