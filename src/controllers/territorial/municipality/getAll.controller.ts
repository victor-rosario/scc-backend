import { getAllMunicipalities } from "@services/territorial/municipality/getAll.service";
import { Request, Response } from "express";

export const getAllMunicipalityController = (req: Request, res: Response) => {
    const uuid = req.query.provinceUUID as string

    getAllMunicipalities({
        relations: { province: true },
        where: { province: { uuid } },
        cache: true
    }).then(municipalities => {
        const data = municipalities.map(municipality => ({
            uuid: municipality.uuid,
            name: municipality.name,
            slug: municipality.slug
        }))

        return res.json(data)
    }).catch(e => {
        res.status(500).json({ error: { message: e.message } })
    })
}