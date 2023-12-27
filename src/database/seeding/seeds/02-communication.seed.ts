import { CommunicationEntity } from '@database/entities/entity/communication.entity'
import { DataSource } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { communicationData } from '../data/communication.data'

export class CommunicationSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const repository = dataSource.getRepository(CommunicationEntity)

            await Promise.all(
                communicationData.map(async (communication) => {
                    const exists = await repository
                        .findOne({
                            where: {
                                method: communication.method
                            }
                        })
                        .catch((e) =>
                            console.error('communication Validation Error', e)
                        )
                    if (exists) return
                    await repository.insert(communication)
                })
            )
        } catch (error) {
            return console.error(
                `❌ ~ file: communication.seed.ts ~ CommunicationSeeder ~ run ~ error: `,
                error
            )
        }
    }
}
