import { AppointmentEntity } from '@database/entities/entity/appointment.entity'
import {
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent
} from 'typeorm'

const HOUR_DEFAULT = 1

@EventSubscriber()
export class AppointmentSubscriber
	implements EntitySubscriberInterface<AppointmentEntity>
{
	public listenTo() {
		return AppointmentEntity
	}

	public beforeInsert(event: InsertEvent<AppointmentEntity>) {
		const data = event.entity

		const startAt = data.startAt
		const endAt = new Date(startAt)

		endAt.setHours(endAt.getHours() + HOUR_DEFAULT)

		event.entity.endAt = endAt
	}
}
