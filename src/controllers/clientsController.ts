import * as clientsService from '../services/clientsService';
import { Request, Response } from 'express';


export async function getAllClients(req: Request | any, res: Response){ // eslint-disable-line
    const allClients = await clientsService.fetchAllBosses();

    res.status(200).json(allClients);
}
