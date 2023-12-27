import { AppointmentEntity } from '@database/entities/entity/appointment.entity';
import { MoreThanOrEqual } from 'typeorm';

const now = new Date();
const TODAY = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
const MAX_CUSTOMERS_PER_DAY = 28;

export async function getAllAppointmentDaysService() {
  const appointments = await AppointmentEntity.find({
    where: {
      startAt: MoreThanOrEqual(TODAY)
    },
    cache: true
  });

  const appointmentsCounter = appointments.reduce((acc: Record<string, number>, appointment) => {
    const startDate = appointment.startAt.toDateString();
    acc[startDate] = (acc[startDate] || 0) + 1;
    return acc;
  }, {});

  const appointmentsCreated = Object.entries(appointmentsCounter).map(([startDate, count]) => ({
    date: new Date(startDate), 
    count,
    isAvailable: count < MAX_CUSTOMERS_PER_DAY
  }));

  return appointmentsCreated;
}


