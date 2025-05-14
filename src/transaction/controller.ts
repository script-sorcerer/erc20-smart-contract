import { Request, Response, Router } from 'express';

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Transaction specific operations
 */

const router = Router();

/**
 * @swagger
 * /api/transaction/transferFrom:
 *   get:
 *     tags: [Transaction]
 *     summary: Get the transferFrom page
 *     description: Serves an HTML page for initiating a transferFrom transaction.
 *     responses:
 *       200:
 *         description: Successful response, returns the HTML page.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/transferFrom', transferFormPage);

async function transferFormPage(_: Request, res: Response) {
	res.sendFile('views/transaction.html', { root: process.cwd() });
}

export default router;
