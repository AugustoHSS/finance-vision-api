import express from 'express';
import { validateAccessToken } from '../middlewares/authMiddleware';
import { getAllTips, getLastestTips, createTip } from '../controllers/tipController';
import { tipSchema } from '../schemas/tipSchema';
import { validateSchema } from '../middlewares/validateSchemaMiddleware';

const tipsRouter = express.Router();

tipsRouter.use(validateAccessToken);
tipsRouter.get('/tips', validateAccessToken, getAllTips);
tipsRouter.post('/tips', validateSchema(tipSchema), createTip);
tipsRouter.get('/tips/latest', validateAccessToken, getLastestTips);

export default tipsRouter;
