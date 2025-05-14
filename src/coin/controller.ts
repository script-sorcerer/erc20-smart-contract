import { Request, Response, Router } from 'express';
import ERC20Service from 'src/erc20/erc20.service';
import { TokenInfoDto } from './dtos';
import { HttpResponse } from 'src/http-response';

/**
 * @swagger
 * tags:
 *   name: Coin
 *   description: Coin specific operations
 */

const router = Router();

/**
 * @swagger
 * /api/coin/details:
 *   get:
 *     tags: [Coin]
 *     summary: Get ERC20 token details
 *     description: Retrieves the name, symbol, and total supply of the ERC20 token.
 *     responses:
 *       200:
 *         description: Successful response with token details.
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
 *                   $ref: '#/components/schemas/TokenInfoDto'
 */
router.get('/details', getDetails);

/**
 * @swagger
 * /api/coin/contractInfo:
 *   get:
 *     tags: [Coin]
 *     summary: Get ERC20 contract information
 *     description: Retrieves the ABI and bytecode of the deployed ERC20 contract.
 *     responses:
 *       200:
 *         description: Successful response with contract ABI, address and chain HTTP URL.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 abi:
 *                   type: array
 *                   items:
 *                     type: object
 *                 address:
 *                   type: string
 *                 chainHttpApiUrl:
 *                   type: string
 */
router.get('/contractInfo', getContractInfo);

async function getDetails(_: Request, res: Response) {
	const details = await ERC20Service.getTokenInfo();

	res.json(HttpResponse.ok(new TokenInfoDto(details)));
}

function getContractInfo(_: Request, res: Response) {
	const contractInfo = ERC20Service.getContractInfo();

	res.json(HttpResponse.ok(contractInfo));
}

export default router;
