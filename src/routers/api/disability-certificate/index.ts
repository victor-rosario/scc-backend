import { answerDisabilityCertificateController } from '@controllers/disability-certificate'
import { answerDisabilityCertificateDTO } from '@dto/disability-certificate.dto'
import { validateDTO } from '@middlewares/dto/validate-dto.middleware'
import { Router } from 'express'

const router = Router()

router.post('/', [
    validateDTO(answerDisabilityCertificateDTO),
], answerDisabilityCertificateController)

export default router