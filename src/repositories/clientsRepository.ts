import prisma from '../database';

export async function findAllClients() {
    const clientsFound = await prisma.client.findMany({
        orderBy: {
            name: 'asc',
        },
    });
    return clientsFound;
}
