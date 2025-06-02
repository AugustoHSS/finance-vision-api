import prisma from '../database';


export async function findAllBosses() {
    const bossesFound = await prisma.boss.findMany({
        orderBy: {
            name: 'asc',
        },
    });
    return bossesFound;
}
