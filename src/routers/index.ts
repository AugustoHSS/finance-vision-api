import { Router } from 'express';
import authRouter from './authRouter';
import serviceRouter from './serviceRouter';
import tipsRouter from './tipsRouter';
import bossesRouter from './bossesRouter';

const router = Router();

router.use(bossesRouter);
router.use(authRouter);
router.use(serviceRouter);
router.use(tipsRouter);


export default router;
