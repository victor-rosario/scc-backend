import { getAllAppointmentDaysService } from '@services/appointment/getAllDays.service'
import { Request, Response } from 'express'

export const getAllAppointmentDaysController = async (_req: Request, res: Response) => {

    getAllAppointmentDaysService().then(data => res.json(data)).catch(e => {
        res.status(500).json({ error: { message: e.message } })
    })
}