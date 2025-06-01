import * as bossesService from '../services/bossesService';
import { Request, Response } from 'express';


export async function getAllBosses(req: Request | any, res: Response){ // eslint-disable-line
    const allBosses = await bossesService.fetchAllBosses();

    res.status(200).json(allBosses);
}
