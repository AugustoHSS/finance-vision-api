import prisma from '../database';

export async function saveRefreshToken(userId: number, refreshToken: string) {
    return prisma.refreshToken.create({
        data: {
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            user_id: userId,
        },
    });
}

export async function findByToken(token: string, userId: number) {
    return prisma.refreshToken.findFirst({
        where: {
            token,
            user_id: userId,
        },
    });
}

export async function deleteByToken(token: string) {
    return prisma.refreshToken.deleteMany({
        where: {
            token,
        },
    });
}
