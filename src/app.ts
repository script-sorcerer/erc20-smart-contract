import express, { json } from 'express';
import appController from './app.controller';
import handleError from './handle-error.middleware';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());
app.use(handleError);

app.use('/api', appController);

export default app;
