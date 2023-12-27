import { Router } from 'express'
import {
    getAllCommunicationController
} from "@controllers/communication"
const router = Router()

router.get("/", getAllCommunicationController)

export default router