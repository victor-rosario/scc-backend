import { getAllMunicipalityController } from "@controllers/territorial/municipality";
import { getAllProvincesController } from "@controllers/territorial/province";
import { Router } from "express";

const router = Router()

router.get('/municipalities', getAllMunicipalityController)
router.get('/provinces', getAllProvincesController)

export default router