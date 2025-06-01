import prisma from '../database';


export async function findAllBosses() {
    const servicesFound = await prisma.boss.findMany({
        orderBy: {
            name: 'asc',
        },
    });
    return servicesFound;
}
