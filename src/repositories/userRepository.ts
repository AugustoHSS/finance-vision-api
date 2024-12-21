import prisma from '../database';

export async function createUser(username: string, email: string, password: string) {
  await prisma.user.create({ data: { username, email, password } });
}

export async function findByEmail(email: string) {
  const emailFound = await prisma.user.findUnique({ where: { email } });
  return emailFound;
}

export async function findById(id: number) {
  const emailFound = await prisma.user.findUnique({ where: { id } });
  return emailFound;
}
