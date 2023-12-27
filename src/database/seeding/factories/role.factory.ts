import { RoleEntity } from '@database/entities/entity/role.entity'
import { define } from 'typeorm-seeding'

define(RoleEntity, () => {
    return new RoleEntity()
})
