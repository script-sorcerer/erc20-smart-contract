import { Request, Response, Router } from 'express';

const router = Router();
router.get('/transferFrom', transferFormPage);

async function transferFormPage(_: Request, res: Response) {
	res.sendFile('views/transaction.html', { root: process.cwd() });
}

export default router;
