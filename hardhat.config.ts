import type { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-ignition-viem';
import 'tsconfig-paths/register';

const config: HardhatUserConfig = {
	solidity: '0.8.28'
};

export default config;
