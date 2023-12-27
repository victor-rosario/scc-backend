import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Base } from "../base/basic.base";
import { RequestEntity } from "./request.entity";
import { ContextualFactorQuestionEntity } from "./contextual-factor-question.entity";
import { SupportProductRequestEntity } from "./support-product-request.entity";

@Entity({ name: 'contextual-factors' })
export class ContextualFactorEntity extends Base {
    @Column()
    requestId: number;

    @OneToOne(() => (RequestEntity), (request) => request.contextualFactor)
    @JoinColumn({ name: 'requestId', referencedColumnName: 'id' })
    request: RequestEntity;

    @OneToMany(() => (ContextualFactorQuestionEntity), (contextualFactorQuestion) => contextualFactorQuestion.questionFactor)
    contextualFactorQuestions: ContextualFactorQuestionEntity[];

    @OneToMany(() => (SupportProductRequestEntity), (supportProductRequest) => supportProductRequest.contextualFactor)
    supportProductRequests: SupportProductRequestEntity[];
}