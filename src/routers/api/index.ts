import { Router } from 'express'
import { limitRateMiddleware } from '@middlewares/common/rate-limit.middleware'
import { authMiddleware } from '@middlewares/auth/auth.middleware'
import { unless } from '@utils/unless.util'

import authRouter from './auth'
import requestRouter from './request'
import motiveRouter from './motive'
import communicationRouter from './communication'
import biomedicalRouter from './biomedical'
import icodRouter from './icod'
import whodaRouter from './whoda'
import contextualFactorRouter from './contextual-factor'
import appointmentRouter from './appointment'
import roleRouter from './role'
import disabilityCertificateRouter from './disability-certificate'
import healthIssueRouter from './health-issue'
import territorialRouter from './territorial'
import diseaseHistoriesRouter from './disease-histories'
import userRouter from './user'

const router = Router()

router.use(
    '/auth',
    unless(
        [
            { path: '/signin', method: 'POST' },
        ],
        authMiddleware
    ),
    authRouter
)

router.use(
    '/requests',
    unless(
        [
            { path: '/applicant', method: 'POST' },
            { path: '/', method: 'POST' }
        ],
        authMiddleware),
    requestRouter
)

router.use('/motives', limitRateMiddleware(), motiveRouter)
router.use('/communications', limitRateMiddleware(), communicationRouter)
router.use('/biomedicals', authMiddleware, biomedicalRouter)
router.use('/icods', authMiddleware, icodRouter)
router.use('/whodas', authMiddleware, whodaRouter)
router.use('/contextual-factors', authMiddleware, contextualFactorRouter)
router.use('/appointments', limitRateMiddleware({ limit: 10 }), appointmentRouter)
router.use('/roles', limitRateMiddleware(), roleRouter)
router.use('/disability-certificate', authMiddleware, disabilityCertificateRouter)
router.use('/territorial', authMiddleware, territorialRouter)
router.use('/health-issues', authMiddleware, healthIssueRouter)
router.use('/disease-histories', authMiddleware, diseaseHistoriesRouter)
router.use('/users', limitRateMiddleware(), userRouter)

export default router
