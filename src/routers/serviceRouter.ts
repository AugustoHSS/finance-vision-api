import express from 'express';
import { validateAccessToken } from '../middlewares/authMiddleware';
import { getAllServices, createService, getLastestServices} from '../controllers/serviceController';
import { validateSchema } from '../middlewares/validateSchemaMiddleware';
import { serviceSchema } from '../schemas/serviceSchema';

const serviceRouter = express.Router();

serviceRouter.use(validateAccessToken);
serviceRouter.get('/services', getAllServices);
serviceRouter.post('/services', validateSchema(serviceSchema), createService);
serviceRouter.get('/services/latest', getLastestServices);

export default serviceRouter;
