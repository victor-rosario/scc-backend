import globalEvent from '@events/global.event'
import { NotificationEventsEnum } from '@interfaces/notifications/notifications.enum'
import { INotificationEventPayload } from '@interfaces/notifications/notifications.interface'
import { authSocketMiddleware } from 'bootstrap/socket/middleware/auth.middleware'
import { NamespacesEnum } from 'bootstrap/socket/socket.interface'
import { Server } from 'socket.io'

export default (io: Server) => {
	const namespace = io.of(NamespacesEnum.NOTIFICATIONS)

	namespace.use(authSocketMiddleware)

	namespace.on('connection', (socket) => {
		if (!socket.data || !socket.data.user.uuid) return
		socket.join(socket.data.user.uuid)
	})

	globalEvent.subscribe<INotificationEventPayload>(
		NotificationEventsEnum.NEW_NOTIFICATION,
		({ userUUID, notification }) => {
			namespace.to(userUUID).emit(NotificationEventsEnum.NEW_NOTIFICATION, notification)
		}
	)
}
