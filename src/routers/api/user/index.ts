import { getUserByIdCardController } from "@controllers/user/getUserByIdCard.controller";
import { Router } from "express";

const router = Router()

router.get('/:identification', getUserByIdCardController)

export default router