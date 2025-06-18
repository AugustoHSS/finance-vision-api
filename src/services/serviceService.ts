import * as serviceRepository from '../repositories/serviceRepository';
import { IService } from '../interfaces';

export async function fetchAllServices(userId: number) {
    const services = await serviceRepository.findAllByUserId(userId);
    return services;
}

export async function createService(userId:number, data: IService) {
    const valueInCents = Math.round(data.value * 100);

    const serviceData = {
        ...data,
        value: valueInCents,
    };
    const services = await serviceRepository.insert(userId, serviceData);
    return services;
}

export async function fetchlastestServices (userId: number, limit: number) {
    const lastestService = await serviceRepository.findLastestByUserId(userId, limit);
    console.log(lastestService);
    return lastestService;
}

export async function findCurrentMonthTotals(userId: number) {
    const currentMonthTotals = await serviceRepository.findCurrentMonthTotals(userId);
    return currentMonthTotals;
}
