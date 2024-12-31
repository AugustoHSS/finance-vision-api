import { Request, Response } from 'express';
import * as tipService from '../services/tipService';

export async function getAllTips(req: Request | any, res: Response) { // eslint-disable-line
    const userId = req.userId;

    const tips = await tipService.fetchAllTips(userId);
    res.status(200).json(tips);
}
