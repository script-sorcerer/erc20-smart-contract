import { Request, Response, Router } from 'express';
import ERC20Service from 'src/erc20/erc20.service';
import { TokenInfoDto } from './dtos';

const router = Router();
router.get('/details', getDetails);
router.get('/contractInfo', getContractInfo);

async function getDetails(_: Request, res: Response) {
	const details = await ERC20Service.getTokenInfo();

	res.json(new TokenInfoDto(details));
}

function getContractInfo(_: Request, res: Response) {
	const contractInfo = ERC20Service.getContractInfo();

	res.json(contractInfo);
}

export default router;
