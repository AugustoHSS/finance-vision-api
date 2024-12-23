import { Request, Response } from 'express';
import * as serviceService from '../services/serviceService';

export async function getAllServices(req: Request | any, res: Response) { // eslint-disable-line
    const userId = req.userId;

    const services = await serviceService.fetchAllServices(userId);
    res.status(200).json(services);
}


export async function createService(req: Request | any, res: Response) { // eslint-disable-line
    const userId = req.userId;
    const {serviceDate, value, bossId, killCount, isTicket, clientId} = req.body;

    serviceService.createService(userId, serviceDate, value, bossId, killCount, isTicket, clientId);

    res.status(200).send();
}
