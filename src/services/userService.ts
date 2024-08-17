import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository';

export async function findEmail(email: string) {
  const searchEmail = await userRepository.verifyEmail(email);
  if (searchEmail) {
    throw { message: 'Email already in use', type: 'duplicate value' };
  }
}

function checkPassword(plainPassword: string, hashedPassword: string) {
  const validation = bcrypt.compareSync(plainPassword, hashedPassword);
  if (!validation) {
    throw { message: 'password incorrect', type: 'validation error' };
  }
}

export async function createUser(email: string, password: string) {
  const passwordHash = bcrypt.hashSync(password, 10);
  userRepository.createUser(email, passwordHash);
}

export async function login(email: string, password: string) {
  const user = await userRepository.verifyEmail(email);
  
  if (!user) {
    throw { message: 'email not found', type: 'validation error' };
  }
  checkPassword(password, user.password);
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string);
  return token;
}