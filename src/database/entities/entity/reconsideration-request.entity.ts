import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { RequestEntity } from "./request.entity";
import { FileEntity } from "./file.entity";
import { Base } from "../base/basic.base";

@Entity({ name: 'reconsideration-requests' })
export class ReconsiderationRequestEntity extends Base {
    @Column({ default: false })
    disagreementDenial: boolean;

    @Column({ default: false })
    disagreementCertification: boolean;

    @Column({ default: false })
    disabilityOrigin: boolean;

    @Column({ default: false })
    disabilityExistence: boolean;

    @Column()
    reason: string;

    @Column()
    requestId: number;

    @OneToOne(() => (RequestEntity), (request) => request.reconsideration)
    @JoinColumn({ name: "requestId", referencedColumnName: "id" })
    request: RequestEntity;

    @ManyToMany(() => FileEntity)
    @JoinTable({
        name: 'reconsideration-files',
        joinColumn: {
            name: 'reconsideration-requests',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'files',
            referencedColumnName: 'id'
        }
    })
    reconsiderationFiles: FileEntity[];
}