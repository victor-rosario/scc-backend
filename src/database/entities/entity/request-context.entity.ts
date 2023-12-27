import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { RequestEntity } from "./request.entity";
import { Base } from "../base/basic.base";

@Entity({ name: 'request-contexts' })
export class RequestContextEntity extends Base {
    @Column()
    description: string;

    @Column()
    requestId: number;

    @OneToOne(() => (RequestEntity), (request) => request.forecast)
    @JoinColumn({ name: "requestId", referencedColumnName: "id" })
    request: RequestEntity;
}