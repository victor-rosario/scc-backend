import { UserEntity } from '@database/entities/entity/user.entity'
import { define } from 'typeorm-seeding'

define(UserEntity, () => {
    return new UserEntity()
})
