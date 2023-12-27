import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "../base/basic.base";
import { ContextualFactorEntity } from "./contextual-factor.entity";
import { QuestionFactorEntity } from "./question-factor.entity";

@Entity({ name: 'contextual-factor-questions' })
export class ContextualFactorQuestionEntity extends Base {    
    @Column()
    questionFactorId: number;

    @ManyToOne(() => (QuestionFactorEntity), (questionFactor) => questionFactor.contextualFactorQuestions)
    @JoinColumn({ name: 'questionFactorId', referencedColumnName: 'id' })
    questionFactor: QuestionFactorEntity;

    @Column()
    contextualFactorId: number;

    @ManyToOne(() => (ContextualFactorEntity), (contextualFactor) => contextualFactor.contextualFactorQuestions)
    @JoinColumn({ name: 'contextualFactorId', referencedColumnName: 'id' })
    contextualFactor: ContextualFactorEntity;

    @Column()
    value: string;

    @Column({ nullable: true })
    reason: string;
}