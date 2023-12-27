import { Factory, Seeder } from 'typeorm-seeding'
import { DataSource } from 'typeorm'
import { HealthIssueEntity } from '@database/entities/entity/health-issue.entity'
import { healthIssueData } from '../data/health-issue.data'

export class HealthIssueSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const repository = dataSource.getRepository(HealthIssueEntity)

            await Promise.all(
                healthIssueData.map(async (healthIssue) => {
                    const exists = await repository
                        .findOne({
                            where: {
                                origin: healthIssue.origin
                            }
                        })
                        .catch((e) =>
                            console.error('healthIssueData Validation Error', e)
                        )
                    if (exists) return
                    await repository.insert(healthIssue)
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
