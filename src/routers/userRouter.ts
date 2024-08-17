import express from 'express';
import { signUp, signIn } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/signin', signIn);
userRouter.post('/signup', signUp);

export default userRouter;