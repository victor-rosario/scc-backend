import { getUserByIdCardService } from "@services/user/getUserByIdCard.service";
import { Request, Response } from "express";

export const getUserByIdCardController = (req: Request, res: Response) => {
    getUserByIdCardService(req.params.identification).then(result => {
        res.json(result)
    }).catch(e => {
        res.status(500).json({ error: { message: e.message } })
    })
}