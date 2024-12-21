import cors from 'cors';
import express, { json } from 'express';
import 'express-async-errors';
import router from './routers/index';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/globalErrorMiddleware';

const app = express();
app.use(json());
app.use(cors());
app.use(cookieParser());
app.use(router);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});