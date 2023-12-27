import { getAllAppointmentService } from '@services/appointment/getAll.service'
import { Request, Response } from 'express'

export const getAllAppointmentController = async (req: Request, res: Response) => {

    const time = req.query.time as string

    getAllAppointmentService({ time }).then(data => res.json(data)).catch(e => {
        res.status(500).json({ error: { message: e.message } })
    })
}