import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { FormEntity } from './form.entity'
import { QuestionEntity } from './question.entity'
import { RequestEntity } from './request.entity'
import { Base } from '../base/basic.base'

@Entity({ name: 'form-requests' })
export class FormRequestEntity extends Base {

    @Column()
    formId: number

    @Column()
    questionId: number

    @Column()
    requestId: number

    @Column()
    value: number

    @ManyToOne(() => FormEntity, (form) => form.formRequests)
    @JoinColumn({ referencedColumnName: 'id', name: "formId" })
    form: FormEntity

    @ManyToOne(() => QuestionEntity, (question) => question.formRequests)
    @JoinColumn({ referencedColumnName: 'id', name: "questionId" })
    question: QuestionEntity

    @ManyToOne(() => RequestEntity, (request) => request.forms)
    @JoinColumn({ referencedColumnName: 'id', name: "requestId" })
    request: RequestEntity
}
