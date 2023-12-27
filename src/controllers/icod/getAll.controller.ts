import { getAllIcodService } from '@services/icod/getAll.service'
import { Request, Response } from 'express'

export const getAllIcodController = (_req: Request, res: Response) => {
    getAllIcodService({
        cache: true
    }).then((icods) => {
        const data = icods.map(data => ({
            uuid: data.uuid,
            title: `${data.code} - ${data.description}`
        }));

        return res.json(data);
    }).catch(e => {
        res.status(500).json({ error: { message: e.message } });
    })
}