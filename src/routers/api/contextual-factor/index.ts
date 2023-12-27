import { asnwerContextualFactorQuestionController } from "@controllers/contextual-factor";
import { AsnwerContextualFactorDTO } from "@dto/contextual-factor.dto";
import { validateDTO } from "@middlewares/dto/validate-dto.middleware";
import { Router } from "express";

const router = Router()

router.post('/questions', validateDTO(AsnwerContextualFactorDTO), asnwerContextualFactorQuestionController)

export default router