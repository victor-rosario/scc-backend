import { answerFormQuestionService } from '@services/whoda/answerFormQuestion.service'
import { Request, Response } from 'express'

export const answerFormQuestionController = async(req: Request, res: Response) => {
	answerFormQuestionService(req.body)
		.then((message) => {
			return res.json({ message });
		})
		.catch((e) => {
			res.status(500).json({ error: { message: e.message } })
		})
}
