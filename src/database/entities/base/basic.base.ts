import { Column, CreateDateColumn, DeleteDateColumn, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BareBase } from ".";
import { Exclude } from "class-transformer";

export class Base extends BareBase {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Generated("uuid")
    @Column()
    uuid: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    @Exclude({ toPlainOnly: true })
    updatedAt: Date

    @DeleteDateColumn()
    @Exclude({ toPlainOnly: true })
    deletedAt: Date
}