import { Request, Response, Router } from 'express';
import WalletService from './wallet.service';
import verifyAddress from 'src/validations/address.validation';
import { HttpResponse } from 'src/http-response';
import authMiddleware from 'src/auth.middleware';
import { parseEther } from 'viem';

/**
 * @swagger
 * tags:
 *   name: Wallet
 *   description: Wallet specific operations
 */

const router = Router({ mergeParams: true });

/**
 * @swagger
 * /api/{address}/balance:
 *   get:
 *     summary: Get token balance for a specific address
 *     tags: [Wallet]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: The wallet address (e.g., 0x...)
 *     responses:
 *       200:
 *         description: Successful response with balance information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 code:
 *                   type: number
 *                   example: 0
 *                 data:
 *                   $ref: '#/components/schemas/BalanceDto'
 *       400:
 *         description: Invalid address provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: number
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 */
router.get('/balance', getBalance);

/**
 * @swagger
 * components:
 *   schemas:
 *     ApproveWalletRequest:
 *       type: object
 *       required:
 *         - amount
 *       properties:
 *         amount:
 *           type: string
 *           description: The amount of tokens to approve, in the token's smallest unit (e.g., wei for Ether-like tokens).
 *           example: "1000000000000000000"
 *   securitySchemes:
 *     basicAuth:
 *       type: http
 *       scheme: basic
 */
router.use('/approve', authMiddleware);

/**
 * @swagger
 * /api/{address}/approve:
 *   post:
 *     summary: Approve an amount of tokens for spending by the contract owner/operator
 *     tags: [Wallet]
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: The wallet address (token owner) approving the spending.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApproveWalletRequest'
 *     responses:
 *       200:
 *         description: Approval transaction submitted successfully. Returns the transaction hash.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 code:
 *                   type: number
 *                   example: 0
 *                 data:
 *                   type: string
 *                   description: The transaction hash of the approval.
 *                   example: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
 *       400:
 *         description: Invalid input (e.g., invalid address, amount missing or invalid).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: number
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *       401:
 *         description: Unauthorized. Basic authentication failed or not provided.
 */

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
