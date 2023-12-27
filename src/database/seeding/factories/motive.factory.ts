import { MotiveRequestEntity } from '@database/entities/entity/motive-request.entity'
import { define } from 'typeorm-seeding'

define(MotiveRequestEntity, () => {
    return new MotiveRequestEntity()
})
