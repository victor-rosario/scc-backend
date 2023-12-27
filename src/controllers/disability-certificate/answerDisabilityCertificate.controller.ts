import { answerDisabilityCertificateService } from '@services/disability-certificate/answerDisabilityCertificate.service'
import { Request, Response } from 'express'

export const answerDisabilityCertificateController = async(req: Request, res: Response) => {
    answerDisabilityCertificateService(req.body).then(data => {

        return res.json({data});
    }).catch(e => {
        res.status(500).json({ error: { message: e.message } });
    })
} 