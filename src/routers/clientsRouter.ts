import express from 'express';
import { getAllClients } from '../controllers/clientsController';


const clientsRouter = express.Router();

clientsRouter.get('/clients', getAllClients);

export default clientsRouter;
