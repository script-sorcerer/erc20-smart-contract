import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from './http-response';

export default function (req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		res.status(401).json(HttpResponse.error('Unauthorized'));
		return;
	}

	const authCredentials = authHeader.split(' ')[1];
	const [username, password] = Buffer.from(authCredentials, 'base64').toString().split(':');
	if (username !== 'admin' || password !== 'admin') {
		res.status(401).json(HttpResponse.error('Unauthorized'));
		return;
	}

	next();
}
