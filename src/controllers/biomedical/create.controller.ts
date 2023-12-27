import { createBiomedicalService } from '@services/biomedical/create.service'
import { Request, Response } from 'express'

export const createBiomedicalController = async (req: Request, res: Response) => {
    await createBiomedicalService(req.body)
        .then(() => res.json({ created: true })).catch(e => {
            res.status(500).json({ error: { message: e.message } })
        })
}