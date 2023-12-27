import { FormType } from '@database/entities/entity/form.entity'

export interface IFormData {
    title: string
    type: FormType,
    questions: {
        category: string
        code: string
        question: string
    }[]
}
