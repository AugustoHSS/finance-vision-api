import express from 'express';
import { register, login } from '../controllers/userController';

import { validateSchema } from '../middlewares/validateSchema';
import { registerSchema } from '../schemas/registerSchema';
import { loginSchema } from '../schemas/loginSchema';

const userRouter = express.Router();

userRouter.post('/login', validateSchema(loginSchema), login);
userRouter.post('/register', validateSchema (registerSchema), register);

export default userRouter;