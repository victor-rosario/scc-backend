import { PermissionEntity } from '@database/entities/entity/permission.entity'
import { DataSource } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { permissionData } from '../data/permission.data'

export class PermissionSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const repository = dataSource.getRepository(PermissionEntity)

            await Promise.all(
                permissionData.map(async (x) => {
                    const exists = await repository
                        .findOne({
                            where: {
                                slug: x.slug
                            }
                        })
                        .catch((e) =>
                            console.error('permission Validation Error', e)
                        )
                    if (exists) return
                    await repository.insert(x)
                })
            )
        } catch (error) {
            return console.error(
                `❌ ~ file: permission.seed.ts ~ PermissionSeeder ~ run ~ error: `,
                error
            )
        }
    }
}
