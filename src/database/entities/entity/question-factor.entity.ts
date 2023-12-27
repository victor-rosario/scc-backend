import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "../base/basic.base";
import { ContextualFactorQuestionEntity } from "./contextual-factor-question.entity";

@Entity({ name: 'question-factors' })
export class QuestionFactorEntity extends Base {
    @Column()
    question: string;

    @Column()
    category: string;

    @OneToMany(() => (ContextualFactorQuestionEntity), (contextualFactorQuestion) => contextualFactorQuestion.questionFactor)
    contextualFactorQuestions: ContextualFactorQuestionEntity[];
}