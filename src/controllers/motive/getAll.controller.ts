import { getAllMotiveService } from "@services/motive-request/getMotive.service";
import { Request, Response } from "express";

export const getAllMotiveController = (_req: Request, res: Response) => {

    getAllMotiveService({
        cache: true
    }).then(motives => {
        const data = motives.map(motive => ({
            uuid: motive.uuid,
            motive: motive.motive
        }));

        return res.json(data)
    }).catch(e => {
        res.status(500).json({ error: { message: e.message } })
    })

}