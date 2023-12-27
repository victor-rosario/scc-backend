import { IPayloadRange } from './date.interface'

export const range = (payload: IPayloadRange) => {
	const datesFormatted = {
		start: payload.start ? new Date(payload.start) : new Date(),
		end: payload.end ? new Date(payload.end) : new Date()
	}

	datesFormatted.start.setHours(0, 0, 0)
	datesFormatted.end.setHours(23, 59, 59)

	return datesFormatted
}

export const generateFormattedHourList = (
	dateSelected: string | number = Date.now(),
	startTime = '08:00',
	numHours = 9,
) => {
	const list: string[] = []
	const [startHour, startMinute] = startTime.split(':')
	const time = new Date(dateSelected)

	time.setHours(Number(startHour), Number(startMinute), 0, 0)

	for (let i = 0; i < numHours; i++) {
		const newTime = new Date(time.toString())
		list.push(newTime.toString())
		time.setHours(time.getHours() + 1)
	}

	return list
}
