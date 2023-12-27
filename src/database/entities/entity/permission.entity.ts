import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "../base/basic.base";
import { RolePermissionEntity } from "./role-permission.entity";

@Entity({ name: 'permissions' })
export class PermissionEntity extends Base {
    @Column()
    name: string;

    @Column()
    slug: string;

    @OneToMany(() => (RolePermissionEntity), (rolePermission) => rolePermission.permission)
    rolePermissions: RolePermissionEntity[];
}