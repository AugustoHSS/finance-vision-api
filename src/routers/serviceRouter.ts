import express from 'express';
import { validateAccessToken } from '../middlewares/authMiddleware';
import { getAllServices, createService, getLastestServices, getCurrentMonthTotals} from '../controllers/serviceController';
import { validateSchema } from '../middlewares/validateSchemaMiddleware';
import { serviceSchema } from '../schemas/serviceSchema';

const serviceRouter = express.Router();

serviceRouter.use(validateAccessToken);
serviceRouter.get('/services', getAllServices);
serviceRouter.post('/services', validateSchema(serviceSchema), createService);
serviceRouter.get('/services/latest', getLastestServices);
serviceRouter.get('/services/monthly-totals', getCurrentMonthTotals);

export default serviceRouter;
