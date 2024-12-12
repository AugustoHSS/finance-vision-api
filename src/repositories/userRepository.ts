import prisma from '../database';

export async function createUser(email: string, password: string) {
  await prisma.user.create({ data: { email, password } });
}

export async function verifyEmail(email: string) {
  const emailFound = await prisma.user.findUnique({ where: { email } });
  return emailFound;
}