import { Router } from 'express';
import authRouter from './authRouter';
import serviceRouter from './serviceRouter';
import tipsRouter from './tipsRouter';

const router = Router();

router.use(authRouter);
router.use(serviceRouter);
router.use(tipsRouter);

export default router;
