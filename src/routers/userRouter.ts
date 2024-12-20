import express from 'express';
import { register, login } from '../controllers/userController';

import { validateSchema } from '../middlewares/validateSchemaMiddleware';
import { registerSchema } from '../schemas/registerSchema';
import { loginSchema } from '../schemas/loginSchema';

import { validateAccessToken } from '../middlewares/authMiddleware';

const userRouter = express.Router();

userRouter.post('/login', validateSchema(loginSchema), login);
userRouter.post('/register', validateSchema(registerSchema), register);

userRouter.get('/protected-route', validateAccessToken, (req: any, res) => {

    res.json({ message: `Welcome, user ${req.userId}` });
});

export default userRouter;              