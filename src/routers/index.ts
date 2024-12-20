import { Router } from 'express';
import userRouter from './userRouter';
import jwtRouter from './jwtRouter'

const router = Router();

router.use(userRouter);
router.use(jwtRouter)

export default router;