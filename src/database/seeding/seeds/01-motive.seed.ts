import { Factory, Seeder } from 'typeorm-seeding'
import { motiveData } from '../data/motive.data'
import { DataSource } from 'typeorm'
import { MotiveRequestEntity } from '@database/entities/entity/motive-request.entity'

export class MotiveSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const repository = dataSource.getRepository(MotiveRequestEntity)

            await Promise.all(
                motiveData.map(async (motive) => {
                    const exists = await repository
                        .findOne({
                            where: {
                                motive: motive.motive
                            }
                        })
                        .catch((e) =>
                            console.error('motiveData Validation Error', e)
                        )
                    if (exists) return
                    await repository.insert(motive)
                })
            )
        } catch (error) {
            return console.error(
                `❌ ~ file: motive.seed.ts ~ MotiveSeeder ~ run ~ error: `,
                error
            )
        }
    }
}
