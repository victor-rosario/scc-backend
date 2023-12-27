import { answerFormQuestionController } from '@controllers/whoda'
import { getFormQuestionController } from '@controllers/whoda/getFormQuestion.controller'
import { FormQuestionDTO } from '@dto/form.dto'
import { validateDTO } from '@middlewares/dto/validate-dto.middleware'
import { Router } from 'express'

const router = Router()

router.post('/questions', validateDTO(FormQuestionDTO), answerFormQuestionController)
router.get('/questions', getFormQuestionController)

export default router
