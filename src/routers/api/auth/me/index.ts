import { meController } from '@controllers/user'
import { Router } from 'express'

const router = Router()

router.get('/', meController)

export default router
