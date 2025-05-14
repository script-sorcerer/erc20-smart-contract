import { Address } from 'viem';
import ERC20Service, { Erc20Service } from 'src/erc20/erc20.service';
import { BalanceDto } from './dtos';

const BALANCE_TTL = 5 * 1000;

class WalletService {
	private balanceCache: Record<string, { balance: BalanceDto; lastUpdated: number }> = {};

	constructor(private readonly erc20Service: Erc20Service) {}

	async getBalance(address: Address) {
		const cachedBalance = this.balanceCache[address];
		if (cachedBalance && Date.now() - cachedBalance.lastUpdated < BALANCE_TTL) {
			return cachedBalance.balance;
		}

		const balance = await this.erc20Service.getBalance(address);
		this.balanceCache[address] = {
			balance: new BalanceDto({ current: balance, blocked: 0n, total: balance }),
			lastUpdated: Date.now()
		};

		return this.balanceCache[address].balance;
	}

	approve(address: Address, amount: bigint) {
		return this.erc20Service.approve(address, amount);
	}
}

const service = new WalletService(ERC20Service);

export default service;
