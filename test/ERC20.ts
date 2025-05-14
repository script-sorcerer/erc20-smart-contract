import hre from 'hardhat';
import { artifacts } from '../ignition/modules/ERC20';
import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers';
import { parseEther } from 'viem';

describe('ERC20', function () {
	async function deployERC20Fixture() {
		const [owner, otherAccount] = await hre.viem.getWalletClients();
		const publicClient = await hre.viem.getPublicClient();

		const erc20 = await hre.viem.deployContract('ERC20', ['Test ERC20 Coin', 'TEST', 18]);

		return { erc20, owner, otherAccount, publicClient };
	}

	describe('Deployment', function () {
		it('Should have named the contract "Test ERC20 Coin"', async function () {
			const { erc20 } = await loadFixture(deployERC20Fixture);

			expect(await erc20.read.name()).to.equal('Test ERC20 Coin');
		});
	});

	describe('Mint', function () {
		it('Should mint tokens', async function () {
			const { erc20, owner } = await loadFixture(deployERC20Fixture);

			await owner.writeContract({
				address: erc20.address,
				abi: artifacts.abi,
				functionName: 'mint',
				args: [owner.account.address, parseEther('100')]
			});

			const balance = await erc20.read.balanceOf([owner.account.address]);
			expect(balance).to.equal(parseEther('100'));
		});
	});
	describe('Approve', function () {
		it('Should approve tokens', async function () {
			const { erc20, owner } = await loadFixture(deployERC20Fixture);

			await owner.writeContract({
				address: erc20.address,
				abi: artifacts.abi,
				functionName: 'approve',
				args: [owner.account.address, parseEther('100')]
			});

			const allowance = await erc20.read.allowance([owner.account.address, owner.account.address]);
			expect(allowance).to.equal(parseEther('100'));
		});
	});
	describe('TransferFrom', function () {
		it('Should transfer tokens', async function () {
			const { erc20, owner, otherAccount } = await loadFixture(deployERC20Fixture);

			await owner.writeContract({
				address: erc20.address,
				abi: artifacts.abi,
				functionName: 'mint',
				args: [owner.account.address, parseEther('100')]
			});
			const balance = await erc20.read.balanceOf([owner.account.address]);
			expect(balance).to.equal(parseEther('100'));

			await owner.writeContract({
				address: erc20.address,
				abi: artifacts.abi,
				functionName: 'approve',
				args: [owner.account.address, parseEther('100')]
			});
			let allowance = await erc20.read.allowance([owner.account.address, owner.account.address]);
			expect(allowance).to.equal(parseEther('100'));

			await owner.writeContract({
				address: erc20.address,
				abi: artifacts.abi,
				functionName: 'transferFrom',
				args: [owner.account.address, otherAccount.account.address, parseEther('100')]
			});

			allowance = await erc20.read.allowance([owner.account.address, owner.account.address]);
			expect(allowance).to.equal(parseEther('0'));

			const [ownerBalance, otherBalance] = await Promise.all([
				erc20.read.balanceOf([owner.account.address]),
				erc20.read.balanceOf([otherAccount.account.address])
			]);
			expect(ownerBalance).to.equal(parseEther('0'));
			expect(otherBalance).to.equal(parseEther('100'));
		});
	});
});
