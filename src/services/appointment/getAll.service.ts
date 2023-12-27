import { AppointmentEntity } from '@database/entities/entity/appointment.entity';
import { generateFormattedHourList } from '@utils/date/date.util';

interface IGetAllAppointment {
  time: string
}

export async function getAllAppointmentService({ time }: IGetAllAppointment) {
  const appointments = await AppointmentEntity.find({
    cache: true
  });

  const formattedHourList = generateFormattedHourList(time);
  const resultDate: Record<string, number> = {}

  formattedHourList.forEach((time) => {
    if (!resultDate[time]) resultDate[time] = 0
  });

  appointments.forEach(item => {
    const time = item.startAt.toString()
    if (resultDate[time] === null || resultDate[time] === undefined) return
    resultDate[time]++
  })

  const result = Object.entries(resultDate).reduce((acc: any[], item) => {
    const [time, count] = item
    const data = { time, count }
    acc = [...acc, data]
    return acc
  }, [])

  return result;
}
