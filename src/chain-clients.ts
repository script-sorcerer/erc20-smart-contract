import { createPublicClient, createWalletClient, http } from 'viem';
import { hardhat } from 'viem/chains';

export const publicClient = createPublicClient({
	chain: hardhat,
	transport: http(process.env.CHAIN_HTTP_API_URL)
});

export const walletClient = createWalletClient({
	chain: hardhat,
	transport: http(process.env.CHAIN_HTTP_API_URL)
});
