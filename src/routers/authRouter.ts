import express from 'express';
import { refreshAccessToken, logout, registerUser, loginUser } from '../controllers/authController';

import { validateSchema } from '../middlewares/validateSchemaMiddleware';
import { registerSchema } from '../schemas/registerSchema';
import { loginSchema } from '../schemas/loginSchema';
import { AppError } from '../errors/AppError';
import { ErrorType } from '../errors/ErrorTypes';

const authRouter = express.Router();

authRouter.post('/refresh', refreshAccessToken);
authRouter.post('/logout', logout);

authRouter.post('/login', validateSchema(loginSchema), loginUser);
authRouter.post('/register', validateSchema(registerSchema), registerUser);
authRouter.get('/some-route', async (req, res) => {
    throw new Error('This is a test error');
});

export default authRouter;