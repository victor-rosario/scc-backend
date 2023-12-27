import { getAllCommunicationService } from '@services/communication/getCommunication.service'
import { Request, Response } from 'express'

export const getAllCommunicationController = async (_req: Request, res: Response) => {
    getAllCommunicationService({
        cache: true
    }).then(methods => {
        const data = methods.map(data => ({
            uuid: data.uuid,
            methods: data.method
        }));

        return res.json(data);
    }).catch(e => {
        res.status(500).json({ error: { message: e.message } });
    })
}