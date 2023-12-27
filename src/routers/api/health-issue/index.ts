import { getAllHealthIssueController } from "@controllers/health-issue";
import { Router } from "express";

const router = Router()

router.get('/', getAllHealthIssueController)

export default router