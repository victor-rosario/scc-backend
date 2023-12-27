import { RoleEntity } from '@database/entities/entity/role.entity'
import { DataSource } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { roleData } from '../data/role.data'

export class RoleSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const repository = dataSource.getRepository(RoleEntity)

            await Promise.all(
                roleData.map(async (x) => {
                    const exists = await repository
                        .findOne({
                            where: {
                                slug: x.slug
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
                `❌ ~ file: role.seed.ts ~ RoleSeeder ~ run ~ error: `,
                error
            )
        }
    }
}
