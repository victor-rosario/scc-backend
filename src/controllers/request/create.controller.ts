import { createRequestService } from '@services/request/create.service';
import { Request, Response } from 'express'

export const createRequestController = async (req: Request, res: Response) => {
    await createRequestService(req.body, req.files)
        .then(data => res.json(data))
        .catch(e => {
            res.status(500).json({ error: { message: e.message } })
        })
}