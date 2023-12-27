import { Exclude, instanceToPlain } from "class-transformer";
import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";

export class BareBase extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Exclude({ toPlainOnly: true })
    id: number;

    toJSON() {
        return instanceToPlain(this);
    }
}