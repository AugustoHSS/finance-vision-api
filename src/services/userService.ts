import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository';
import * as jwtRepository from '../repositories/jwtRepository';

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

export async function createUser(username: string, email: string, password: string) {
  const passwordHash = bcrypt.hashSync(password, 10);
  userRepository.createUser(username, email, passwordHash);
}

export async function login(email: string, password: string) {
  const user = await userRepository.verifyEmail(email);

  if (!user) {
    throw { message: 'email not found', type: 'validation error' };
  }
  checkPassword(password, user.password);

  const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: "1m" });
  const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "7d" });

  await jwtRepository.saveRefreshToken(user.id, refreshToken)

  return {
    accessToken,
    refreshToken,
  };
}