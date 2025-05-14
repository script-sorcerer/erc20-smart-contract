import { Request, Response, Router } from 'express';
import WalletService from './wallet.service';
import verifyAddress from 'src/validations/address.validation';
import { HttpResponse } from 'src/http-response';
import authMiddleware from 'src/auth.middleware';
import { parseEther } from 'viem';

const router = Router({ mergeParams: true });
router.get('/balance', getBalance);
router.use('/approve', authMiddleware);
router.post('/approve', approve);

async function getBalance(req: Request, res: Response) {
	const address = req.params.address as string;
	if (!verifyAddress(address)) {
		res.status(400).json(HttpResponse.error('Invalid address'));
		return;
	}

	const balance = await WalletService.getBalance(address);

	res.json(HttpResponse.ok(balance));
}

async function approve(req: Request, res: Response) {
	const address = req.params.address as string;
	if (!verifyAddress(address)) {
		res.status(400).json(HttpResponse.error('Invalid address'));
		return;
	}
	if (!req.body?.amount) {
		res.status(400).json(HttpResponse.error('Amount is required'));
		return;
	}
	const amount = parseEther(req.body.amount);

	const hash = await WalletService.approve(address, amount);

	res.json(HttpResponse.ok(hash));
}

export default router;
