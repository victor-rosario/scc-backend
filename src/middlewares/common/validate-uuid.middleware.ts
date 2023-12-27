import { isValidUuid } from "@utils/string.util";
import { Request, Response, NextFunction } from "express";

export const validateUUIDMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(
        req.query.provinceUUID &&
        req.query.provinceUUID !== 'undefined' &&
        req.query.provinceUUID !== 'null'
    ){
        if(!isValidUuid(req.query.provinceUUID as string)) return res.status(400).json({ error: 'Invalid UUID' });
    }
    
    return next();
};