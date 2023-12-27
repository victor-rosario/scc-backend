import { Factory, Seeder } from 'typeorm-seeding'
import { DataSource } from 'typeorm'
import { InternationalClassificationDiseaseEntity } from '@database/entities/entity/international-classification-of-diseases.entity'
import { classificationDiseaseData } from '../data/international-classification-of-disease.data'

export class InternationalClassificationDiseaseSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const repository = dataSource.getRepository(InternationalClassificationDiseaseEntity)

            await Promise.all(
                classificationDiseaseData.map(async (classificationDisease) => {
                    const exists = await repository
                        .findOne({
                            where: {
                                code: classificationDisease.code
                            }
                        })
                        .catch((e) =>
                            console.error('classificationDiseaseData Validation Error', e)
                        )
                    if (exists) return
                    await repository.insert(classificationDisease)
                })
            )
        } catch (error) {
            return console.error(
                `❌ ~ file: international-classification-of-disease.seed.ts ~ InternationalClassificationDiseaseSeeder ~ run ~ error: `,
                error
            )
        }
    }
}
