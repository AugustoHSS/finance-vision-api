import prisma from '../database';

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
