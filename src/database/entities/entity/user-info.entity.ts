import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Base } from "../base/basic.base";
import { UserEntity } from "./user.entity";
import { Exclude } from "class-transformer";

export enum IdentificationEnum {
    ID_CARD = "ID_CARD",
    PASSPORT = "PASSPORT",
    NUI = "NUI",
}

export enum GenderEnum {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

export type IdentificationType = `${IdentificationEnum}`;
export type GenderType = `${GenderEnum}`;

@Entity({ name: 'user-info' })
export class UserInfoEntity extends Base {

    @Column()
    userName: string

    @Column()
    nationality: string;

    @Column()
    identification: string;

    @Column({ type: 'enum', enum: IdentificationEnum })
    identificationType: IdentificationType;

    @Column({ type: 'timestamptz' })
    birthDate: Date;

    @Column()
    phone: string;

    @Column({ nullable: true })
    mobile: string;

    @Column({ type: 'enum', enum: GenderEnum })
    gender: GenderType;

    @Column({ default: true })
    conversationAbility: boolean;

    @Column({ nullable: true })
    institutionName: string;

    @Column({ nullable: true })
    rnc: string;

    @Column({ nullable: true })
    institutionPosition: string;

    @Exclude({ toPlainOnly: true })
    @Column()
    userId: number

    @OneToOne(() => UserEntity, (user) => user.info)
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'userId'
    })
    user: UserEntity
}