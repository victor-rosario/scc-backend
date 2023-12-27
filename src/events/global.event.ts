import { EventEmitter } from 'events'
import { CallbackI } from './event.interface'

const event = new EventEmitter()

const globalEvent = {
	emit(eventName: string, data: unknown) {
		event.emit(eventName, data)
	},

	subscribe<T>(eventName: string, callback: CallbackI<T>) {
		event.on(eventName, callback)
	}
}

export default globalEvent
