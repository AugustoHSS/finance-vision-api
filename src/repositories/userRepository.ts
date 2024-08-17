import prisma from '../database';

export async function createUser(email: string, password: string) {
  await prisma.users.create({ data: { email, password } });
}

export async function verifyEmail(email: string) {
  const emailFound = await prisma.users.findUnique({ where: { email } });
  return emailFound;
}