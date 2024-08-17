import { Request, Response } from 'express';
import userSchema from '../schemas/userSchema';
import * as userService from '../services/userService';

function validateSchema(req: Request) {
  const validation = userSchema.validate(req.body);
  if (validation.error) {
    throw { message: validation.error.details[0].message, type: 'schema validate' };
  }
}

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;

  validateSchema(req);
  await userService.findEmail(email);
  await userService.createUser(email, password);
  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  validateSchema(req);
  const token = await userService.login(email, password);
  res.status(200).send({ token });
}