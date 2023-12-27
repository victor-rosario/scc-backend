import { getAllDiseaseHistoryService } from "@services/disease-histories/getAll.service";
import { Request, Response } from "express";

export const getAllDiseaseHistoryController = async (_req: Request, res: Response) => {

    getAllDiseaseHistoryService({
        cache: true
    }).then(diseases => {

        const data = diseases.map(({ uuid, disease }) => ({ uuid, disease }))

        return res.json(data);

    }).catch(e => {
        res.status(500).json({ error: { message: e.message } })
    })
}