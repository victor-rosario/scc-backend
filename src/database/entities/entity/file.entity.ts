import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Base } from "../base/basic.base";
import { Exclude } from "class-transformer";
import { RequestEntity } from "./request.entity";

export enum FileTypeEnum {
    DOCUMENT = "DOCUMENT",
    IDENTIFICATION_DOCUMENT = "IDENTIFICATION_DOCUMENT",
    BIOMEDICAL_EVALUATION = "BIOMEDICAL_EVALUATION",
    COMPLEMENTARY_STUDY = 'COMPLEMENTARY_STUDY'
}

export type FileType = `${FileTypeEnum}`

@Entity({ name: 'files' })
export class FileEntity extends Base {
    @Column()
    fileName: string;

    @Column({ type: "enum", enum: FileTypeEnum })
    type: FileType;

    @Exclude({ toPlainOnly: true })
    @ManyToMany(() => RequestEntity)
    @JoinTable({
        name: 'request-files',
        joinColumn: {
            name: 'fileId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'requestId',
            referencedColumnName: 'id'
        }
    })
    requests: RequestEntity[];
}