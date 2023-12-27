import { Router } from 'express'
import {
    getAllDiseaseHistoryController
} from '@controllers/disease-histories'

const router = Router()

router.get('/', getAllDiseaseHistoryController)

export default router