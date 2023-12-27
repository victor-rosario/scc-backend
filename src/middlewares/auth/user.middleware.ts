import { NextFunction, Request, Response } from 'express'
import { cookieConfig } from '@config'
// import { localMemory } from '@memory/index'

export const userAuthMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken = `${req.session[cookieConfig.names.public]}`.decrypt()

	if (!accessToken) {
		return res.status(401).json({ error: { message: 'Unauthorized' } })
	}

	// const userMemory = await localMemory.get<UserEntity>(accessToken)
	// if (userMemory) {
	// 	req.user = userMemory
	// 	return next()
	// }

	// const user = await getOneUserService({
	// 	where: {
	// 		uuid: accessToken
	// 	}
	// })

	// if (!user) {
	// 	return res.status(401).json({ error: { message: 'Unauthorized' } })
	// }

	// localMemory.set(accessToken, user)
	// req.user = user

	return next()
}
