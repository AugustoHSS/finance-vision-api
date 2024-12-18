import { Request, Response } from 'express';
import * as userService from '../services/userService';

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;

  await userService.findEmail(email);
  await userService.createUser(username, email, password);
  res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const { accessToken, refreshToken } = await userService.login(email, password);

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).send({ accessToken });
}