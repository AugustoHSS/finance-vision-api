import prisma from '../database';

export async function saveRefreshToken(userId: number, refreshToken: string) {
    return prisma.refreshToken.create({
        data: {
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            userId: userId,
        },
    });
}