import { getAllAppointmentController, getAllAppointmentDaysController } from '@controllers/appointment'
import { Router } from 'express'

const router = Router()

router.get('/', getAllAppointmentDaysController)
router.get('/hours', getAllAppointmentController)

export default router