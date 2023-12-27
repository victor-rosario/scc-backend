import { Factory, Seeder } from 'typeorm-seeding'
import { DataSource } from 'typeorm'
import { ProvincesEntity } from '@database/entities/entity/province.entity'
import { MunicipalitiesEntity } from '@database/entities/entity/municipality.entity'
import { territorialData } from '../data/territorial/territorial.data'

export class TerritorialSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const provinceRepository = dataSource.getRepository(ProvincesEntity)
            const municipalityRepository = dataSource.getRepository(MunicipalitiesEntity)

            await Promise.all(
                territorialData.map(async (territorial) => {
                    const exists = await provinceRepository
                        .findOne({
                            where: {
                                name: territorial.province
                            }
                        })
                        .catch((e) =>
                            console.error('provinceRepository Validation Error', e)
                        )
                    if (exists) return
                    const province = await provinceRepository.create({
                        name: territorial.province,
                        slug: territorial.province.replace(/ /g, '-').toLowerCase(),
                    }).save()

                    await Promise.all(territorial.municipalities.map(async (municipality) => {
                        const exists = await municipalityRepository
                            .findOne({
                                where: {
                                    name: municipality
                                }
                            })
                            .catch((e) =>
                                console.error('municipalityRepository Validation Error', e)
                            )
                        if (exists) return
                        await municipalityRepository.insert({
                            name: municipality,
                            slug: municipality.replace(/ /g, '-').toLowerCase(),
                            provinceId: province.id
                        })
                    }))
                })
            )
        } catch (error) {
            return console.error(
                `❌ ~ file: 15-territorial.seed.ts ~ TerritorialSeeder ~ run ~ error: `,
                error
            )
        }
    }
}
