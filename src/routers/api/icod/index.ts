import { Router } from 'express'
import {
    getAllIcodController
} from "@controllers/icod"
const router = Router()

router.get("/", getAllIcodController)

export default router
