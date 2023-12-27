import { Factory, Seeder } from 'typeorm-seeding'
import { DataSource } from 'typeorm'
import { FormEntity } from '@database/entities/entity/form.entity'
import { formData } from '../data/form.data'
import { QuestionEntity } from '@database/entities/entity/question.entity'

export class FormSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const repository = dataSource.getRepository(FormEntity)
            const repositoryQuestion = dataSource.getRepository(QuestionEntity)

            await Promise.all(
                formData.map(async (_formData) => {
                    const exists = await repository
                        .findOne({
                            where: {
                                title: _formData.type
                            }
                        })
                        .catch((e) =>
                            console.error('healthIssueData Validation Error', e)
                        )
                    if (exists) return

                        const { questions, ..._formDataRest } = _formData.form
                    
                    const findForm = await repository.findOne({ where: { title: _formData.form.title } })
                    if(findForm) return

                    const form = await repository.create(_formDataRest).save()

                    await Promise.all(questions.map(async (questionData) => {

                        const exists = await repositoryQuestion.findOne({
                            where:{
                                question: questionData.question,
                                formId: form.id
                            }
                        })
                        if(exists) return

                        await repositoryQuestion.create({
                            ...questionData,
                            formId: form.id
                        }).save()
                    }))
                })
            )
        } catch (error) {
            return console.error(
                `❌ ~ file: health-issue.seed.ts ~ HealthIssueSeeder ~ run ~ error: `,
                error
            )
        }
    }
}
