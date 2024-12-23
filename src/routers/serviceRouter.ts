import express from 'express';
import { validateAccessToken } from '../middlewares/authMiddleware';
import { getAllServices, createService} from '../controllers/serviceController';

const serviceRouter = express.Router();

serviceRouter.get('/services', validateAccessToken, getAllServices);
serviceRouter.post('/services', validateAccessToken, createService);

export default serviceRouter;
