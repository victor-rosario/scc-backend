import { Column, Entity } from "typeorm";
import { Base } from "../base/basic.base";

@Entity({ name: 'motives-request' })
export class MotiveRequestEntity extends Base {
    @Column()
    motive: string;
}