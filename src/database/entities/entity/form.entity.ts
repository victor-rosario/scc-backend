import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "../base/basic.base";
import { FormRequestEntity } from "./form-request.entity";
import { QuestionEntity } from "./question.entity";

export enum FormTypeEnum {
    BABY = "BABY",
    CHILD = "CHILD",
    CHILDREN_AND_YOUTH = "CHILDREN_AND_YOUTH",
    ADULT = "ADULT"
}

export type FormType = `${FormTypeEnum}`;

@Entity({ name: 'forms' })
export class FormEntity extends Base {
    @Column()
    title: string

    @Column({ type: 'enum', enum: FormTypeEnum })
    type: FormType;

    @OneToMany(() => (QuestionEntity), (question) => question.form)
    questions: QuestionEntity[];

    @OneToMany(() => (FormRequestEntity), (formRequest) => formRequest.form)
    formRequests: FormRequestEntity[];
}