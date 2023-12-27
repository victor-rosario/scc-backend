import { Factory, Seeder } from 'typeorm-seeding'
import { DataSource } from 'typeorm'
import { SupportProductEntity } from '@database/entities/entity/support-product.entity'
import { supportProductData } from '../data/support-product.data'

export class SupportProductSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const repository = dataSource.getRepository(SupportProductEntity)

            await Promise.all(
                supportProductData.map(async (supportProductData) => {
                    const exists = await repository
                        .findOne({
                            where: {
                                name: supportProductData.name
                            }
                        })
                        .catch((e) =>
                            console.error('supportProductData Validation Error', e)
                        )
                    if (exists) return
                    await repository.insert(supportProductData)
                })
            )
        } catch (error) {
            return console.error(
                `❌ ~ file: support-product.seed.ts ~ SupportProductSeeder ~ run ~ error: `,
                error
            )
        }
    }
}
