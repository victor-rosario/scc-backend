import { compareSync } from "bcryptjs";
import { Exclude } from "class-transformer";
import { Column, Entity, IsNull, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Base } from "../base/basic.base";
import { RequestEntity } from "./request.entity";
import { RoleEntity } from "./role.entity";
import { UserAddressStreetEntity } from "./user-address-street.entity";
import { UserInfoEntity } from "./user-info.entity";
import { UserPasswordEntity } from "./user-password.entity";
import { UserPermissionEntity } from "./user-permission.entity";
import { TokenEntity } from "./token.entity";

@Entity({ name: 'users' })
export class UserEntity extends Base {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    email: string;

    @Column()
    active: boolean

    @Column()
    @Exclude({ toPlainOnly: true })
    roleId: number

    @ManyToOne(() => RoleEntity, (role) => role.users)
    @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
    role: RoleEntity

    @Exclude({ toPlainOnly: true })
    @OneToMany(() => UserPasswordEntity, (passwords) => passwords.user)
    passwords: Array<UserPasswordEntity>

    @Exclude({ toPlainOnly: true })
    @OneToOne(() => UserInfoEntity, (info) => info.user)
    info: UserInfoEntity

    @Exclude({ toPlainOnly: true })
    @OneToOne(() => UserAddressStreetEntity, (addressStreet) => addressStreet.user)
    addressStreet: UserAddressStreetEntity;

    @Exclude({ toPlainOnly: true })
    @OneToMany(() => UserPermissionEntity, (userPermissions) => userPermissions.user)
    userPermissions: UserPermissionEntity[]

    @Exclude({ toPlainOnly: true })
    @OneToMany(() => TokenEntity, (token) => token.user)
    tokens: TokenEntity[]

    @Exclude({ toPlainOnly: true })
    @ManyToMany(() => UserEntity)
    @JoinTable({
        name: 'user-applicant-patients',
        joinColumn: {
            name: 'applicantId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'patientId',
            referencedColumnName: 'id'
        }
    })
    applicants: UserEntity[];

    @Exclude({ toPlainOnly: true })
    @ManyToMany(() => RequestEntity)
    @JoinTable({
        name: 'user-requests',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'requestId',
            referencedColumnName: 'id'
        }
    })
    requests: RequestEntity[];

    async validPassword(password: string): Promise<boolean> {
        const activePassword = await UserPasswordEntity.findOne({
            where: {
                active: true,
                userId: this.id,
                deletedAt: IsNull()
            }
        })
        if (!activePassword) return false

        return compareSync(password, activePassword.password)
    }
}