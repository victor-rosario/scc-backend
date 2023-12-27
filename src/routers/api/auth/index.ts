import { signInController } from '@controllers/auth'
import { createRequestController } from '@controllers/request'
import { SignInDTO } from '@dto/auth.dto'
import { CreateRequestDTO } from '@dto/request.dto'
import { validateDTO } from '@middlewares/dto/validate-dto.middleware'
import { Router } from 'express'
import multer from 'multer'

import meRouter from './me'
import { signOutController } from '@controllers/auth/signout.controller'
import { limitRateMiddleware } from '@middlewares/common/rate-limit.middleware'

const router = Router()
const requestMulter = multer();

router.post('/signin', validateDTO(SignInDTO), limitRateMiddleware(), signInController)
router.post('/signout', limitRateMiddleware(), signOutController)

router.post('/schedule', [
    limitRateMiddleware(),
    requestMulter.fields([
        { name: "identificationDocument", maxCount: 1 },
        { name: "biomedicalEvaluation", maxCount: 1 },
        { name: "complementaryStudy", maxCount: 1 },
    ]), 
    validateDTO(CreateRequestDTO, 'body', true, true),
], createRequestController)

router.use("/me", meRouter)
// router.post('/signout', authMiddleware, signOutController)

export default router
