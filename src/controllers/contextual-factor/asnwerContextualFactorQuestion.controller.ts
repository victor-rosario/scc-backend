import { asnwerContextualFactorQuestionService } from '@services/contextual-factor/answerContextualFactorQuestion.service'
import { Request, Response } from 'express'

export const asnwerContextualFactorQuestionController = async(req: Request, res: Response) => {
    asnwerContextualFactorQuestionService(req.body).then((result) => {
        return res.json(result)
    }).catch((e) => {
        return res.json({ error: { message: e.message } })
    })
}