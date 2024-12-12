import { Request, Response } from 'express';
import * as userService from '../services/userService';

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  await userService.findEmail(email);
  await userService.createUser(email, password);
  res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const token = await userService.login(email, password);
  res.status(200).send({ token });
}