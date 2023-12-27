import { DataSource } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { diseaseData } from '../data/disease.data'
import { DiseaseHistoryEntity } from '@database/entities/entity/disease-history.entity'

export class DeseaseSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const repository = dataSource.getRepository(DiseaseHistoryEntity)

            await Promise.all(
                diseaseData.map(async (x) => {
                    const exists = await repository
                        .findOne({
                            where: {
                                disease: x.disease
                            }
                        })
                        .catch((e) =>
                            console.error('desease Validation Error', e)
                        )
                    if (exists) return
                    await repository.insert(x)
                })
            )
        } catch (error) {
            return console.error(
                `❌ ~ file: disease.seed.ts ~ DiseaseSeeder ~ run ~ error: `,
                error
            )
        }
    }
}
