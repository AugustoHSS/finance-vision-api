import express from 'express';
import testRouter from './routers/testRouter';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(testRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});