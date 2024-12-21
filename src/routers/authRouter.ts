import express from 'express';
import { refreshAccessToken, logout, registerUser, loginUser } from '../controllers/authController';

import { validateSchema } from '../middlewares/validateSchemaMiddleware';
import { registerSchema } from '../schemas/registerSchema';
import { loginSchema } from '../schemas/loginSchema';

const authRouter = express.Router();

authRouter.post('/refresh', refreshAccessToken);
authRouter.post('/logout', logout);

authRouter.post('/login', validateSchema(loginSchema), loginUser);
authRouter.post('/register', validateSchema(registerSchema), registerUser);

export default authRouter;