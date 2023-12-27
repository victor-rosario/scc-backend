import { updateRequestService } from '@services/request/update.service';
import { Request, Response } from 'express'

export const updateRequestController = async(req: Request, res: Response) => {
    updateRequestService(req.params.uuid, req.files)
    .then(data => res.json(data))
    .catch(e => {
        res.status(500).json({ error: { message: e.message } })
    })
}