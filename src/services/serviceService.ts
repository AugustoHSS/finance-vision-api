import * as serviceRepository from '../repositories/serviceRepository';

export async function fetchAllServices(userId: number) {
    const services = await serviceRepository.findAllByUserId(userId);
    return services;
}

export async function createService(
    userId: number,
    serviceDate: Date,
    value: number,
    bossId: number,
    killCount: number,
    isTicket: boolean,
    clientId?: number,
){

    const services = await serviceRepository.insert(userId, serviceDate, value, bossId, killCount, isTicket, clientId);
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
