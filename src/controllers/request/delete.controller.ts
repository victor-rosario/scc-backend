import { deleteRequestService } from '@services/request/delete.service';
import { Request, Response } from 'express'

export const deleteRequestController = async(req: Request, res: Response) => {
    try {
        const request = await deleteRequestService(+req.params.id);
        if(!request) {
            res.json({ 
                message: `We could not find the request with the Id ${+req.params.id}`, 
                statusCode: 404,
                data: []
            });
        }else{
            res.json({ 
                message: `Success`, 
                statusCode: 200,
                data: request
            });    
        }
    } catch (error) {
        res.status(500).json({ error: `Interal Server Error: ${error}` });
    }
}