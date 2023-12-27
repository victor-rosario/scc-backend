import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { PermissionEntity } from "./permission.entity";
import { RoleEntity } from "./role.entity";

@Entity({ name: 'role-permissions' })
export class RolePermissionEntity extends BaseEntity {

    @PrimaryColumn()
    @Exclude({ toPlainOnly: true })
    roleId: number

    @PrimaryColumn()
    @Exclude({ toPlainOnly: true })
    permissionId: number

    @Column({ default: false })
    create: boolean;

    @Column({ default: false })
    read: boolean;

    @Column({ default: false })
    update: boolean;

    @Column({ default: false })
    delete: boolean;

    @Column({ default: false })
    page: boolean;

    @ManyToOne(() => (RoleEntity), (role) => role.rolePermissions)
    @JoinColumn({ referencedColumnName: 'id', name: "roleId" })
    role: RoleEntity;

    @ManyToOne(() => (PermissionEntity), (permission) => permission.rolePermissions)
    @JoinColumn({ referencedColumnName: 'id', name: "permissionId" })
    permission: PermissionEntity;
}