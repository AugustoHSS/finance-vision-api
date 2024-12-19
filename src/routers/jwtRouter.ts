import express from 'express';
import { refresh_access_token } from '../controllers/jwtController';

const jwtRouter = express.Router();

jwtRouter.post('/refresh', refresh_access_token);


export default jwtRouter;