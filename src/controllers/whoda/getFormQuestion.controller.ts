import { getFormQuestionService } from '@services/whoda/getFormQuestion.service'
import { Request, Response } from 'express'

export const getFormQuestionController = async(_req: Request, res: Response) => {
    getFormQuestionService({
        relations: { questions: true },
    }).then(result => {
        const data = result.map((form) => ({
            uuid: form.uuid,
            title: form.title,
            questions: form.questions.map((question) => ({
                uuid: question.uuid,
                question: `${question.code} - ${question.question}`,
                category: question.category
            }))
        }))
        res.json(data);
    }).catch((e) => {
        res.status(500).json({ error: { message: e.message } })
    })
}