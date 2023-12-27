import { createApplicantService } from '@services/request/applicant.service'
import { Request, Response } from 'express'

export const createApplicantController = async(req: Request, res: Response) => {
    createApplicantService(req.body).then((result) => {
        return res.json(result);
    }).catch(e => {
        res.status(500).json({ error: { message: e.message } })
    })
}