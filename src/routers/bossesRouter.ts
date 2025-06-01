import express from 'express';
import { getAllBosses } from '../controllers/bossesController';


const bossesRouter = express.Router();

bossesRouter.get('/bosses', getAllBosses);

export default bossesRouter;
