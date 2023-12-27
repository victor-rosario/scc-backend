import { getAllHealthIssueService } from "@services/health-issue/getAll.service";
import { Request, Response } from "express";

export const getAllHealthIssueController = async(_req: Request, res: Response) => {
    getAllHealthIssueService({ 
        cache: true
     }).then(healthIssues => {
        const data = healthIssues.map(healthIssue => ({
            uuid: healthIssue.uuid,
            origin: healthIssue.origin
        }));

        return res.json(data);
     }).catch(e => {
         res.status(500).json({ error: { message: e.message } })
     })
}