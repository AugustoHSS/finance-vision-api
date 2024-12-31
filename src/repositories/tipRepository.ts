import prisma from '../database';

export async function findAllByUserId(userId: number) {
    const tipsFound = await prisma.tip.findMany({ where: { client_id: userId } });
    return tipsFound;
}

export async function findLastestByUserId(userId: number, limit: number) {
    const lastestTips = await prisma.tip.findMany(
        {
            where:
            {
                client_id: userId,
            },
            orderBy: {
                tip_date : 'desc',
            },
            take: limit,
        });
    return lastestTips;
}

