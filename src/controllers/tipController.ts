import { Request, Response } from 'express';
import * as tipService from '../services/tipService';

export async function getAllTips(req: Request | any, res: Response) { // eslint-disable-line
    const userId = req.userId;

    const tips = await tipService.fetchAllTips(userId);
    res.status(200).json(tips);
}

export async function getLastestTips(req: Request | any, res: Response){ // eslint-disable-line
    const userId = req.userId;
    const limit = parseInt(req.query.limit) || 3;

    const lastestTips = await tipService.fetchlastestTips(userId, limit);

    res.status(200).json(lastestTips);
}
