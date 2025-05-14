import { Address, getContract, Hex } from 'viem';
import { artifacts } from 'ignition/modules/ERC20';
import { publicClient, walletClient } from 'src/chain-clients';
import { privateKeyToAccount } from 'viem/accounts';

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as Address;
const SERVICE_ACCOUNT_PRIVATE_KEY = process.env.SERVICE_ACCOUNT_PRIVATE_KEY as Hex;

export class Erc20Service {
	private readonly contract;

	constructor(contractAddress: Address) {
		this.contract = getContract({
			address: contractAddress,
			abi: artifacts.abi,
			client: {
				public: publicClient,
				wallet: walletClient
			}
		});
	}

	getContractInfo() {
		return {
			address: this.contract.address,
			abi: this.contract.abi,
			chainHttpApiUrl: process.env.CHAIN_HTTP_API_URL
		};
	}

	async getTokenInfo() {
		const [name, symbol, totalSupply] = await Promise.all([
			this.contract.read.name(),
			this.contract.read.symbol(),
			this.contract.read.totalSupply()
		]);

		return { name, symbol, totalSupply };
	}

	getBalance(address: Address) {
		return this.contract.read.balanceOf([address]);
	}

	async approve(address: Address, amount: bigint) {
		const account = privateKeyToAccount(SERVICE_ACCOUNT_PRIVATE_KEY);

		const { request } = await publicClient.simulateContract({
			address: this.contract.address,
			abi: this.contract.abi,
			functionName: 'approve',
			args: [address, amount],
			account
		});
		const hash = await walletClient.writeContract(request);

		return hash;
	}
}

const service = new Erc20Service(CONTRACT_ADDRESS);

export default service;
