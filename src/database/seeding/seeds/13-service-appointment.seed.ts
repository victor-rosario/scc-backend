import { Factory, Seeder } from 'typeorm-seeding'
import { DataSource } from 'typeorm'
import { ServiceAppointmentEntity } from '@database/entities/entity/service-appointment.entity'
import { serviceAppointmentData } from '../data/service-appointment.data'

export class ServiceAppointmentSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const repository = dataSource.getRepository(ServiceAppointmentEntity)

            await Promise.all(
                serviceAppointmentData.map(async (serviceAppointment) => {
                    const exists = await repository
                        .findOne({
                            where: {
                                service: serviceAppointment.service
                            }
                        })
                        .catch((e) =>
                            console.error('serviceAppointmentData Validation Error', e)
                        )
                    if (exists) return
                    await repository.insert(serviceAppointment)
                })
            )
        } catch (error) {
            return console.error(
                `❌ ~ file: service-appointment.seed.ts ~ ServiceAppointmentSeeder ~ run ~ error: `,
                error
            )
        }
    }
}
