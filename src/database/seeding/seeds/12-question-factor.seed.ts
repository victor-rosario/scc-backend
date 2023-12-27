import { Factory, Seeder } from 'typeorm-seeding'
import { DataSource } from 'typeorm'
import { QuestionFactorEntity } from '@database/entities/entity/question-factor.entity'
import { questionFactorData } from '../data/question-factor.data'

export class QuestionFactorSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const repository = dataSource.getRepository(QuestionFactorEntity)

            await Promise.all(
                questionFactorData.map(async (questionFactorData) => {
                    const exists = await repository
                        .findOne({
                            where: {
                                question: questionFactorData.question
                            }
                        })
                        .catch((e) =>
                            console.error('questionFactorData Validation Error', e)
                        )
                    if (exists) return
                    await repository.insert(questionFactorData)
                })
            )
        } catch (error) {
            return console.error(
                `❌ ~ file: question-factor.seed.ts ~ QuestionFactorSeeder ~ run ~ error: `,
                error
            )
        }
    }
}
