import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { PermissionEntity } from "./permission.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: 'user-permissions' })
export class UserPermissionEntity extends BaseEntity {

    @PrimaryColumn()
    @Exclude({ toPlainOnly: true })
    permissionId: number

    @PrimaryColumn()
    @Exclude({ toPlainOnly: true })
    userId: number

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

    @ManyToOne(() => (PermissionEntity), (permission) => permission.rolePermissions)
    @JoinColumn({ referencedColumnName: 'id', name: "permissionId" })
    permission: PermissionEntity;

    @ManyToOne(() => (UserEntity), (user) => user.userPermissions)
    @JoinColumn({ referencedColumnName: 'id', name: "userId" })
    user: UserEntity;
}