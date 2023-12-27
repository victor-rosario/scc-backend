// import { UserEntity } from '@database/entities/public/user.entity'
import { NotificationTypes } from './notifications.enum'
// import { NotificationEntity } from '@database/entities/public/notification.entity'

export interface ICreateNotificationPayload {
	userId?: number // It's used only if user is not provided
	user?: any // If it's present, userId is ignored
	title: string
	description: string
	payload: object
	type: NotificationTypes
}

export interface INotificationEventPayload {
	userUUID: string
	notification: Partial<any>
}
