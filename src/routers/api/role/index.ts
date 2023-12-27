import { getAllRoleController } from '@controllers/role'
import { Router } from 'express'

const router = Router()

router.get('/', getAllRoleController)

export default router