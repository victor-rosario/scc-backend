import { RoleEntity } from '@database/entities/entity/role.entity'
import { UserInfoEntity } from '@database/entities/entity/user-info.entity'
import { UserPasswordEntity } from '@database/entities/entity/user-password.entity'
import { UserEntity } from '@database/entities/entity/user.entity'
import { usersData } from '@database/seeding/data/user.data'
import { DataSource } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'

export class UserSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        const roleRepository = dataSource.getRepository(RoleEntity)
        const userRepository = dataSource.getRepository(UserEntity)
        const userInfoRepository = dataSource.getRepository(UserInfoEntity)
        const userPasswordRepository = dataSource.getRepository(UserPasswordEntity)

        try {
            await Promise.all(
                usersData.map(async (userData) => {
                    const exists = await userRepository
                        .findOne({
                            where: {
                                email: userData.email
                            }
                        })
                        .catch((e) =>
                            console.error('userRepository validation error:', e)
                        )

                    if (exists) return

                    const role = await roleRepository
                        .findOne({
                            relations: {
                                rolePermissions: {
                                    permission: true
                                }
                            },
                            where: {
                                name: userData.role
                            }
                        })
                        .catch(() => null)

                    if (!role) return

                    const user = await userRepository
                        .create({
                            email: userData.email,
                            active: userData.active,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            roleId: role.id
                        })
                        .save()

                    await userInfoRepository
                        .create({
                            ...userData.info,
                            user
                        })
                        .save()

                    const expiredAt = new Date()
                    expiredAt.setMonth(expiredAt.getMonth() + 10)

                    await userPasswordRepository
                        .create({
                            password: userData.password,
                            user,
                            active: true,
                            expiredAt
                        })
                        .save()

                })
            )
        } catch (error) {
            return console.error(
                `❌ ~ file: user.seed.ts ~ UserSeeder ~ run ~ error: `,
                error
            )
        }
    }
}
