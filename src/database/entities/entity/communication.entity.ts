import { Column, Entity } from "typeorm";
import { Base } from "../base/basic.base";

@Entity({ name: 'communications' })
export class CommunicationEntity extends Base {
    @Column()
    method: string;
}