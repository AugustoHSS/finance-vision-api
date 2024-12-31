import express from 'express';
import { validateAccessToken } from '../middlewares/authMiddleware';
import { getAllTips } from '../controllers/tipController';

const tipsRouter = express.Router();

tipsRouter.get('/tips', validateAccessToken, getAllTips);
//tipsRouter.get('/tips/latest', validateAccessToken, getLastestTips);

export default tipsRouter;
