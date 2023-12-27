import { cookieConfig } from "@config";
import userMemory from "@memory/user.memory";
import { Request, Response } from "express";

export const signOutController = async (req: Request, res: Response) => {
    userMemory.remove(req.user.uuid)

    delete req.session[cookieConfig.names.public]
    
    return res.json({ logout: true })
}