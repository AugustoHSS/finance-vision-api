import prisma from '../database';
import { startOfMonth, endOfMonth } from 'date-fns';

export async function findAllByUserId(userId: number) {
    const servicesFound = await prisma.service.findMany({ where: { user_id: userId } });
    return servicesFound;
}

export async function insert(
    userId: number,
    serviceDate: Date,
    value: number,
    bossId: number,
    killCount: number,
    isTicket: boolean,
    clientId?: number,
) {
    const newService = await prisma.service.create({
        data: {
            user_id: userId,
            service_date: serviceDate,
            value: value,
            boss_id: bossId,
            kill_count: killCount,
            is_ticket: isTicket,
            client_id: clientId,
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
