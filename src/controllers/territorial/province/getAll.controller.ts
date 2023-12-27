import { getAllProvinces } from "@services/territorial/province/getAll.service";
import { Request, Response } from "express";

export const getAllProvincesController = async (_req: Request, res: Response) => {
    getAllProvinces({
        cache: true
    }).then((provinces) => {
        const data = provinces.map(province => ({
            uuid: province.uuid,
            name: province.name,
            slug: province.slug
        }))

        return res.json(data)
    }).catch(e => {
        return res.status(500).json({ error: { message: e.message } })
    })
}