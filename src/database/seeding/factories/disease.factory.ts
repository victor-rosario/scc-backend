import { DiseaseHistoryEntity } from '@database/entities/entity/disease-history.entity'
import { define } from 'typeorm-seeding'

define(DiseaseHistoryEntity, () => {
    return new DiseaseHistoryEntity()
})
