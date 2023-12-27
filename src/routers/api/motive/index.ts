import { Router } from 'express'
import {
    getAllMotiveController
} from "@controllers/motive"
const router = Router()

router.get("/", getAllMotiveController)

export default router
