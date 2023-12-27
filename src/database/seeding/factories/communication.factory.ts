import { CommunicationEntity } from '@database/entities/entity/communication.entity'
import { define } from 'typeorm-seeding'

define(CommunicationEntity, () => {
    return new CommunicationEntity()
})
