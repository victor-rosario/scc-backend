import { Socket } from 'socket.io'
import { NextSocketI } from '../socket.interface'
import userMemory from '@memory/user.memory'

export const authSocketMiddleware = (socket: Socket, next: NextSocketI) => {
	const userUUId = `${socket.handshake.query.token || ''}`.decrypt()
	const user = userMemory.get(`${userUUId}`)
	if (!user) return next(new Error('Unauthorized'))
	socket.data.user = user

	next()
}
