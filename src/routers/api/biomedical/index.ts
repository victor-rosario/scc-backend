import {
    createBiomedicalController
} from '@controllers/biomedical'
import { CreateBiomedicalDTO } from '@dto/biomedical'
import { validateDTO } from '@middlewares/dto/validate-dto.middleware'
import { Router } from 'express'

const router = Router()

router.post('/', [
    validateDTO(CreateBiomedicalDTO),
], createBiomedicalController)

export default router
