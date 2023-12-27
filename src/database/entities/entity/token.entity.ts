import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "../base/basic.base";
import { UserEntity } from "./user.entity";

export enum TokenEnum {
    RESET_PASSWORD = 'RESET_PASSWORD',
    USER_ACTIVATION = 'USER_ACTIVATION',
}

export type TokenType = `${TokenEnum}`

@Entity({ name: 'tokens' })
export class TokenEntity extends Base {

    @Column()
    userId: number;

    @Column()
    token: string;

    @Column({ type: 'enum', enum: TokenEnum })
    type: TokenType;

    @Column({ type: 'json', nullable: true })
    payload: Object;

    @Column({ default: false })
    used: boolean;

    @Column({ type: 'date' })
    expiredAt: Date;

    @Column({ type: 'date' })
    completedAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.tokens)
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'userId'
    })
    user: UserEntity;

}