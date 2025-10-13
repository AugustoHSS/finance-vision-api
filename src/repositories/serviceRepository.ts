import prisma from '../database';
import { startOfMonth, endOfMonth } from 'date-fns';
import { IService } from '../interfaces';

export async function findAllByUserId(userId: number) {
    const servicesFound = await prisma.service.findMany({ where: { user_id: userId } });
    return servicesFound;
}

export async function insert(userId:number, serviceData:IService) {
    const newService = await prisma.service.create({
        data: {
            user_id: userId,
            service_date: serviceData.serviceDate,
            value: serviceData.value,
            boss_id: serviceData.bossId,
            kill_count: serviceData.killCount,
            is_ticket: serviceData.isTicket,
            client_id: serviceData.clientId,
            payment_type: serviceData.paymentType,
        },
    });

    return newService;
}

export async function findLastestByUserId(userId: number, limit: number) {
    const lastestService = await prisma.service.findMany(
        {
            where:
            {
                user_id: userId,
            },
            orderBy: {
                service_date : 'desc',
            },
            take: limit,
        });
    return lastestService;
}

export async function findCurrentMonthTotals(userId: number) {

    const now = new Date();

    const currentMonthStart = startOfMonth(now);
    const currentMonthEnd = endOfMonth(now);

    const groupedTotals = await prisma.service.groupBy({
        by: ['payment_type', 'is_ticket'],
        where: {
            user_id: userId,
            service_date: {
                gte: currentMonthStart,
                lte: currentMonthEnd,
            },
        },
        _sum: {
            value: true,
        },
    });

    console.log(groupedTotals);
    return groupedTotals;
}
