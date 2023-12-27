import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../base/basic.base";
import { FormEntity } from "./form.entity";
import { FormRequestEntity } from "./form-request.entity";

@Entity({ name: 'questions' })
export class QuestionEntity extends Base {
    @Column()
    code: string;
    
    @Column()
    question: string;

    @Column()
    category: string

    @Column()
    formId: number

    @ManyToOne(() => (FormEntity), (form) => form.questions)
    @JoinColumn({ name: "formId", referencedColumnName: "id" })
    form: FormEntity;

    @OneToMany(() => (FormRequestEntity), (formRequest) => formRequest.form)
    @JoinColumn()
    formRequests: FormRequestEntity[];
}