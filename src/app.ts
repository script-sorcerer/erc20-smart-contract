import express, { json } from 'express';
import appController from './app.controller';
import handleError from './handle-error.middleware';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'ERC20 Smart Contract Interactions',
			version: '1.0.0'
		}
	},
	apis: ['./src/**/*.ts'] // files containing annotations as above
};
const swaggerSpec = swaggerJsdoc(options);

const app = express();
app.use(cors());
app.use(json());

app.use('/api', appController);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(handleError);

export default app;
