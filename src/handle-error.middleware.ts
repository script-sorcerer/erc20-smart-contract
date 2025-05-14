import { Request, Response, NextFunction } from 'express';

export default function (err: unknown, req: Request, res: Response, next: NextFunction) {
	console.error({
		message: 'Unhandled error',
		error: err,
		stack: err instanceof Error ? err.stack : undefined,
		payload: {
			url: req.url,
			method: req.method,
			query: req.query,
			body: req.body
		}
	});

	next(err);
}
