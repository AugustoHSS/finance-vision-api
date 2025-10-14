import prisma from '../database';
import { ITip } from '../interfaces';

export async function findAllByUserId(userId: number) {
    const tipsFound = await prisma.tip.findMany({ where: { client_id: userId } });
    return tipsFound;
}

export async function findLastestByUserId(userId: number, limit: number) {
    const lastestTips = await prisma.tip.findMany(
        {
            where:
            {
                user_id: userId,
            },
            orderBy: {
                tip_date : 'desc',
            },
            take: limit,
        });
    return lastestTips;
}

export async function insert(userId:number, serviceData:ITip) {
    const newTip = await prisma.tip.create({
        data: {
            client_id: serviceData.clientId,
            user_id: userId,
            value: serviceData.value,
            tip_date: serviceData.date,
        },
    });

    return newTip;
}