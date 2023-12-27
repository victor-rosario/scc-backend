import { getAllFormDoneService } from '@services/request/getAllFormDone.service';
import { Request, Response } from 'express'

export const getAllFormDoneController = async (req: Request, res: Response) => {

    const uuid = req.params.uuid as string

    getAllFormDoneService(uuid).then((request) => {

        return res.json(request);

    }).catch((e) => {
        res.status(500).json({ error: { message: e.message } })
    })
}