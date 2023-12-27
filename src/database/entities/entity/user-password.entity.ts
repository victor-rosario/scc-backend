import { Column, Entity, JoinColumn, ManyToOne, BeforeInsert } from "typeorm";
import { Base } from "../base/basic.base";
import { UserEntity } from "./user.entity";
import { hashSync } from "bcryptjs";

@Entity({ name: 'user-passwords' })
export class UserPasswordEntity extends Base {
    @Column()
    password: string;

    @Column({ default: false })
    active: boolean;

    @Column()
    userId: number

    @Column({ type: 'date' })
    expiredAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.passwords)
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'userId'
    })
    user: UserEntity

    @BeforeInsert()
    encryptPassword() {
        this.password = hashSync(this.password, 10)
    }
}