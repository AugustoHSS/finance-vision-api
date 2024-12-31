import prisma from '../database';

export async function findAllByUserId(userId: number) {
    const tipsFound = await prisma.service.findMany({ where: { user_id: userId } });
    return tipsFound;
}
