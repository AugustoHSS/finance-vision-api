import express from 'express';
import { refresh_access_token, logout } from '../controllers/jwtController';

const jwtRouter = express.Router();

jwtRouter.post('/refresh', refresh_access_token);
jwtRouter.post('/logout', logout);


export default jwtRouter;