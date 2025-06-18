import { Request, Response } from 'express';
import * as serviceService from '../services/serviceService';

export async function getAllServices(req: Request | any, res: Response) { // eslint-disable-line
    const userId = req.userId;

    const services = await serviceService.fetchAllServices(userId);
    res.status(200).json(services);
}


export async function createService(req: Request | any, res: Response) { // eslint-disable-line
    const userId = req.userId;
    const data = req.body;

    serviceService.createService(userId, data);

    res.status(200).send();
}

export async function getLastestServices(req: Request | any, res: Response){ // eslint-disable-line
    const userId = req.userId;
    const limit = parseInt(req.query.limit) || 3;
    const lastestServices = await serviceService.fetchlastestServices(userId, limit);

    res.status(200).json(lastestServices);
}

export async function getCurrentMonthTotals(req: Request | any, res: Response) { // eslint-disable-line

    const userId = req.userId;
    const currentMonthTotals = await serviceService.findCurrentMonthTotals(userId);

    res.status(200).json(currentMonthTotals);
}
