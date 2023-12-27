import { Factory, Seeder } from 'typeorm-seeding'
import { DataSource } from 'typeorm'
import { BranchOfficeEntity } from '@database/entities/entity/branch-office.entity'
import { branchOfficeData } from '../data/branch-office.data'

export class BranchOfficeSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const repository = dataSource.getRepository(BranchOfficeEntity)

            await Promise.all(
                branchOfficeData.map(async (branchOffice) => {
                    const exists = await repository
                        .findOne({
                            where: {
                                street: branchOffice.street
                            }
                        })
                        .catch((e) =>
                            console.error('branchOfficeData Validation Error', e)
                        )
                    if (exists) return
                    await repository.insert(branchOffice)
                })
            )
        } catch (error) {
            return console.error(
                `❌ ~ file: branch-office.seed.ts ~ BranchOfficeSeeder ~ run ~ error: `,
                error
            )
        }
    }
}
