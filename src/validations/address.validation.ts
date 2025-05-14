import { Address } from 'viem';

export default function (address: string): address is Address {
	if (!/^(0x)?[0-9a-fA-F]{40}$/.test(address)) {
		return false;
	}
	return true;
}
