import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "../base/basic.base";
import { RolePermissionEntity } from "./role-permission.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: 'roles' })
export class RoleEntity extends Base {
    @Column()
    name: string;

    @Column()
    slug: string;

    @OneToMany(() => UserEntity, (user) => user.role)
    users: UserEntity[]

    @OneToMany(() => (RolePermissionEntity), (rolePermission) => rolePermission.role)
    rolePermissions: RolePermissionEntity[];
}